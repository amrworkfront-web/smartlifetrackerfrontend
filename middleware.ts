import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const publicPaths = ["/","/login", "/register"];

function isPublicPath(pathname: string) {
  const pathWithoutLocale = pathname.replace(
    new RegExp(`^/(${routing.locales.join("|")})`),
    ""
  );
  
  // Handle root path or empty path after locale removal
  const normalizedPath = pathWithoutLocale === "" ? "/" : pathWithoutLocale;

  return publicPaths.some((path) => normalizedPath.startsWith(path));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Run next-intl middleware for all requests
  const response = intlMiddleware(req);

  // 2. Check for authentication token
  const token = req.cookies.get("accessToken")?.value;
  const isPublic = isPublicPath(pathname);

  // 3. Handle protected routes
  if (!token && !isPublic) {
    // Get locale from URL or fallback to default
    const locale = routing.locales.find(l => pathname.startsWith(`/${l}`)) || routing.defaultLocale;
    
    const loginUrl = new URL(`/${locale}/login`, req.url);
    // Optional: add callback URL to redirect back after login
    // loginUrl.searchParams.set('callbackUrl', pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
