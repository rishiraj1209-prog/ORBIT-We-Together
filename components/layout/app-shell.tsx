"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BrainCircuit,
  Briefcase,
  FileText,
  Gift,
  Home,
  Network,
  Orbit,
  Route,
  Settings,
  User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Profile", href: "/profile", icon: User },
  { label: "AI", href: "/ai", icon: BrainCircuit },
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "Roadmap", href: "/roadmap", icon: Route },
  { label: "Alumni", href: "/alumni", icon: Network },
  { label: "Jobs", href: "/opportunities", icon: Briefcase },
  { label: "Referrals", href: "/referrals", icon: Gift },
  { label: "Alerts", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

const mobileItems = navItems.slice(0, 5);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[264px_1fr]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-sidebar/60 p-5 backdrop-blur-2xl lg:flex">
          <Link href="/dashboard" className="mb-8 flex items-center gap-2.5 px-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
              <Orbit className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-2xl font-bold">Orbit</span>
          </Link>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    active
                      ? "border border-primary/25 bg-primary/12 text-primary"
                      : "border border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] ${
                      active ? "text-primary" : "group-hover:text-foreground"
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="glass mt-4 rounded-2xl p-4">
            <p className="text-sm font-semibold text-foreground">Orbit Pro</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Unlock deeper AI insights and unlimited roadmaps.
            </p>
          </div>
        </aside>

        {/* Content */}
        <section className="min-w-0 pb-28 lg:pb-0">
          <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/70 px-4 py-3.5 backdrop-blur-2xl lg:hidden">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Orbit className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-display text-xl font-bold">Orbit</span>
            </Link>
            <Link
              href="/notifications"
              aria-label="Notifications"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white/5 text-muted-foreground"
            >
              <Bell className="h-[18px] w-[18px]" />
            </Link>
          </div>

          {children}
        </section>
      </div>

      {/* Mobile bottom nav */}
      <nav className="glass-strong fixed bottom-3 left-1/2 z-50 grid w-[94%] max-w-md -translate-x-1/2 grid-cols-5 gap-1 rounded-2xl p-2 lg:hidden">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium transition ${
                active ? "bg-primary/12 text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
