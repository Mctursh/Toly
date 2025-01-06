import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toly.ai",
  description: "Your AI Companion on the Solana Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
