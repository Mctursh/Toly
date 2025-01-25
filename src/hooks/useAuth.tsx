// components/auth/useAuth.tsx
import { loginPayload } from '@/types';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';

interface AuthError {
  message: string;
  code?: string;
}

export function useAuth() {
  // const { 
  //   ready,
  //   authenticated,
  //   user,
  //   login: privyLogin,
  //   logout: privyLogout,
  //   getAccessToken 
  // } = usePrivy();
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [serverVerified, setServerVerified] = useState(false);

  const clearError = () => setError(null);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';


  // Verify with backend when authenticated
  // useEffect(() => {
  //   async function verifyAuth() {
  //     if (authenticated) {
  //       setIsVerifying(true);
  //       try {
  //         const token = await getAccessToken();
  //         const response = await fetch(`${API_URL}/auth/me`, {
  //           headers: {
  //             'Authorization': `Bearer ${token}`
  //           }
  //         });

  //         if (response.ok) {
  //           console.log('Backend verification successful');
  //           setServerVerified(true);
  //         } else {
  //           console.error('Backend verification failed');
  //           setError({ message: 'Server verification failed' });
  //           setServerVerified(false);
  //         }
  //       } catch (err) {
  //         const error = err as Error;
  //         console.error('Verification error:', error);
  //         setError({ message: error.message });
  //         setServerVerified(false);
  //       } finally {
  //         setIsVerifying(false);
  //       }
  //     } else {
  //       setServerVerified(false);
  //     }
  //   }

  //   verifyAuth();
  // }, [authenticated, getAccessToken]);

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
    // try {
    //   await privyLogin();
    //   // Check whitelist status and redirect accordingly
    //   const token = await getAccessToken();
    //   const response = await fetch(`${API_URL}/whitelist/check-status`, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
    //   const data = await response.json();
      
    //   if (data.isWhitelisted) {
    //     router.push('/chat');
    //   } else {
    //     router.push('/whitelist');
    //   }
    // } catch (error) {
    //   console.error('Login failed:', error);
    //   throw error;
    // }
  }, []);
  // }, [privyLogin, getAccessToken, router]);
  async function validateSession() {
    const res = await fetch('/api/validate-session', {
      method: 'GET',
      credentials: 'include', // Ensures the httpOnly cookie is sent
    });

    console.log(res);
    return await res.json()
    
  
    // if (res.ok) {
    //   return await res.json();
    // } else {
    //   throw new Error('Session invalid or expired');
    // }
  }

  const logout = useCallback(async () => {
    // try {
    //   clearError();
    //   console.log('Initiating logout...');
    //   await privyLogout();
    //   setServerVerified(false);
    //   router.push('/');
    // } catch (err) {
    //   const error = err as Error;
    //   console.error('Logout failed:', error);
    //   setError({ message: error.message });
    //   throw error;
    // }
  }, []);
  // }, [privyLogout, router]);

  return {
    ready: true,
    isAuthenticated: false,
    isVerifying,
    user: {},
    login,
    logout,
    getToken: "ss",
    error,
    clearError,
    validateSession
  };
}