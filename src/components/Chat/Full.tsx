'use client';

import React, { useMemo } from 'react';
import { Dashboard } from '@/components/Chat/Dashboard';
import { usePrivy } from '@privy-io/react-auth';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useChatContext } from '../Context/ChatProvider';

export default function ChatPage() {
  const { state, dispatch } = useChatContext()

  const address = useMemo(() => state.user?.address, [state.user?.address])
  const email = useMemo(() => state.user?.email, [state.user?.email])
  const logOutHandler = async() => {
    dispatch({
      type: "LOGOUT"
    })
    await state.logOutHandler()
  }
  
  return (
    <main className="min-h-screen">
      <Dashboard
        username={email ?? "Anonymous"}
        profileImage="/dyor.png"
        walletAddress={address}
        logOutHandler={logOutHandler}
      />
    </main>
  );
}