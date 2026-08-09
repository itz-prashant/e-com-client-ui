import { cookies } from "next/headers";
import * as cookie from "cookie";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return Response.json({ success: false, message: "No refresh token" }, { status: 401 });
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/auth/auth/refresh`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `refreshToken=${refreshToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Refresh token backend request failed");
    return Response.json({ success: false }, { status: 401 });
  }

  const c = response.headers.getSetCookie();

  const newAccessTokenCookie = c.find((item) => item.includes("accessToken"));
  const newRefreshTokenCookie = c.find((item) => item.includes("refreshToken"));

  if (!newAccessTokenCookie || !newRefreshTokenCookie) {
    console.error("Tokens not found in backend response");
    return Response.json({ success: false }, { status: 400 });
  }

  const parsedAccessToken = cookie.parseCookie(newAccessTokenCookie);
  const parsedRefreshToken = cookie.parseCookie(newRefreshTokenCookie);

  cookieStore.set({
    name: "accessToken",
    value: parsedAccessToken.accessToken!,
    expires: parsedAccessToken.Expires ? new Date(parsedAccessToken.Expires) : undefined,
    httpOnly: true,
    path: parsedAccessToken.Path || "/",
    domain: parsedAccessToken.Domain,
    sameSite: (parsedAccessToken.SameSite?.toLowerCase() as "strict" | "lax" | "none") || "lax",
  });

  cookieStore.set({
    name: "refreshToken",
    value: parsedRefreshToken.refreshToken!,
    expires: parsedRefreshToken.Expires ? new Date(parsedRefreshToken.Expires) : undefined,
    httpOnly: true,
    path: parsedRefreshToken.Path || "/",
    domain: parsedRefreshToken.Domain,
    sameSite: (parsedRefreshToken.SameSite?.toLowerCase() as "strict" | "lax" | "none") || "lax",
  });

  return Response.json({ success: true });
}