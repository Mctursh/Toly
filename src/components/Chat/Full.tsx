'use client';

import React from 'react';
import { Dashboard } from '@/components/Chat/Dashboard';
import { usePrivy } from '@privy-io/react-auth';

export default function ChatPage() {
  const { user } = usePrivy();
  
  return (
    <main className="min-h-screen">
      <Dashboard 
        username={user?.email ?? "Anonymous"}
        profileImage="/dyor.png"
      />
    </main>
  );
}