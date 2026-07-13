import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

import "./globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Orbit",
  description: "AI Career Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster richColors position="top-right" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
