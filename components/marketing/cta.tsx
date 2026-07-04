"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 via-indigo-500/10 to-cyan-500/10 p-10 text-center shadow-2xl shadow-indigo-950/40 backdrop-blur-2xl md:p-16"
      >
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-cyan-500/20">
            <Sparkles />
          </div>

          <h2 className="mx-auto max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Turn your college network into a career advantage.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Start with your profile, let Orbit AI build your roadmap, and move
            toward alumni, referrals, and opportunities with clarity.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-semibold text-slate-950 transition hover:scale-105"
            >
              Launch Orbit
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}