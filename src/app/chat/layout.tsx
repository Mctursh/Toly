// app/auth/signup/layout.tsx
import React from 'react';
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Toly | Chat With Toly About Solana',
    description: 'Ask Toly Something...',
  };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}