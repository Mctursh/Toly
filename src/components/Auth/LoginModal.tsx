// components/auth/LoginButton.tsx
'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Space_Grotesk } from 'next/font/google';
import { useState } from 'react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export function LoginButton() {
  const { ready, isAuthenticated, isVerifying, login, logout, error } = useAuth(); // Add isVerifying and error
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        await logout();
        console.log('Successfully logged out');
      } else {
        await login();
        console.log('Successfully logged in');
      }
    } catch (error) {
      console.error('Auth action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state if either Privy is not ready or we're verifying with backend
  if (!ready || isVerifying) {
    return (
      <motion.div 
        className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gray-600"
      >
        <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {error && (
        <div className="text-red-500 text-sm mb-2">
          {error.message}
        </div>
      )}
      <motion.div 
        className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={handleAuth}
          disabled={isLoading || isVerifying}
          className="w-full h-full bg-black rounded-[22px] flex justify-center items-center"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <span className={`font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${spaceGrotesk.className}`}>
              {isAuthenticated ? 'LOGOUT' : 'LOGIN'}
            </span>
          )}
        </button>
      </motion.div>
    </>
  );
}