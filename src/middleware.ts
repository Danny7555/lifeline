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
  
  // Check if the path is protected (needs authentication)
  const isPathProtected = protectedPaths.some((path) => 
    pathname.startsWith(path)
  );
  
  // Check if the path is an auth path (sign in/up)
  const isAuthPath = authPaths.some((path) => 
    pathname === path
  );

  // Get the session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const isAuthenticated = !!token;
  
  // Redirect logic
  if (isPathProtected && !isAuthenticated) {
    // Redirect to sign-in if trying to access protected path while not authenticated
    const url = new URL('/auth/signIn', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  if (isAuthPath && isAuthenticated) {
    // Redirect to dashboard if already authenticated but trying to access auth pages
    return NextResponse.redirect(new URL('/dashboard/profile', request.url));
  }
  
  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static assets)
  // - _next/image (optimized images)
  // - favicon.ico, manifest.json (browser files)
  // - images/ (public images folder)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|images).*)'],
};