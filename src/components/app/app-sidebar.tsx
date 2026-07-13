"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Calendar,
  Gift,
  Handshake,
  Home,
  MessageSquare,
  Network,
  Shield,
  Users,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { APP_NAV, ADMIN_NAV, APP_ROUTES } from "@/lib/constants/app";
import { cn } from "@/lib/utils/cn";
import type { AuthUser } from "@/types/auth";

const ICON_MAP = {
  home: Home,
  users: Users,
  network: Network,
  messages: MessageSquare,
  handshake: Handshake,
  briefcase: Briefcase,
  calendar: Calendar,
  gift: Gift,
  shield: Shield,
} as const;

interface AppSidebarProps {
  user: AuthUser;
  collapsed?: boolean;
}

export function AppSidebar({ user, collapsed }: AppSidebarProps) {
  const pathname = usePathname();
  const navItems = user.role === "admin" ? [...APP_NAV, ...ADMIN_NAV] : APP_NAV;

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border/60 bg-surface/65 backdrop-blur-2xl",
        collapsed ? "w-[72px]" : "w-[276px]"
      )}
    >
      <div className={cn("flex h-20 items-center border-b border-border/60", collapsed ? "justify-center px-2" : "px-6")}>
        {collapsed ? (
          <Link href={APP_ROUTES.home} className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            O
          </Link>
        ) : (
          <Logo />
        )}
      </div>

      {!collapsed && <p className="px-6 pb-2 pt-7 text-[9px] font-semibold uppercase tracking-[.24em] text-text-tertiary">Your Orbit</p>}
      <nav className="flex-1 space-y-1 px-3" aria-label="App navigation">
        {navItems.map((item) => {
          const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? Home;
          const isActive =
            pathname === item.href ||
            (item.href !== APP_ROUTES.home && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-text-primary text-background shadow-[0_8px_22px_rgba(0,0,0,.12)]"
                  : "text-text-secondary hover:bg-surface-elevated/80 hover:text-text-primary",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive && "text-gold")} aria-hidden="true" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="border-t border-border/60 p-4">
          <div className="relative overflow-hidden rounded-2xl border border-gold/25 bg-ink p-4 text-[#f3efe6]">
            <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-[#c8a96c]/15 blur-xl" />
            <p className="relative text-[10px] font-medium uppercase tracking-[.18em] text-[#c8a96c]">Orbit signal</p>
            <p className="relative mt-2 text-xs leading-5 text-[#aaa99f]">3 timely connections are emerging in your graph.</p>
            <div className="relative mt-3 flex items-center gap-2 text-[10px] text-[#e8e3da]"><span className="h-1.5 w-1.5 rounded-full bg-[#8dc7a9]"/> Intelligence active</div>
          </div>
        </div>
      )}
    </aside>
  );
}
