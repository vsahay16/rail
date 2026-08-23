import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isHindi = request.nextUrl.pathname === "/hi" || request.nextUrl.pathname.startsWith("/hi/");
  let response: NextResponse;

  if (isHindi) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname === "/hi" ? "/" : url.pathname.replace(/^\/hi(?=\/)/, "");
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-railsahayak-language", "hi");
    response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  } else {
    response = NextResponse.next();
  }

  if (request.method === "GET" || request.method === "HEAD") {
    const edgeCache = "public, s-maxage=300, stale-while-revalidate=3600";
    response.headers.set("Vercel-CDN-Cache-Control", edgeCache);
    response.headers.set("CDN-Cache-Control", edgeCache);
    response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  return response;
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon\\.svg|og\\.jpg|rail-hero\\.svg|.*\\..*).*)"] };
