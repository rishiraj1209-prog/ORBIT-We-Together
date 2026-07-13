"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MARKETING_NAV } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/78 shadow-[0_8px_30px_rgba(0,0,0,.06)] backdrop-blur-2xl"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          <nav
            className="hidden items-center gap-9 rounded-full border border-border/60 bg-surface/35 px-6 py-2.5 backdrop-blur-md md:flex"
            aria-label="Main navigation"
          >
            {MARKETING_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[.08em] text-text-secondary transition-colors hover:text-text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup" className="hidden sm:inline-flex">
              <Button size="sm">Enter Orbit</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-b border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {MARKETING_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Get started</Button>
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
