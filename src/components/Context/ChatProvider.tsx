import { useAuth } from '@/hooks/useAuth'
import { Message, Tool } from '@/types/chat'
import { useRouter } from 'next/navigation'
import React, { createContext, Dispatch, ReactNode, useCallback, useContext, useEffect, useReducer } from 'react'

type User = {
    email?: string
    address?: string
}

type Action = 'LOGIN' | 'LOGOUT' | 'LOADED' | "LOGIN IN" | "ADD CHAT DETAILS" | "ADD_TOOL_TO_MESSAGE"

export type Actions = { 
    type: Action,
    payload?: any | User 
}

export type AuthContextType = {
    state: ContextStateType;
    dispatch: Dispatch<Actions>;
    addToolToMessage: (messageId: string, tool: Tool) => void;
  };

export type ContextStateType = {
    isAuthenticated: boolean;
    user: User;
    accessToken?: string
    logOutHandler: () => Promise<void>
    isLoading?: boolean,
    isLoggingIn?: boolean
    chat?: {
      chatId: string;
      threadId: string;
      messages?: Message[]; // Add this to store messages
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
      threadId: '',
      messages: []  // Initialize with empty array 
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
        case "ADD_TOOL_TO_MESSAGE":
          if (!state.chat?.messages) {
            console.warn("No messages array found in state");
            return state;
          }
    
          console.log("Adding tool to message:", action.payload);
          
          return {
            ...state,
            chat: {
              ...state.chat,
              messages: state.chat.messages.map(msg => {

                  console.log("Found message, adding tool", {
                    currentTools: msg.tools,
                    newTool: action.payload.tool
                  });
                  
                  return {
                    ...msg,
                    tools: [...(msg.tools || []), action.payload.tool]
                  };
                
                return msg;
              })
            }
          };
      default:
        return state;
    }
  }

export const ChatContext = createContext<AuthContextType | undefined>(undefined);

export const ChatProvider = ({ children, value }: { children: ReactNode, value?: Actions }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const router = useRouter()
  const { validateSession, logOut } = useAuth()

  const addToolToMessage = useCallback((messageId: string, tool: Tool) => {
    console.log("addToolToMessage called with:", { messageId, tool });
    
    if (!messageId || !tool) {
      console.error("Invalid messageId or tool", { messageId, tool });
      return;
    }

    dispatch({
      type: "ADD_TOOL_TO_MESSAGE",
      payload: { messageId, tool }
    });
  }, []);

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

  const contextValue: AuthContextType = {
    state,
    dispatch,
    addToolToMessage
};
  

  return (
    <ChatContext.Provider value={contextValue}>
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
