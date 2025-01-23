'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { ready, isAuthenticated, isVerifying } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Allow access to the chat page and home page
    if (pathname === '/chat' || pathname === '/') {
      return;
    }

    // if (ready && !isVerifying && !isAuthenticated) {
    //   console.log('User not authenticated, redirecting to login');
    //   sessionStorage.setItem('redirectAfterLogin', pathname);
    //   router.push('/');
    // }
  }, [ready, isAuthenticated, isVerifying, router, pathname]);

  // Show loading state if either Privy is not ready or we're verifying with backend
  if (!ready || isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-[280px] h-[45px] flex flex-row justify-center items-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6FCB71]"></div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}