"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden px-8 py-36 lg:px-10">
      <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500/15 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="green-glass relative mx-auto max-w-6xl overflow-hidden rounded-[2.7rem] p-10 text-center shadow-2xl shadow-green-950/40 md:p-16"
      >
        <div className="absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-green-400 to-transparent" />

        <div className="relative">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 shadow-lg shadow-green-500/20">
            <Sparkles className="text-slate-950" />
          </div>

          <h2 className="mx-auto max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Start building your{" "}
            <span className="green-text">career orbit</span> today.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Create your profile, generate your roadmap, analyze your resume and
            move toward alumni-backed opportunities with clarity.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="green-button inline-flex items-center gap-2 rounded-2xl px-7 py-4"
            >
              Launch Orbit
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white transition hover:border-green-400/40 hover:bg-white/10"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}