import base from "lib/base";
import { NextResponse } from "next/server";

/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
  const token = req.cookies.get("nodetoken")?.value;
  const path = req.nextUrl.pathname;

  const isAuthPage = ["/login", "/register", "/forget"].includes(path);
  const isProtectedPage = path.startsWith("/profile");

  let isValid = false;

  if (token) {
    try {
      const res = await fetch(`${base.apiUrl}/members/check`, {
        method: "POST",
        headers: {
          Cookie: `nodetoken=${token}`,
        },
      });

      const data = await res.json();
      isValid = data?.success;
    } catch (err) {
      console.error("Token check error:", err);
    }
  }

  if (isValid && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  if (!isValid && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/forget", "/profile/:path*"],
};
