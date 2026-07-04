"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-3xl font-black text-transparent"
        >
          Orbit
        </Link>

        <div className="hidden gap-10 text-sm text-slate-300 md:flex">
          <a href="#features">Features</a>
          <a href="#ai">AI</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:scale-105">
          <Link
  href="/login"
  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:scale-105"
>
  Get Started
  <ArrowRight size={18} />
</Link> Get Started
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.nav>
  );
}