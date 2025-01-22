// components/auth/LoginButton.tsx
'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Familjen_Grotesk } from 'next/font/google';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

export function LoginButton() {
  const { ready, isAuthenticated, login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        await logout();
        console.log('Successfully logged out');
      } else {
        await login();
        console.log('Successfully logged in');
        router.push('/chat'); // Redirect to chat after login
      }
    } catch (error) {
      console.error('Auth action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // if (!ready) {
  //   return (
  //     <motion.button
  //       className="mt-8 px-8 py-4 bg-gray-600 capitalize rounded-full text-black font-bold text-lg"
  //     >
  //       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  //     </motion.button>
  //   );
  // }

  return (
    <div className="mt-8 px-8 py-4 bg-[#6FCB71] capitalize rounded-full text-black font-bold text-lg hover:bg-[#5FB761] transition-colors">

      <DynamicWidget buttonClassName='no-style' innerButtonComponent={
        <motion.button
          onClick={handleAuth}
          disabled={isLoading}
          // className="mt-8 px-8 py-4 bg-[#6FCB71] capitalize rounded-full text-black font-bold text-lg hover:bg-[#5FB761] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          ) : (
    
            <span className={familjenGrotesk.className}>
              {isAuthenticated ? 'LOGOUT' : 'GET STARTED'}
            </span>
          )}
        </motion.button>
    
      } />
    </div>
  );
}