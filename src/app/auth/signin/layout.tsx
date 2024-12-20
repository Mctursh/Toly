// app/auth/signup/layout.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Welcome Back - Toly.ai',
    description: 'Login to your account on Toly.ai',
  };

export default function SignupLayout({
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