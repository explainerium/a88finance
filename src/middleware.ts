import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/jwt";

/**
 * Edge middleware that gates every /admin route. This is the first line of
 * defense (it only trusts the signed JWT claims); the authoritative role
 * checks live in each Server Action and protected page via the DB user.
 */

// Sections only ADMINs may reach. Author-scoped pages (posts, dashboard) are
// allowed through here and finer-grained ownership is enforced server-side.
const ADMIN_ONLY_PREFIXES = ["/admin/users", "/admin/settings"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The login page must stay reachable while unauthenticated.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (
    session.role !== "ADMIN" &&
    ADMIN_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
