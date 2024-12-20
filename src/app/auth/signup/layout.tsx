// app/auth/signup/layout.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Sign Up - Toly.ai',
    description: 'Create your account on Toly.ai',
  };

export default function SigninLayout({
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