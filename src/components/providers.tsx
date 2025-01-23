'use client';

import { ChatProvider } from "./Context/ChatProvider";

export default function Providers({ children }: { children: React.ReactNode }) {

  return (
    <ChatProvider>
        {children}
    </ChatProvider>
  );
}
