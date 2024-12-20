// app/auth/signup/layout.tsx
import React from 'react';
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Chat - Toly.ai',
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