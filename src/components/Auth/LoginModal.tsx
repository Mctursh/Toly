// components/auth/LoginButton.tsx
'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Familjen_Grotesk } from 'next/font/google';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

export function LoginButton() {
  const { ready, isAuthenticated, login, logout } = useAuth();
  const { user, handleLogOut } = useDynamicContext()
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
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

  const handleChat = async () => {
    try {
      setIsLoading(true);
      if (handleLogOut) {
        await handleLogOut();
      }
      
      // Try with full pathname
      const fullPath = `${pathname === '/' ? '' : pathname}/chat`;
      console.log('Attempting navigation to:', fullPath);
      router.push(fullPath);
      
      // If that doesn't work, try forcing a hard navigation
      setTimeout(() => {
        window.location.href = '/chat';
      }, 100);
    } catch (error) {
      console.error('Error:', error);
      window.location.href = '/chat';
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

  const logOut = () => handleLogOut()

  return (
    <div className="">
      {
        user ?
        <motion.button
        onClick={logOut}
        // disabled={isLoading}
        className="mt-8 px-8 py-4 bg-[#6FCB71] capitalize rounded-full text-black font-bold text-lg hover:bg-[#5FB761] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={familjenGrotesk.className}>
            LOGOUT
        </span>
      </motion.button>
        :
        <div className="no-style mt-8 px-8 py-4 bg-[#6FCB71] capitalize rounded-full text-black font-bold text-lg hover:bg-[#5FB761] transition-colors">

          <DynamicWidget innerButtonComponent={
            <div>
              <motion.button
                // onClick={handleAuth}
                // disabled={isLoading}
                // className="mt-8 px-8 py-4 bg-[#6FCB71] capitalize rounded-full text-black font-bold text-lg hover:bg-[#5FB761] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                  <span className={familjenGrotesk.className}>
                    GET STARTED
                  </span>
              </motion.button>
            </div>
        
          } />
        </div>
      }
    </div>
  );
}