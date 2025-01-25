import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const cookiePromise = await cookies()
    const refreshToken = cookiePromise.get('refresh_token')?.value
    console.log('Request',refreshToken);
    
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/status`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'refresh_token': refreshToken
          } as HeadersInit,
          credentials: 'include'
        });

        const data = await response.json()
    
        if (response.ok) {
            return NextResponse.json({data})
          } else {
            throw new Error('Session invalid or expired');
          }
      } catch (error: any) {

        return NextResponse.json({ message: error.message }, { status: 401 });
      }
}