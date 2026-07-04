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
  Route,
  Settings,
  Sparkles,
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
    <main className="min-h-screen overflow-x-hidden bg-[#020617] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(132,204,22,0.11),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(20,184,166,0.12),transparent_35%),linear-gradient(180deg,#020617,#020617)]" />

      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-white/10 bg-white/[0.035] p-6 backdrop-blur-2xl lg:block">
          <Link href="/dashboard" className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 shadow-lg shadow-green-500/25">
              <Sparkles className="text-slate-950" size={20} />
            </div>

            <span className="text-3xl font-black text-white">Orbit</span>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    active
                      ? "border border-green-400/20 bg-green-500/10 text-green-300 shadow-lg shadow-green-500/10"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    className={active ? "text-green-300" : "group-hover:text-green-300"}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0 pb-24 lg:pb-0">
          <div className="sticky top-0 z-40 border-b border-white/10 bg-[#020617]/80 px-6 py-4 backdrop-blur-2xl lg:hidden">
            <Link href="/dashboard" className="text-2xl font-black">
              Orbit
            </Link>
          </div>

          {children}
        </section>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-50 grid w-[92%] max-w-md -translate-x-1/2 grid-cols-5 rounded-3xl border border-white/10 bg-[#020617]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:hidden">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] transition ${
                active ? "bg-green-500/10 text-green-300" : "text-slate-400"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </main>
  );
}