"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Orbit, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { label: "Features", href: "#features" },
  { label: "AI Copilot", href: "#ai" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "glass-strong shadow-2xl shadow-black/40"
            : "border border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
            <Orbit className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Orbit
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="btn-primary hidden items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm sm:inline-flex"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/5 text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-strong mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl p-3 md:hidden"
          >
            <div className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-border bg-white/5 px-4 py-2.5 text-center text-sm font-medium text-foreground"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="btn-primary rounded-xl px-4 py-2.5 text-center text-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
