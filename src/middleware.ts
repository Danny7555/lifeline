import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/settings',
];

// Paths that are accessible only to non-authenticated users
const authPaths = [
  '/auth/signIn', 
  '/auth/signUp',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow OAuth callback routes - CRITICAL for OAuth to work
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }
  
  // Allow root path
  if (pathname === '/') {
    return NextResponse.next();
  }
  
  // Check if the path is protected (needs authentication)
  const isPathProtected = protectedPaths.some((path) => 
    pathname.startsWith(path)
  );
  
  // Check if the path is an auth path (sign in/up)
  const isAuthPath = authPaths.some((path) => 
    pathname === path
  );

  try {
    // Get the session token
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    const isAuthenticated = !!token;
    
    // Redirect logic
    if (isPathProtected && !isAuthenticated) {
      const url = new URL('/auth/signIn', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    
    if (isAuthPath && isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard/profile', request.url));
    }
    
  } catch (error) {
    console.error('Middleware error:', error);
    // If there's an error and it's a protected path, redirect to sign-in
    if (isPathProtected) {
      const url = new URL('/auth/signIn', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  
  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  // IMPORTANT: Exclude all API routes to prevent OAuth interference
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - CRITICAL for OAuth)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|images|robots.txt).*)',
  ],
};