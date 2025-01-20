// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const privyToken = request.cookies.get('privy-token')?.value;

  // Protect chat routes
  if (request.nextUrl.pathname.startsWith('/chat') && !privyToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chat/:path*']
}