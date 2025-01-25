import React, { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react'

type User = {
    email?: string
    address?: string
}

type Action = 'LOGIN' | 'LOGOUT'

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
  };

const initialState: ContextStateType = {
    isAuthenticated: false,
    user: {},
    accessToken: '',
    logOutHandler: async() => {}
};

function chatReducer(
    state: ContextStateType,
    action: Actions
  ): ContextStateType {
    
    switch (action.type) {
      case "LOGIN":
        return { ...state, ...action.payload };
      case "LOGOUT":
        return { ...state };
      default:
        return state;
    }
  }

export const ChatContext = createContext<AuthContextType | undefined>(undefined);

export const ChatProvider = ({ children, value }: { children: ReactNode, value?: Actions }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

//   useEffect(() => {
//     if(value){
//         dispatch({ ...value })
//     }
  
//     return () => {}
//   }, [value])
  

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
