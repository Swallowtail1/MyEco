export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export const mainRoutes = [
  "/dashboard",
  "/activities",
  "/challenges",
  "/leaderboard",
  "/profile",
];

export const adminRoutes = [
  "/admin",
];

export function isAuthRoute(pathname: string) {
  return authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function isMainRoute(pathname: string) {
  return mainRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function isAdminRoute(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function isPublicRoute(pathname: string) {
  return (
    pathname === "/" ||
    pathname.startsWith("/u/") ||
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/auth/redirect")
  );
}