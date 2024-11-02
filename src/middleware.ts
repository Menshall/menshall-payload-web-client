import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const token = request.cookies.get("token");
  // const token = cookies().get("token");

  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  response.cookies.set("viewport", viewport);

  const url = request.nextUrl;

  if (token && request.nextUrl.pathname.includes("/sign-in")) {
    request.nextUrl.pathname = "/user-account";
    return NextResponse.redirect(request.nextUrl);
  }

  if (!token && request.nextUrl.pathname.includes("/user-account")) {
    request.nextUrl.pathname = "/sign-in";
    return NextResponse.redirect(request.nextUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
