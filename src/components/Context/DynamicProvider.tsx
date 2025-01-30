
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { Dispatch, useCallback, useContext, useState } from "react";
import { CookieAuthData } from "@/types/chat";
import { Actions, AuthContextType, ChatContext, ChatProvider, ContextStateType, useChatContext } from "./ChatProvider";
import { useAuth } from "@/hooks/useAuth";


const DynamicProvider = ({ children: child }: { children: React.ReactNode }) => {
// const DynamicProvider = ({ children: child, dispatch }: { children: React.ReactNode, dispatch: Dispatch<Actions> }) => {
    // const context = useContext(ChatContext);
    const { dispatch } = useChatContext()
    const { login, logOut } = useAuth()
    
    const router = useRouter();

    const handleAuth = useCallback(async (authData: ContextStateType) => {
      dispatch({
        type: "LOGIN IN"
      })

      const data = await login(authData.user)

      console.log(data)

      dispatch({
        type: "LOGIN",
        payload: {
          ...authData,
          accessToken: data.user.data.accessToken
        }
      })

      router.push('/chat');
    }, []);
    
    const handleLogout = useCallback(() => {
      logOut().then(() => {
        router.push('/');
      })
    }, []);

    const cssOverrides = `
    .dynamic-widget-container {
      all: initial;
    }
  `;

  return (
    <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_APP_ID || '',
          walletConnectors: [SolanaWalletConnectors],
          cssOverrides,
          events: {
            
            onAuthSuccess: (args) => {
              const data: ContextStateType = {
                isAuthenticated: true,
                user: {
                  email: args.user.email,
                  address: args.primaryWallet?.address
                },
                logOutHandler: args.handleLogOut
              }
              console.log("Auth data to dispatch", data);
              
              handleAuth(data)
              console.log('onAuthSuccess was called', args);
            },

            onLogout: () => {
              handleLogout()
            }
          }
        }}

      >
        {child}
      </DynamicContextProvider>
    )
  }

export default DynamicProvider