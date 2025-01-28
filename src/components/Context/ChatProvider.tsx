import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react'

type User = {
    email?: string
    address?: string
}

type Action = 'LOGIN' | 'LOGOUT' | 'LOADED' | "LOGIN IN" | "ADD CHAT DETAILS"

export type Actions = { 
    type: Action,
    payload?: any | User 
}

export type AuthContextType = {
    state: ContextStateType;
    dispatch: Dispatch<Actions>;
  };

export type ContextStateType = {
    isAuthenticated: boolean;
    user: User;
    accessToken?: string
    logOutHandler: () => Promise<void>
    isLoading?: boolean,
    isLoggingIn?: boolean
    chat?: {
      chatId: string
      threadId: string 
    } 
  };

const initialState: ContextStateType = {
    isAuthenticated: false,
    user: {},
    accessToken: '',
    logOutHandler: async() => {},
    isLoading: true,
    isLoggingIn: false,
    chat: {
      chatId: '',
      threadId: '' 
    }
};

function chatReducer(
    state: ContextStateType,
    action: Actions
  ): ContextStateType {
    
    switch (action.type) {
      case "LOGIN":
        return { ...state, ...action.payload };
      case "LOGOUT":
        return { ...state, isAuthenticated: false, isLoading: true, isLoggingIn: false };
      case "LOADED":
        return { ...state, isLoading: false };
      case "LOGIN IN":
        return { ...state, isLoggingIn: true };
      case "ADD CHAT DETAILS":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }

export const ChatContext = createContext<AuthContextType | undefined>(undefined);

export const ChatProvider = ({ children, value }: { children: ReactNode, value?: Actions }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const router = useRouter()
  const { validateSession, logOut } = useAuth()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await validateSession();
  
        if(res?.message === "Session invalid or expired"){
          throw new Error("Session expired")
        }
  
        const payload = {
          isAuthenticated: true,
          user: {
            email: res.data.data.email,
            address: res.data.data.address
          },
          accessToken: res.data.data.accessToken,
          isLoggingInIn: false
        }
  
        dispatch({
          type: 'LOGIN',
          payload
        })

        router.push('/chat')
      } catch (error) {
        await logOut()
        await state.logOutHandler()
        router.push('/')
        dispatch({
          type: "LOGOUT"
        })
        console.error("Error", error)
      } finally {
        dispatch({ type: "LOADED" })
      }
    };
    
    if(!state.isAuthenticated){
      fetchUser();
    }
  }, [])
  

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
      throw new Error("useChat must be used within an AuthProvider");
    }
    return context;
  };
