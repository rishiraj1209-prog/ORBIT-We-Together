 "use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
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

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen scroll-mt-28 overflow-visible px-4 pt-20 sm:px-6 sm:pt-24 lg:px-16 lg:pt-32"
    >
      <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500/20 blur-[120px]" />
      <div className="absolute right-10 top-40 h-72 w-72 rounded-full bg-lime-400/10 blur-[100px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-0 sm:px-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-12">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300"
          >
            <Sparkles size={16} />
            AI Career Intelligence for ambitious students
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10 max-w-2xl text-4xl font-black leading-[1.18] tracking-tight sm:text-5xl md:text-7xl">
            Your career,
            <br />
            intelligently{" "}
            <span className="green-text">orbited.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
          >
            Orbit connects your profile, resume, roadmap, alumni network and
            opportunities into one AI-powered career command center.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3 sm:gap-4"
          >
            <Link
              href="/login"
className="green-button inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm sm:px-7 sm:py-4 sm:text-base"
            >
              Launch Orbit
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-green-400/40 hover:bg-white/10 sm:px-7 sm:py-4 sm:text-base"
            >
              View Demo
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative lg:justify-self-end"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-green-500/20 blur-3xl" />

          <div className="green-glass relative rounded-[2.5rem] p-7 shadow-2xl shadow-green-950/40">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-black">Career Mission Control</h3>
              <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-300">
                AI Online
              </span>
            </div>

            <Metric icon={BrainCircuit} label="AI Readiness" value="94%" />
            <Metric icon={FileText} label="Resume Score" value="88%" />
            <Metric icon={Users} label="Alumni Matches" value="24" />

            <div className="mt-5 rounded-3xl border border-green-500/20 bg-green-500/10 p-5">
              <p className="font-semibold text-green-300">AI Insight</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Complete your profile and generate a roadmap to improve your
                referral readiness this week.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 grid w-full max-w-7xl gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-black/20 p-6 shadow-2xl shadow-green-950/30 backdrop-blur-2xl sm:mt-24 sm:rounded-[2.5rem] sm:p-8 md:grid-cols-4 lg:px-12">
        {stats.map(([value, label]) => (
          <div key={label} className="text-center">
            <p className="text-4xl font-black text-white">{value}</p>
            <p className="mt-2 text-sm text-slate-400">{label}</p>
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
}: {
  icon: typeof BrainCircuit;
  label: string;
  value: string;
}) {
  return (
    <div className="mb-4 rounded-3xl border border-white/10 bg-black/20 p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-green-500/15 p-3">
            <Icon className="text-green-300" size={22} />
          </div>
          <p className="font-medium text-slate-200">{label}</p>
        </div>
        <p className="text-2xl font-black">{value}</p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-green-400 via-lime-400 to-teal-400" />
      </div>
    </div>
  );
}