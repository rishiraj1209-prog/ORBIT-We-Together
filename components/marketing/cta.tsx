"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-600/25 via-white/5 to-cyan-500/20 p-10 text-center backdrop-blur-xl md:p-16"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <Sparkles className="text-cyan-300" />
        </div>

        <h2 className="text-4xl font-black tracking-tight md:text-6xl">
          Start building your career orbit today.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Discover alumni, improve your resume, generate a career roadmap and
          unlock referral opportunities with AI.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-slate-950 transition hover:scale-105">
            Get Started
            <ArrowRight size={18} />
          </button>

          <button className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10">
            Explore Demo
          </button>
        </div>
      </motion.div>
    </section>
  );
}