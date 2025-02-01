import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import ToastProvider from "@/components/Toast/ToastProvider";

export const metadata: Metadata = {
  title: "Toly.ai",
  description: "Your AI Companion on the Solana Blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <ToastProvider />
      </body>
    </html>
  );
}
