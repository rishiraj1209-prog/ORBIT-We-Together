"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import { AUTH_ROUTES } from "@/lib/constants/auth";
import { useAuth } from "@/hooks/use-auth";

export function SignOutButton() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOut();
      router.push(AUTH_ROUTES.login);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSignOut}
      disabled={loading}
      aria-busy={loading}
      className="gap-2"
    >
      {loading ? (
        <AuthSpinner />
      ) : (
        <LogOut className="h-4 w-4" aria-hidden="true" />
      )}
      Sign out
    </Button>
  );
}
