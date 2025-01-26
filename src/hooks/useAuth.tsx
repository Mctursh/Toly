// components/auth/useAuth.tsx
import { loginPayload } from '@/types';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';

// interface AuthError {
//   message: string;
//   code?: string;
// }

export function useAuth() {
  // const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  const login = useCallback(async (payload: loginPayload) => {
    try {
      const res = await fetch('/api/login', {
        body: JSON.stringify(payload),
        method: 'POST',
        credentials: 'include', // Ensures the httpOnly cookie is sent
      });

      return await res.json()
      
    } catch (error) {
      throw new Error('login failed')
    }
  }, []);

  async function validateSession() {
    const res = await fetch('/api/validate-session', {
      method: 'GET',
      credentials: 'include',
    });

    // console.log(res);
    return await res.json()
  }

  return {
    ready: true,
    isAuthenticated: false,
    isVerifying: false,
    user: {},
    login,
    logout: () => {},
    getToken: "ss",
    error: null,
    clearError: () => {},
    validateSession
  };
}