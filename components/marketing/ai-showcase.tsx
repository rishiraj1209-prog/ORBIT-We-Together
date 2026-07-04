"use client";

import { motion } from "motion/react";
import {
  BrainCircuit,
  Sparkles,
  Send,
  CheckCircle2,
} from "lucide-react";

const suggestions = [
  "How can I crack Google?",
  "Review my resume",
  "Find Robotics mentors",
  "Create my AI roadmap",
];

export default function AIShowcase() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-300"
          >
            <Sparkles size={16} />
            AI Career Copilot
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-5xl font-bold leading-tight"
          >
            Your personal AI mentor, available 24×7.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-lg leading-8 text-slate-400"
          >
            Orbit helps students discover mentors, improve resumes, generate
            career roadmaps, prepare for interviews and connect with the right
            alumni.
          </motion.p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {suggestions.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500">
              <BrainCircuit />
            </div>

            <div>
              <h3 className="font-semibold">Orbit AI</h3>
              <p className="text-sm text-green-400">Online</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="ml-auto max-w-sm rounded-2xl bg-indigo-500/20 p-5">
              Help me become an AI Engineer.
            </div>

            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-slate-300">
                Based on your interests I recommend:
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" />
                  Learn DSA deeply
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" />
                  Build AI + full-stack projects
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" />
                  Connect with Robotics and ML alumni
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <input
              placeholder="Ask Orbit AI..."
              className="flex-1 rounded-l-xl border border-white/10 bg-black/20 px-5 py-4 outline-none"
            />

            <button className="flex items-center justify-center rounded-r-xl bg-indigo-600 px-6">
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}