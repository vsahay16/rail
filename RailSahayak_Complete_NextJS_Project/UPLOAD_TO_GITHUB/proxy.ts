import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isHindi = request.nextUrl.pathname === "/hi" || request.nextUrl.pathname.startsWith("/hi/");
  const requestHeaders = new Headers(request.headers);
  // Overwrite untrusted hints. Locale must follow the public URL.
  requestHeaders.set("x-railsahayak-language", isHindi ? "hi" : "en");
  if (isHindi) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname === "/hi" ? "/" : url.pathname.replace(/^\/hi(?=\/)/, "");
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }
  // Next.js owns HTML/RSC caching. API data has a separate durable cache.
  return NextResponse.next({ request: { headers: requestHeaders } });
}
export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon\\.svg|og\\.jpg|rail-hero\\.svg|.*\\..*).*)"] };
