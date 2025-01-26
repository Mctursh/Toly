// components/auth/LoginButton.tsx
'use client';

import { motion } from 'framer-motion';
import { Familjen_Grotesk } from 'next/font/google';
import { useEffect, useState } from 'react';
import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useChatContext } from '../Context/ChatProvider';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

export function LoginButton() {
  const { handleLogOut } = useDynamicContext()
  const { state, dispatch } = useChatContext()


  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (state.isAuthenticated) {
      setIsLoggedIn(true)
    } else {
      logOut().then(() =>{
        dispatch({ type: 'LOGOUT' })
      })

      setIsLoggedIn(false)
    }
  
    return () => {}
  }, [state.isAuthenticated])

  const logOut = async() => {
    dispatch({
      type: "LOGOUT"
    })
    await handleLogOut()
  }

  if (state.isLoggingIn) {
    return (
      <motion.button
        className="mt-8 px-8 py-4 bg-gray-600 capitalize rounded-full text-black font-bold text-lg"
      >
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      </motion.button>
    );
  }

  return (
    <div className="">
      {
        isLoggedIn ?
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