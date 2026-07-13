"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, Orbit, X } from "lucide-react";
import { motion } from "motion/react";

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

const links = [
  ["Features", "#features"],
  ["AI Copilot", "#ai"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      aria-label="Primary navigation"
      className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-slate-950/78 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5 rounded-xl">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-lg shadow-indigo-950/40">
            <Orbit size={17} />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">Orbit</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.025] p-1 text-sm text-slate-400 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full px-4 py-2 transition hover:bg-white/[0.05] hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.04] hover:text-white sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-950/35 transition hover:-translate-y-0.5 hover:saturate-125"
          >
            Get started
            <ArrowRight size={15} />
          </Link>

          <DialogRoot open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger
              aria-label="Open navigation menu"
              className="flex size-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06] hover:text-white md:hidden"
            >
              <Menu size={17} />
            </DialogTrigger>
            <DialogPortal>
              <DialogBackdrop className="md:hidden" />
              <DialogPopup className="bottom-4 top-auto max-w-sm translate-y-0 p-5 md:hidden">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <DialogTitle>Explore Orbit</DialogTitle>
                    <DialogDescription>Navigate the product overview.</DialogDescription>
                  </div>
                  <DialogClose aria-label="Close navigation menu">
                    <X size={17} />
                  </DialogClose>
                </div>
                <div className="mt-5 grid gap-2">
                  {links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-white/8 hover:bg-white/[0.04] hover:text-white"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </DialogPopup>
            </DialogPortal>
          </DialogRoot>
        </div>
      </div>
    </motion.nav>
  );
}
