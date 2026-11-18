import { NextResponse, type NextRequest } from "next/server";

// The only English page is /en, so anything below it is an English 404. Unknown URLs all render
// app/global-not-found.tsx (one root layout per language leaves no shared not-found boundary); this
// header tells it to answer in English with <html lang="en">. It runs only for /en/* paths.
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-site-language", "en");
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/en/:path+"] };
