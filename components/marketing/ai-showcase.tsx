"use client";

import { motion } from "motion/react";
import { Bot, BrainCircuit, CheckCircle2, Send, Sparkles } from "lucide-react";

const capabilities = [
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

const ease = [0.22, 1, 0.36, 1] as const;

export default function AIShowcase() {
  return (
    <section id="ai" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute right-0 top-16 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Orbit AI Copilot
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            One AI assistant for your entire{" "}
            <span className="text-gradient">career journey.</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Orbit understands your profile, resume, roadmap and goals, then
            transforms scattered career advice into one intelligent action plan.
          </p>

          <div className="mt-8 space-y-3.5">
            {capabilities.map((text) => (
              <div key={text} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                </span>
                <span className="text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-5 sm:p-7"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold">Orbit AI</h3>
              <p className="flex items-center gap-1.5 text-sm text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Online · Context aware
              </p>
            </div>
          </div>

          <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-primary/15 px-4 py-3 text-sm text-foreground">
            I&apos;m an ECE student. Help me become an AI Engineer.
          </div>

          <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-5">
            <p className="mb-3 text-sm font-semibold text-primary">
              Here&apos;s your personalized strategy
            </p>
            <div className="space-y-3">
              {tasks.map((text) => (
                <div key={text} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-black/30 p-2 pl-4">
            <input
              placeholder="Ask Orbit AI anything..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
