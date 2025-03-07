import { NextRequest, NextResponse } from "next/server";

const CACHE_DURATION = "s-maxage=300, stale-while-revalidate=30";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("Cache-Control", CACHE_DURATION);
  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
