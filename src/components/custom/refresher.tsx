"use client";

import * as jose from "jose";
import { useCallback, useEffect, useRef } from "react";

const Refresher = ({ children }: { children: React.ReactNode }) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ref to hold scheduleRefresh to prevent circular closure issues
  const scheduleRefreshRef = useRef<() => Promise<void>>(async () => {});

  const getAccessToken = async () => {
    try {
      const res = await fetch("/api/auth/accessToken");
      if (!res.ok) return null;
      const data = await res.json();
      return data.token;
    } catch {
      return null;
    }
  };

  const performRefresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/refresh", { method: "POST" });
      if (res.ok) {
        // Safe reference call to trigger the next scheduling cycle
        scheduleRefreshRef.current();
      } else {
        console.error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }, []);

  const scheduleRefresh = useCallback(async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    const accessToken = await getAccessToken();
    if (!accessToken) return;

    try {
      const token = jose.decodeJwt(accessToken);
      if (!token.exp) return;

      const exp = token.exp * 1000;
      const currentTime = Date.now();
      const refreshTime = exp - currentTime - 5000; // 5 sec before expiry

      if (refreshTime <= 0) {
        await performRefresh();
        return;
      }

      timeoutId.current = setTimeout(() => {
        performRefresh();
      }, refreshTime);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [performRefresh]);

  // Keep the ref updated with latest function
  useEffect(() => {
    scheduleRefreshRef.current = scheduleRefresh;
  }, [scheduleRefresh]);

  useEffect(() => {
    scheduleRefresh();

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [scheduleRefresh]);

  return <>{children}</>;
};

export default Refresher;