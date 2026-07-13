"use client";

import { motion } from "motion/react";
import { BrainCircuit, Bot, CheckCircle2, Send, Sparkles } from "lucide-react";

const features = [
  "Generate personalized roadmaps",
  "Analyze resumes instantly",
  "Write referral requests",
  "Recommend internships",
  "Match alumni automatically",
];

const tasks = [
  "Master DSA fundamentals",
  "Build 3 AI projects",
  "Reach Codeforces Specialist",
  "Apply for ML internships",
];

export default function AISection() {
  return (
    <section id="ai" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="pointer-events-none absolute left-[8%] top-1/3 size-96 rounded-full bg-indigo-600/[0.09] blur-[140px]" />
      <div className="relative mx-auto grid max-w-[90rem] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/14 bg-indigo-500/8 px-3 py-2 text-xs font-semibold text-indigo-200">
            <Sparkles size={14} />
            Orbit AI Copilot
          </p>
          <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            One AI assistant for your entire{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              career journey.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-500">
            Orbit understands your profile, resume, roadmap, and goals, then
            transforms scattered career advice into one intelligent action plan.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((text) => (
              <div key={text} className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex size-7 items-center justify-center rounded-lg border border-indigo-400/10 bg-indigo-500/[0.07] text-indigo-300">
                  <BrainCircuit size={13} />
                </span>
                {text}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-violet-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/74 p-4 shadow-[var(--shadow-lg)] backdrop-blur-2xl sm:p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
            <div className="flex items-center gap-3 border-b border-white/8 pb-5">
              <span className="relative flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400">
                <Bot size={19} />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">Orbit AI</h3>
                <p className="mt-0.5 text-[10px] text-cyan-300">Online · Context aware</p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <div className="max-w-[85%] rounded-[1.25rem] rounded-tr-md border border-indigo-400/14 bg-indigo-500/10 px-4 py-3 text-sm leading-6 text-slate-300">
                I&apos;m an ECE student. Help me become an AI Engineer.
              </div>
            </div>

            <div className="mt-4 rounded-[1.25rem] rounded-tl-md border border-white/8 bg-white/[0.03] p-4 sm:p-5">
              <p className="flex items-center gap-2 text-xs font-semibold text-indigo-200">
                <Sparkles size={14} />
                Here&apos;s your personalized strategy
              </p>
              <div className="mt-4 space-y-3">
                {tasks.map((text) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 className="shrink-0 text-cyan-400" size={15} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/8 bg-black/25 p-1.5">
              <input
                aria-label="Ask Orbit AI"
                placeholder="Ask Orbit AI anything..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-700"
              />
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 text-white">
                <Send size={15} />
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
