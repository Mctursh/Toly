import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const loginPayload = await req.json();
    console.log(loginPayload);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/sign-in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginPayload),
          credentials: "include"
        });
    
        // if (!response.ok) {
        //   throw new Error('Invalid or expired refresh token');
        // }

        const setCookieHeader = response.headers.get('set-cookie');
        if (setCookieHeader) {

          const refreshToken = setCookieHeader.match(/refresh_token=([^;]+)/)?.[1];
            console.log(refreshToken);
            
          if (refreshToken) {
            const cookiePromise = await cookies()
            cookiePromise.set('refresh_token', refreshToken, {
                httpOnly: true,
                maxAge: 60 * 1000,
                secure: false,
                sameSite: 'lax',
                path: '/'
            })
          }
        }
    
        const userData = await response.json();
        // console.log(userData);
        
        return NextResponse.json({ valid: true, user: userData });
      } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 401 });
      }
}