import { withAuth } from 'next-auth/middleware';

// Configure which routes require authentication
export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;
      
      // Public routes that don't require auth
      const publicRoutes = [
        '/',
        '/login',
        '/register',
        '/api/auth',
        '/[username]', // Public profile pages
      ];
      
      // Check if route is public
      if (publicRoutes.some(route => path.startsWith(route))) {
        return true;
      }
      
      // All other routes require auth
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};