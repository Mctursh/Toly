// components/providers.tsx
'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ['email', 'wallet'], // only allow email and wallet login
        appearance: {
          theme: 'dark',
          accentColor: '#6FCB71', // using your green accent color
          logo: 'your-logo-url', // optional
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets', // create wallets for users who don't have one
        }
      }}
    >
      {children}
    </PrivyProvider>
  );
}