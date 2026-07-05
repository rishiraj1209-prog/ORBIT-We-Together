"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        viewport={{ once: true }}
        className="glass-strong relative mx-auto max-w-4xl overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 hairline" />
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </span>

        <h2 className="mx-auto mt-7 max-w-2xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Start building your{" "}
          <span className="text-gradient">career orbit</span> today.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Create your profile, generate your roadmap, analyze your resume and move
          toward alumni-backed opportunities with clarity.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base sm:w-auto"
          >
            Launch Orbit
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white/5 px-6 py-3.5 text-base font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10 sm:w-auto"
          >
            View Dashboard
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
