import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/vault")) return NextResponse.next();
  if (pathname === "/vault/login") return NextResponse.next();
  const cookie = req.cookies.get("vault_access");
  if (cookie?.value === "1") return NextResponse.next();
  return NextResponse.redirect(new URL("/vault/login", req.url));
}

export const config = { matcher: ["/vault/:path*"] };
