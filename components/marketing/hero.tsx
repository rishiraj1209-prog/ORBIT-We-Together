"use client";

import { motion } from "motion/react";
import { ArrowRight, BrainCircuit, Sparkles } from "lucide-react";
import Link from "next/link";
import AnimatedBackground from "./animated-background";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
      <AnimatedBackground />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200 backdrop-blur-xl"
          >
            <Sparkles size={16} />
            AI Career Intelligence for ambitious students
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black leading-[1.02] tracking-tight md:text-7xl"
          >
            Your career,
            <br />
            intelligently{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              orbited.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-slate-400"
          >
            Orbit connects your profile, resume, roadmap, alumni network and
            opportunities into one AI-powered career command center.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:scale-105"
            >
              Launch Orbit
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              View Demo
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-cyan-500/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-indigo-950/40 backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Orbit AI</p>
                <h3 className="text-2xl font-black">Career Mission Control</h3>
              </div>

              <div className="rounded-2xl bg-indigo-500/20 p-3">
                <BrainCircuit className="text-cyan-300" />
              </div>
            </div>

            <div className="grid gap-4">
              {[
                ["AI Readiness", "94%"],
                ["Resume Score", "88%"],
                ["Alumni Matches", "24"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400">{label}</p>
                    <p className="text-2xl font-black">{value}</p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
              <p className="font-semibold text-cyan-200">AI Insight</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Complete your profile and generate a roadmap to improve your
                referral readiness this week.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
