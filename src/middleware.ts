import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the auth cookie
  // const authCookie = request.cookies.get('dynamic-auth');
  
  // if (!authCookie?.value) {
  //   // Redirect to login if no auth cookie exists
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // try {
  //   // Parse and verify the auth data
  //   const authData = JSON.parse(authCookie.value);
    
  //   // Add the auth data to headers if needed
  //   const response = NextResponse.next();
  //   // response.headers.set('x-user-address', authData.wallet.address);
    
  //   return response;
  // } catch (error) {
  //   // Handle invalid auth data
  //   return NextResponse.redirect(new URL('/', request.url));
  // }
}

export const config = {
  matcher: ['/chat/:path*']
}