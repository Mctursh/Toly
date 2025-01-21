// components/providers.tsx
'use client';

// import { PrivyProvider, PrivyClientConfig } from '@privy-io/react-auth';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { useRouter } from 'next/navigation';




export default function Providers({ children }: { children: React.ReactNode }) {

  const router = useRouter();

  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_APP_ID || '',
        walletConnectors: [SolanaWalletConnectors],
        // cssOverrides,
        events: {
          onAuthSuccess: (args) => {
            console.log('onAuthSuccess was called', args);
            router.push('/chat');
            // you can get the jwt by calling the getAuthToken helper function
            // const authToken = getAuthToken();
            // console.log('authToken', authToken);
          }
        }
      }}

    >
      {children}
    </DynamicContextProvider>
    // <PrivyProvider
    //   appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID! || ''}
    //   // appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
    //   config={{
    //     loginMethods: ['email', 'wallet'], // only allow email and wallet login
    //     appearance: {
    //       theme: 'dark',
    //       accentColor: '#6FCB71', // using your green accent color
    //       logo: 'your-logo-url', // optional
    //       walletChainType: "solana-only",
    //       walletList: [
    //         "detected_solana_wallets",
    //         "phantom"
    //       ]
    //     },
    //     embeddedWallets: {
    //       createOnLogin: 'users-without-wallets', // create wallets for users who don't have one
    //     },

    //     solanaClusters: [
    //       {name: 'devnet', rpcUrl: `https://devnet.helius-rpc.com/?api-key=ba993ae8-e438-42de-ba0d-46a89a8e1b74`},
    //       {name: 'mainnet-beta', rpcUrl: `https://devnet.helius-rpc.com/?api-key=ba993ae8-e438-42de-ba0d-46a89a8e1b74`},
    //       // {name: 'devnet', rpcUrl: 'https://api.mainnet-beta.solana.com'}
    //       ],
    //     // solanaClusters: [{name: 'mainnet-beta', rpcUrl: `https://devnet.helius-rpc.com/?api-key=${process.env.NEXT_HELIUS_API_KEY}`}],
    //   }}
    // >
    //   {children}
    // </PrivyProvider>
  );
}
