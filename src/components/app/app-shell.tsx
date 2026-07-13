"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopBar } from "@/components/app/app-top-bar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { AuthUser } from "@/types/auth";
import { OrbitConcierge } from "@/components/app/orbit-concierge";

interface AppShellProps {
  user: AuthUser;
  children: React.ReactNode;
}

export function AppShell({ user, children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden lg:flex">
        <AppSidebar user={user} />
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0">
          <AppSidebar user={user} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppTopBar user={user} onMenuClick={() => setMobileOpen(true)} />
        <main className="relative flex-1 overflow-y-auto bg-[radial-gradient(circle_at_80%_0%,rgba(184,154,99,.07),transparent_25%)]">
          <div className="mx-auto max-w-[1500px] px-4 py-7 lg:px-10 lg:py-10">
            {children}
          </div>
        </main>
      </div>
      <OrbitConcierge name={user.displayName} />
    </div>
  );
}
