import { NextRequest, NextResponse } from "next/server";

// Every path in here requires a valid login cookie, except /review/login itself.
const PROTECTED_PREFIXES = ["/review", "/api/generate-review"];

// Client portal paths anyone may reach: the public landing page and the
// login screen itself.
const PORTAL_PUBLIC_PATHS = ["/client-portal", "/client-portal/login"];

// Portal sessions are database-backed, so the cookie is an opaque token that
// can't be verified at the edge without a database round trip. This check is
// therefore only a fast redirect for signed-out visitors — it is NOT the
// security boundary. Every portal page and API route independently resolves
// access through lib/portal/access.ts, which is what actually enforces that
// a client sees only their own project.
function hasPortalSessionCookie(request: NextRequest): boolean {
  return Boolean(
    request.cookies.get("authjs.session-token")?.value ??
      request.cookies.get("__Secure-authjs.session-token")?.value,
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/client-portal")) {
    if (PORTAL_PUBLIC_PATHS.includes(pathname) || hasPortalSessionCookie(request)) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/client-portal/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/review/login")) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("am_review_auth")?.value;
  const expected = process.env.REVIEW_SESSION_SECRET;

  if (cookie && expected && cookie === expected) {
    return NextResponse.next();
  }

  // API calls get a plain 401 instead of a redirect
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/review/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/review", "/review/:path*", "/api/generate-review", "/client-portal/:path*"],
};
