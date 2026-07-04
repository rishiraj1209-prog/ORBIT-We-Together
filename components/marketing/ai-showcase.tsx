"use client";

import { motion } from "motion/react";
import {
  BrainCircuit,
  CheckCircle2,
  FileText,
  Route,
  Send,
  Sparkles,
  Users,
} from "lucide-react";

const suggestions = [
  "Create my Google roadmap",
  "Review my resume",
  "Find AI mentors",
  "Write referral message",
];

const outcomes = [
  { icon: FileText, label: "Resume gaps detected" },
  { icon: Route, label: "90-day roadmap generated" },
  { icon: Users, label: "24 alumni matches found" },
];

export default function AIShowcase() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <Sparkles size={16} />
            Orbit AI Copilot
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            One AI assistant for your entire career journey.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Orbit understands your profile, resume, roadmap and goals — then
            turns scattered career advice into clear next actions.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {suggestions.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:bg-white/10"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-7 shadow-2xl shadow-indigo-950/40 backdrop-blur-2xl"
        >
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 p-3">
                  <BrainCircuit />
                </div>

                <div>
                  <h3 className="font-bold">Orbit AI</h3>
                  <p className="text-sm text-emerald-400">Online · Context aware</p>
                </div>
              </div>

              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                Live
              </span>
            </div>

            <div className="space-y-5">
              <div className="ml-auto max-w-sm rounded-[1.4rem] bg-indigo-600/25 p-5">
                I’m an ECE student. Help me become an AI engineer.
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
                <p className="font-semibold text-cyan-200">
                  Here’s your personalized strategy:
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Strengthen DSA and Python fundamentals.",
                    "Build one deployed AI + full-stack project.",
                    "Connect with alumni in AI, robotics and ML roles.",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-400" size={19} />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {outcomes.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <Icon className="mb-3 text-cyan-300" size={20} />
                      <p className="text-sm text-slate-300">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 flex overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <input
                placeholder="Ask Orbit AI..."
                className="flex-1 bg-transparent px-5 py-4 outline-none"
              />

              <button className="flex items-center justify-center bg-indigo-600 px-6 transition hover:bg-indigo-500">
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}