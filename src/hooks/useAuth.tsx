// components/auth/useAuth.tsx
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';

interface AuthError {
  message: string;
  code?: string;
}

export function useAuth() {
  const { 
    ready,
    authenticated,
    user,
    login: privyLogin,
    logout: privyLogout,
    getAccessToken 
  } = usePrivy();
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [serverVerified, setServerVerified] = useState(false);

  const clearError = () => setError(null);

  // Verify with backend when authenticated
  useEffect(() => {
    async function verifyAuth() {
      if (authenticated) {
        setIsVerifying(true);
        try {
          const token = await getAccessToken();
          const response = await fetch('http://localhost:3000/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            console.log('Backend verification successful');
            setServerVerified(true);
          } else {
            console.error('Backend verification failed');
            setError({ message: 'Server verification failed' });
            setServerVerified(false);
          }
        } catch (err) {
          const error = err as Error;
          console.error('Verification error:', error);
          setError({ message: error.message });
          setServerVerified(false);
        } finally {
          setIsVerifying(false);
        }
      } else {
        setServerVerified(false);
      }
    }

    verifyAuth();
  }, [authenticated, getAccessToken]);

  const login = useCallback(async () => {
    try {
      clearError();
      console.log('Initiating login...');
      await privyLogin();
      
      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
        router.push(redirectPath);
      }
    } catch (err) {
      const error = err as Error;
      console.error('Login failed:', error);
      setError({ message: error.message });
      throw error;
    }
  }, [privyLogin, router]);

  const logout = useCallback(async () => {
    try {
      clearError();
      console.log('Initiating logout...');
      await privyLogout();
      setServerVerified(false);
      router.push('/');
    } catch (err) {
      const error = err as Error;
      console.error('Logout failed:', error);
      setError({ message: error.message });
      throw error;
    }
  }, [privyLogout, router]);

  return {
    ready,
    isAuthenticated: authenticated && serverVerified,
    isVerifying,
    user,
    login,
    logout,
    getToken: getAccessToken,
    error,
    clearError
  };
}