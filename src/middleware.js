import { NextResponse } from "next/server";

export function middleware(request, response) {
  const url = request.nextUrl.clone();
  let isLogin = request.cookies.get("x-access-token");
  if (!isLogin) {
    if (
      request.nextUrl.pathname.startsWith("/warehouse/inventory_level") ||
      request.nextUrl.pathname.startsWith("/warehouse/inward_procurement_po") ||
      request.nextUrl.pathname.startsWith("/warehouse/view_batches") ||
      request.nextUrl.pathname.startsWith("/procurement/raise_po_form") ||
      request.nextUrl.pathname.startsWith("/procurement/raise_vendor_po") ||
      request.nextUrl.pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/login"
    ) {
      return NextResponse.redirect(
        new URL("/warehouse/inventory_level", request.url)
      );
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/signup") ||
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}
