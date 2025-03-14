import { type NextRequest } from 'next/server';

/**
 * Configuration for protected routes
 */
export interface ProtectedRoutesConfig {
  /**
   * Array of route patterns that should be protected
   * Can include exact paths or patterns with wildcards
   */
  protectedRoutes: string[];

  /**
   * The route to redirect to when a user is not authenticated
   */
  authRoute: string;

  /**
   * The route to redirect to when a user is authenticated
   * (typically from login/signup pages)
   */
  defaultProtectedRoute: string;
}

/**
 * Default configuration for protected routes
 */
export const defaultProtectedRoutesConfig: ProtectedRoutesConfig = {
  protectedRoutes: ['/dashboard', '/account', '/api/protected'],
  authRoute: '/sign-in',
  defaultProtectedRoute: '/dashboard',
};

/**
 * Checks if a route should be protected based on the configuration
 */
export function isProtectedRoute(
  pathname: string,
  config: ProtectedRoutesConfig = defaultProtectedRoutesConfig
): boolean {
  return config.protectedRoutes.some((route) => {
    // Exact match
    if (route === pathname) {
      return true;
    }

    // Check if route starts with a protected path (for nested routes)
    if (route.endsWith('/*')) {
      const basePath = route.slice(0, -2);
      return pathname.startsWith(basePath);
    }

    return false;
  });
}

/**
 * Checks if a route is an auth route (sign-in, etc.)
 */
export function isAuthRoute(
  pathname: string,
  config: ProtectedRoutesConfig = defaultProtectedRoutesConfig
): boolean {
  return pathname === config.authRoute || pathname === '/reset-password';
}

/**
 * Utility to handle route protection logic
 */
export function handleRouteProtection(
  request: NextRequest,
  isAuthenticated: boolean,
  config: ProtectedRoutesConfig = defaultProtectedRoutesConfig
) {
  const { pathname } = request.nextUrl;

  // If user is trying to access a protected route but is not authenticated
  if (isProtectedRoute(pathname, config) && !isAuthenticated) {
    return new URL(config.authRoute, request.url);
  }

  // If user is authenticated and trying to access an auth route (like sign-in)
  if (isAuthRoute(pathname, config) && isAuthenticated) {
    return new URL(config.defaultProtectedRoute, request.url);
  }

  // If user is authenticated and on the home page, redirect to default protected route
  // if (pathname === '/' && isAuthenticated) {
  //   return new URL(config.defaultProtectedRoute, request.url);
  // }

  // No redirection needed
  return null;
}
