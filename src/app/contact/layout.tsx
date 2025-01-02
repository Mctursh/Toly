// app/auth/signup/layout.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Get In Touch - Toly.ai',
    description: 'Send us a message',
  };

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}