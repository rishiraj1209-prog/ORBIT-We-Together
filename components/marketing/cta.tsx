"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/12 blur-[150px]" />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-[82rem] overflow-hidden rounded-[2rem] border border-indigo-400/14 bg-gradient-to-br from-indigo-500/12 via-violet-500/[0.055] to-cyan-500/[0.025] px-5 py-12 text-center shadow-[var(--shadow-lg)] sm:px-10 sm:py-16"
      >
        <div className="absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-violet-500/16 blur-3xl" />
        <div className="relative">
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-xl shadow-indigo-950/40">
            <Sparkles size={20} />
          </span>
          <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Start building your career orbit today.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Create your profile, generate your roadmap, analyze your resume, and
            move toward alumni-backed opportunities with clarity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:-translate-y-0.5 hover:saturate-125"
            >
              Launch Orbit
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center rounded-2xl border border-white/10 bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:border-white/18 hover:bg-white/[0.07]"
            >
              View dashboard
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
