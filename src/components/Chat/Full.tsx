'use client';

import React from 'react';
import { Dashboard } from '@/components/Chat/Dashboard';
import { usePrivy } from '@privy-io/react-auth';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function ChatPage() {
  const { user } = useDynamicContext();
  
  return (
    <main className="min-h-screen">
      <Dashboard 
        username={user?.email ?? "Anonymous"}
        profileImage="/dyor.png"
      />
    </main>
  );
}