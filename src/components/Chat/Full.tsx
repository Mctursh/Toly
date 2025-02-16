'use client';

import React, { useMemo } from 'react';
import { Dashboard } from '@/components/Chat/Dashboard';
import { usePrivy } from '@privy-io/react-auth';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useChatContext } from '../Context/ChatProvider';

interface ChatProps {
  id?: string
}

export default function ChatPage({ id = '' }: ChatProps) {
  const { state, dispatch } = useChatContext()

  const address = useMemo(() => state.user?.address, [state.user?.address])
  const inAppWallet = useMemo(() => state.user?.inAppWallet, [state.user?.inAppWallet])
  const email = useMemo(() => state.user?.email, [state.user?.email])
  const isAuthenticated = useMemo(() => state.isAuthenticated, [state.isAuthenticated])
  const accessToken = useMemo(() => state.accessToken, [state.accessToken])
  const chatId = useMemo(() => state.chat?.chatId, [state.chat?.chatId])
  const threadId = useMemo(() => state.chat?.threadId, [state.chat?.threadId])
  
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
        dispatch={dispatch}
        threadId={threadId!}
        accessToken={accessToken!}
        chatId={chatId || ''}
        isAuthenticated={isAuthenticated}
        inAppWallet={inAppWallet}
      />
    </main>
  );
}