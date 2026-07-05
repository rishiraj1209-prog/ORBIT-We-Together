import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbit — AI Career Intelligence",
  description:
    "Orbit connects your profile, resume, roadmap, alumni network and opportunities into one AI-powered career command center.",
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark bg-background ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <Toaster richColors theme="dark" position="top-right" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
