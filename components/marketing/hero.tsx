"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  FileText,
  PlayCircle,
  Sparkles,
  Users,
} from "lucide-react";

const stats = [
  ["12.5K+", "Active Students"],
  ["4.8K+", "Alumni Connected"],
  ["2.3K+", "Opportunities"],
  ["96%", "Satisfaction"],
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:pb-28"
    >
      {/* Ambient glow + grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px] animate-glow-pulse" />
        <div className="absolute right-4 top-40 h-72 w-72 rounded-full bg-accent/15 blur-[120px]" />
        <div className="grid-texture absolute inset-0 opacity-70" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI Career Intelligence for ambitious students
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mt-7 text-balance font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Your career,
          <br />
          intelligently <span className="text-gradient">orbited.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.16 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Orbit connects your profile, resume, roadmap, alumni network and
          opportunities into one AI-powered career command center.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.24 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/login"
            className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base sm:w-auto"
          >
            Launch Orbit
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white/5 px-6 py-3.5 text-base font-medium text-foreground backdrop-blur-xl transition hover:border-primary/40 hover:bg-white/10 sm:w-auto"
          >
            <PlayCircle className="h-4 w-4" />
            View Demo
          </Link>
        </motion.div>
      </div>

      {/* Floating mission-control card */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.3 }}
        className="relative mx-auto mt-16 w-full max-w-3xl sm:mt-20"
      >
        <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/15 blur-3xl" />

        <div className="glass-strong rounded-3xl p-5 sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold sm:text-xl">
              Career Mission Control
            </h3>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              AI Online
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Metric icon={BrainCircuit} label="AI Readiness" value="94%" width="94%" />
            <Metric icon={FileText} label="Resume Score" value="88%" width="88%" />
            <Metric icon={Users} label="Alumni Matches" value="24" width="72%" />
          </div>

          <div className="mt-3 rounded-2xl border border-primary/20 bg-primary/[0.07] p-4">
            <p className="text-sm font-semibold text-primary">AI Insight</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Complete your profile and generate a roadmap to improve your
              referral readiness this week.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-white/[0.02] md:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label} className="bg-white/[0.015] px-4 py-6 text-center">
            <p className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              {value}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  width,
}: {
  icon: typeof BrainCircuit;
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-black/20 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
          <Icon className="h-4 w-4 text-primary" />
        </span>
        <p className="font-display text-xl font-bold">{value}</p>
      </div>
      <p className="mb-2 text-sm text-muted-foreground">{label}</p>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          style={{ width }}
        />
      </div>
    </div>
  );
}
