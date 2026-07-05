"use client";

import Link from "next/link";
import { ArrowRight, Orbit } from "lucide-react";
import { motion } from "motion/react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#020617]/95 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl display= align cenre items-center justify-between px-4 sm:px-6 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 shadow-lg shadow-green-500/30">
            <Orbit className="text-slate-950" size={22} />
          </div>

          <span className="text-2xl font-black text-white sm:text-3xl">
            Orbit
          </span>
        </Link>

        <div className="hidden gap-10 text-sm font-medium text-slate-300 md:flex">
          <a className="hover:text-green-300" href="#features">
            Features
          </a>
          <a className="hover:text-green-300" href="#ai">
            AI Copilot
          </a>
          <a className="hover:text-green-300" href="#about">
            About
          </a>
          <a className="hover:text-green-300" href="#contact">
            Contact
          </a>
        </div>

        <Link
          href="/login"
          className="green-button flex items-center gap-2 rounded-2xl px-3 py-2 text-sm sm:px-5 sm:py-3 sm:text-base"
        >
          Get Started
          <ArrowRight size={18} />
        </Link>
      </div>
    </motion.nav>
  );
}