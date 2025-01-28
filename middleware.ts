import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const res = await verifyToken(token);

    // Check for admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (res?.data?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
    // Check for admin routes
    // if (request.nextUrl.pathname.startsWith("/dashboard")) {
    //   if (res?.data?.role !== "admin") {
    //     return NextResponse.redirect(new URL("/unauthorized", request.url));
    //   }
    // }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
