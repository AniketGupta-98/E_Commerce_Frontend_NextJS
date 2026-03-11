import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/cart", "/checkout"];

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    const isProtected = protectedRoutes.some(route =>
        path.startsWith(route)
    );

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/dashboard/:path*", "/cart/:path*", "/checkout/:path*"],
};