"use client"
import ChatPage from '@/components/Chat/Full';
import { useChatContext } from '@/components/Context/ChatProvider';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function Home() {
  const { state, dispatch } = useChatContext()
  const { validateSession } = useAuth()
  useEffect(() => {
      
      if(!state.isAuthenticated){
        validateSession().then((res) => {
          const payload = {
            isAuthenticated: true,
            user: {
              email: res.data.data.email,
              address: res.data.data.address
            },
            accessToken: res.data.data.accessToken
          }
          
          dispatch({
            type: 'LOGIN',
            payload
          })
        })
      }
    
      return () => {}
    }, [])
  return <ChatPage />
}