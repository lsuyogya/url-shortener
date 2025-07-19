export function middleware() {
  // No-op middleware
  return;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|/).*)"],
};
