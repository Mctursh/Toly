"use client"
import DynamicProvider from '@/components/Context/DynamicProvider';
import HomePage from '@/components/Landing/Full';

export default function Home() {
  return (
    <DynamicProvider>
      <HomePage />
    </DynamicProvider>
  )
}