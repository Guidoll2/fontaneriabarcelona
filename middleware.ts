import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED = ["es", "en", "ca"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files and API routes
  if (pathname.startsWith("/es") || pathname.startsWith("/en") || pathname.startsWith("/ca") || pathname.includes("/api/") || pathname.endsWith(".webmanifest") || pathname === "/robots.txt") {
    return NextResponse.next();
  }

  // Detect language from accept-language header
  const acceptLang = req.headers.get("accept-language") || "";
  const preferred = acceptLang.split(",")[0]?.split("-")[0] || "es";
  const locale = SUPPORTED.includes(preferred) ? preferred : "es";

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico|pdf|webmanifest|txt)).*)",
};
