import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    console.log("token", token)

    const isAuthRoute = request.nextUrl.pathname.startsWith("/login");

    if (!token && !isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        // "/((?!_next|favicon.ico|api).*)",
    ],
};