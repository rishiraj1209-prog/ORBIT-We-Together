import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLoadingSkeleton } from "@/components/auth/auth-loading-skeleton";

export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AuthLoadingSkeleton />}>{children}</Suspense>
  );
}
