"use client";

import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { NotificationsPanel, UserMenu } from "@/components/app/app-navbar";
import { CommandPalette, useCommandPalette } from "@/components/app/command-palette";
import type { AuthUser } from "@/types/auth";

interface AppTopBarProps {
  user: AuthUser;
  onMenuClick?: () => void;
}

export function AppTopBar({ user, onMenuClick }: AppTopBarProps) {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-20 items-center gap-4 border-b border-border/60 bg-background/75 px-4 backdrop-blur-2xl lg:px-8">
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
            aria-label="Open menu"
          >
            <span className="sr-only">Menu</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        )}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex max-w-lg flex-1 items-center gap-3 rounded-full border border-border/70 bg-surface/55 px-4 py-2.5 text-sm text-text-tertiary transition-all hover:border-gold/40 hover:bg-surface"
        >
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1 text-left">Search people, paths, or possibilities…</span>
          <kbd className="hidden rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] sm:inline">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="hidden gap-1.5 text-ai sm:inline-flex"
            onClick={() => router.push("/app/network")}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            AI Match
          </Button>
          <ThemeToggle />
          <NotificationsPanel userId={user.uid} />
          <UserMenu user={user} />
          <div className="hidden sm:block">
            <SignOutButton />
          </div>
        </div>
      </header>

      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
}
