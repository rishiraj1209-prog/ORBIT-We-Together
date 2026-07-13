"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  BrainCircuit,
  Briefcase,
  FileText,
  Gift,
  Home,
  MoreHorizontal,
  Network,
  Route,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";

import {
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const primaryItems = navItems.slice(0, 5);
const networkItems = navItems.slice(5);
const mobileItems = navItems.slice(0, 4);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const moreIsActive = networkItems.some((item) => pathname === item.href);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020617] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_8%,rgba(79,70,229,0.16),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(124,58,237,0.11),transparent_27%),radial-gradient(circle_at_52%_100%,rgba(8,145,178,0.08),transparent_36%),linear-gradient(180deg,#020617,#020617)]" />

      <div className="grid min-h-screen lg:grid-cols-[272px_minmax(0,1fr)] xl:grid-cols-[288px_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/8 bg-slate-950/55 px-5 py-6 backdrop-blur-2xl lg:sticky lg:top-0 lg:block lg:h-screen lg:overflow-y-auto">
          <Link
            href="/dashboard"
            className="mb-8 flex items-center gap-3 rounded-2xl px-2 py-1.5 focus-visible:outline-offset-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-lg shadow-indigo-950/40">
              <Sparkles className="text-white" size={18} />
            </div>

            <div>
              <span className="block text-xl font-bold tracking-tight text-white">Orbit</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Career Intelligence
              </span>
            </div>
          </Link>

          <nav aria-label="Application navigation" className="space-y-7">
            <NavGroup label="Workspace" items={primaryItems} pathname={pathname} />
            <NavGroup label="Network" items={networkItems} pathname={pathname} />
          </nav>

          <div className="mt-8 rounded-2xl border border-indigo-400/10 bg-gradient-to-br from-indigo-500/10 to-cyan-500/[0.04] p-4">
            <p className="text-xs font-semibold text-indigo-200">Orbit AI</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your profile powers personalized career intelligence.
            </p>
          </div>
        </aside>

        <section className="min-w-0 pb-24 lg:pb-0">
          <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/8 bg-slate-950/80 px-4 backdrop-blur-2xl lg:hidden">
            <Link href="/dashboard" className="flex items-center gap-2.5 rounded-xl">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-md shadow-indigo-950/40">
                <Sparkles size={14} />
              </span>
              <span className="text-lg font-bold tracking-tight">Orbit</span>
            </Link>

            <Link
              href="/notifications"
              aria-label="Open notifications"
              className="relative flex size-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.035] text-slate-400 transition hover:bg-white/[0.07] hover:text-white"
            >
              <Bell size={17} />
            </Link>
          </div>

          {children}
        </section>
      </div>

      <nav
        aria-label="Mobile application navigation"
        className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-50 grid w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 grid-cols-5 rounded-[1.35rem] border border-white/10 bg-slate-950/92 p-1.5 shadow-2xl shadow-black/45 backdrop-blur-2xl lg:hidden"
      >
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-0 flex-col items-center gap-1 rounded-2xl px-1.5 py-2 text-[10px] font-medium transition ${
                active
                  ? "bg-indigo-500/12 text-indigo-200"
                  : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}

        <DialogRoot open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <DialogTrigger
            className={`flex min-w-0 flex-col items-center gap-1 rounded-2xl px-1.5 py-2 text-[10px] font-medium transition ${
              mobileMenuOpen || moreIsActive
                ? "bg-indigo-500/12 text-indigo-200"
                : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
            }`}
          >
            <MoreHorizontal size={18} />
            More
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop className="lg:hidden" />
            <DialogPopup className="bottom-[max(0.75rem,env(safe-area-inset-bottom))] top-auto max-w-md translate-y-0 p-5 lg:hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle>All destinations</DialogTitle>
                  <DialogDescription>Navigate anywhere in your Orbit workspace.</DialogDescription>
                </div>
                <DialogClose aria-label="Close navigation menu">
                  <X size={18} />
                </DialogClose>
              </div>

              <nav aria-label="All application destinations" className="mt-5 grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition ${
                        active
                          ? "border-indigo-400/20 bg-indigo-500/12 text-indigo-200"
                          : "border-transparent text-slate-400 hover:border-white/8 hover:bg-white/[0.045] hover:text-white"
                      }`}
                    >
                      <Icon size={17} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </DialogPopup>
          </DialogPortal>
        </DialogRoot>
      </nav>
    </main>
  );
}

function NavGroup({
  label,
  items,
  pathname,
}: {
  label: string;
  items: typeof navItems;
  pathname: string;
}) {
  return (
    <div>
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
        {label}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-indigo-500/12 text-indigo-100 shadow-sm shadow-indigo-950/20"
                  : "text-slate-500 hover:bg-white/[0.045] hover:text-slate-200"
              }`}
            >
              {active && (
                <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-indigo-400 to-cyan-400" />
              )}
              <Icon
                size={17}
                className={active ? "text-indigo-300" : "transition group-hover:text-slate-300"}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
