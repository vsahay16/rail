import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = url.pathname === "/hi" ? "/" : url.pathname.replace(/^\/hi(?=\/)/, "");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-railsahayak-language", "hi");
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = { matcher: ["/hi", "/hi/:path*"] };
