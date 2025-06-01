import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedPaths = [
  '/dashboard',
  '/profile',
  '/settings',
];

const authPaths = [
  '/auth/signIn', 
  '/auth/signUp',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }
  
  if (pathname === '/') {
    return NextResponse.next();
  }
  
  const isPathProtected = protectedPaths.some((path) => 
    pathname.startsWith(path)
  );
  
  const isAuthPath = authPaths.some((path) => 
    pathname === path
  );

  try {
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
    if (isPathProtected) {
      const url = new URL('/auth/signIn', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}


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