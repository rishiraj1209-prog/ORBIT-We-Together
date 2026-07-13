"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Sparkles,
  Users,
} from "lucide-react";

const stats = [
  ["12.5K+", "Active Students"],
  ["4.8K+", "Alumni Connected"],
  ["2.3K+", "Opportunities"],
  ["96%", "Satisfaction"],
];

const metrics = [
  { icon: BrainCircuit, label: "AI Readiness", value: "94%", width: "94%" },
  { icon: FileText, label: "Resume Score", value: "88%", width: "88%" },
  { icon: Users, label: "Alumni Matches", value: "24", width: "76%" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-10 lg:pb-24"
    >
      <div className="pointer-events-none absolute left-[6%] top-16 size-[30rem] rounded-full bg-indigo-600/16 blur-[140px]" />
      <div className="pointer-events-none absolute right-[3%] top-40 size-[26rem] rounded-full bg-violet-600/12 blur-[130px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(rgba(255,255,255,0.065)_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto grid w-full max-w-[90rem] items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(30rem,1.05fr)] lg:gap-16">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-400/14 bg-indigo-500/8 px-3.5 py-2 text-xs font-semibold text-indigo-200"
          >
            <Sparkles size={14} />
            AI Career Intelligence for ambitious students
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-7 max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
          >
            Your career,
            <br />
            intelligently{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              orbited.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8"
          >
            Orbit connects your profile, resume, roadmap, alumni network, and
            opportunities into one AI-powered career command center.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/signup"
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:-translate-y-0.5 hover:saturate-125"
            >
              Launch Orbit
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center rounded-2xl border border-white/10 bg-white/[0.035] px-6 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/18 hover:bg-white/[0.07]"
            >
              View demo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.34 }}
            className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600"
          >
            {["No credit card", "Firebase secured", "Built for students"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-cyan-400" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-indigo-500/14 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/74 p-4 shadow-[var(--shadow-lg)] backdrop-blur-2xl sm:p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/55 to-transparent" />
            <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-5">
              <div>
                <p className="text-xs font-semibold text-white">Career Mission Control</p>
                <p className="mt-1 text-[10px] text-slate-600">Personalized workspace overview</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/12 bg-cyan-500/[0.06] px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-200">
                <span className="size-1.5 rounded-full bg-cyan-400" />
                AI online
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {metrics.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                    <Icon size={17} className="text-indigo-300" />
                    <p className="mt-4 text-[10px] text-slate-600">{item.label}</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-white">{item.value}</p>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
                        style={{ width: item.width }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-2xl border border-indigo-400/12 bg-gradient-to-br from-indigo-500/9 to-violet-500/[0.035] p-5">
                <p className="flex items-center gap-2 text-xs font-semibold text-indigo-200">
                  <Sparkles size={14} />
                  AI Insight
                </p>
                <p className="mt-3 text-xs leading-6 text-slate-400">
                  Complete your profile and generate a roadmap to improve your
                  referral readiness this week.
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                <p className="text-[10px] uppercase tracking-[0.12em] text-slate-600">Next action</p>
                <p className="mt-2 text-sm font-medium text-slate-200">Analyze resume</p>
                <p className="mt-2 text-[10px] text-cyan-300">+12 readiness points</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 grid w-full max-w-[90rem] grid-cols-2 divide-x divide-y divide-white/8 overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.025] sm:mt-20 md:grid-cols-4 md:divide-y-0">
        {stats.map(([value, label]) => (
          <div key={label} className="px-4 py-5 text-center sm:py-6">
            <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{value}</p>
            <p className="mt-1.5 text-[10px] text-slate-600 sm:text-xs">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
