
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { Dispatch, useCallback, useContext, useState } from "react";
import { CookieAuthData } from "@/types/chat";
import { Actions, AuthContextType, ChatContext, ChatProvider, ContextStateType, useChatContext } from "./ChatProvider";
import { useAuth } from "@/hooks/useAuth";
import AccessCodeModal from "../Modal/AccessCodeModal";
import { loginPayload } from "@/types";


const DynamicProvider = ({ children: child }: { children: React.ReactNode }) => {
// const DynamicProvider = ({ children: child, dispatch }: { children: React.ReactNode, dispatch: Dispatch<Actions> }) => {
    // const context = useContext(ChatContext);
    const [showModal, setShowModal] = useState(false)
    const [authData, setAuthData] = useState<ContextStateType>()

    const { dispatch } = useChatContext()
    const { login, logOut, isWhitelisted, validateAccessCode } = useAuth()
    
    const router = useRouter();

    const handleAuth = useCallback(async (payload: ContextStateType) => {
      // console.log(authData);
      
      const data = await login(payload.user)

      console.log(data)

      dispatch({
        type: "LOGIN",
        payload: {
          ...payload,
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

    const handleAccessCodeSubmission = async(accessCode: string) => {  
      if(validateAccessCode(accessCode)){
        console.log(authData);
        
        await handleAuth(authData!)
        setShowModal(false)
      } else {
        await logOut()
        handleLogout()
        dispatch({
          type: "LOGOUT"
        })
        setShowModal(false)
      }
    }

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
              dispatch({
                type: "LOGIN IN"
              })
              const data: ContextStateType = {
                isAuthenticated: true,
                user: {
                  email: args.user.email,
                  address: args.primaryWallet?.address
                },
                logOutHandler: args.handleLogOut
              }
              setAuthData(data)
              console.log("Auth data to dispatch", data);

              if(!isWhitelisted(args.primaryWallet?.address!)){
                setShowModal(true)
              } else {
                handleAuth(data)
              }
              
              console.log('onAuthSuccess was called', args);
            },

            onLogout: () => {
              handleLogout()
            }
          }
        }}

      >
        {child}
      <AccessCodeModal 
        isOpen={showModal}
        onClose={() => setShowModal(!showModal)}
        onClickHandler={handleAccessCodeSubmission}
      />
      </DynamicContextProvider>
    )
  }

export default DynamicProvider