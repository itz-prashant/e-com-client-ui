"use server";

import * as cookie from "cookie";
import { cookies } from "next/headers";

export default async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("e", error);
      return {
        type: "error",
        message: error.message[0].message,
      };
    }
    const c = response.headers.getSetCookie();

    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "No cookie were found",
      };
    }

    const parsedAccessToken = cookie.parseCookie(accessToken);
    const parsedRefreshToken = cookie.parseCookie(refreshToken);

    const cookieStore = await cookies();

    cookieStore.set({
      name: "accessToken",
      value: parsedAccessToken.accessToken!,
      expires: parsedAccessToken.Expires
        ? new Date(parsedAccessToken.Expires)
        : undefined,
      httpOnly: true,
      path: parsedAccessToken.Path || "/",
      domain: parsedAccessToken.Domain,
      sameSite: parsedRefreshToken.SameSite as "strict",
    });

    cookieStore.set({
      name: "refreshToken",
      value: parsedRefreshToken.refreshToken!,
      expires: parsedRefreshToken.Expires
        ? new Date(parsedRefreshToken.Expires)
        : undefined,
      httpOnly: true,
      path: parsedRefreshToken.Path || "/",
      domain: parsedRefreshToken.Domain,
      sameSite: parsedRefreshToken.SameSite as "strict",
    });

    return {
      type: "success",
      message: "Login successfull",
    };
  } catch (e: any) {
    return {
      type: "error",
      message: e.message,
    };
  }
}
