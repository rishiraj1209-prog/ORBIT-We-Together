"use client";

import { motion } from "motion/react";
import {
  BrainCircuit,
  Bot,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function AISection() {
  return (
    <section
      id="ai"
      className="relative overflow-hidden px-6 py-32"
    >
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-green-500/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-green-300">
            <Sparkles size={16} />
            Orbit AI Copilot
          </div>

          <h2 className="text-5xl font-black leading-tight">
            One AI assistant
            <br />
            for your entire
            <br />
            <span className="green-text">career journey.</span>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            Orbit understands your profile, resume, roadmap and goals,
            then transforms scattered career advice into one intelligent
            action plan.
          </p>

          <div className="mt-10 space-y-5">

            <Feature text="Generate personalized roadmaps" />

            <Feature text="Analyze resumes instantly" />

            <Feature text="Write referral requests" />

            <Feature text="Recommend internships" />

            <Feature text="Match alumni automatically" />

          </div>
        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="green-glass rounded-[2.5rem] p-8">

            <div className="mb-8 flex items-center gap-4">

              <div className="rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 p-4">

                <Bot className="text-slate-950" size={30} />

              </div>

              <div>

                <h3 className="text-2xl font-bold">
                  Orbit AI
                </h3>

                <p className="text-green-300">
                  Online · Context aware
                </p>

              </div>

            </div>

            <div className="rounded-3xl bg-slate-900/60 p-5">

              <p className="text-slate-300">
                I'm an ECE student. Help me become an AI Engineer.
              </p>

            </div>

            <div className="my-5 h-px bg-white/10" />

            <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">

              <p className="mb-4 text-green-300 font-semibold">
                Here's your personalized strategy
              </p>

              <div className="space-y-4">

                <Task text="Master DSA fundamentals" />

                <Task text="Build 3 AI projects" />

                <Task text="Reach Codeforces Specialist" />

                <Task text="Apply for ML internships" />

              </div>

            </div>

            <div className="mt-6 rounded-2xl bg-black/30 p-4">

              <input
                placeholder="Ask Orbit AI anything..."
                className="w-full bg-transparent outline-none placeholder:text-slate-500"
              />

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-green-500/20 p-2">
        <BrainCircuit
          size={18}
          className="text-green-300"
        />
      </div>

      <span className="text-lg">
        {text}
      </span>
    </div>
  );
}

function Task({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        className="text-green-400"
        size={20}
      />

      <span>{text}</span>

    </div>
  );
}