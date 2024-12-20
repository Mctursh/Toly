// app/chat/page.tsx
import React from 'react';
import Dashboard from '@/components/Dashboard/Dashboard';

export default function ChatPage() {
  return (
    <main className="min-h-screen">
      <Dashboard 
        username="Davis"
        profileImage="/dyor.png"  // Optional, will use default if not provided
      />
    </main>
  );
}