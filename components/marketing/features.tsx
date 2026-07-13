"use client";

import { motion } from "motion/react";
import {
  Bell,
  BrainCircuit,
  Briefcase,
  FileText,
  Network,
  Route,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Career Copilot",
    description: "Ask career questions, generate next steps, and get personalized advice.",
    tone: "border-indigo-400/12 bg-indigo-500/8 text-indigo-300",
  },
  {
    icon: FileText,
    title: "Smart Resume Analysis",
    description: "Analyze resume gaps, improve ATS readiness, and sharpen project impact.",
    tone: "border-violet-400/12 bg-violet-500/8 text-violet-300",
  },
  {
    icon: Network,
    title: "Alumni Intelligence",
    description: "Find the right alumni by company, branch, role, and career path.",
    tone: "border-cyan-400/12 bg-cyan-500/[0.07] text-cyan-300",
  },
  {
    icon: Route,
    title: "Personalized Roadmap",
    description: "Generate a practical weekly roadmap based on your dream company.",
    tone: "border-indigo-400/12 bg-indigo-500/8 text-indigo-300",
  },
  {
    icon: Briefcase,
    title: "Opportunity Engine",
    description: "Discover internships, jobs, referrals, and programs matched to you.",
    tone: "border-violet-400/12 bg-violet-500/8 text-violet-300",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Track resume, roadmap, AI, referral, and opportunity updates instantly.",
    tone: "border-cyan-400/12 bg-cyan-500/[0.07] text-cyan-300",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="pointer-events-none absolute -left-32 top-24 size-96 rounded-full bg-indigo-600/[0.08] blur-[140px]" />
      <div className="relative mx-auto max-w-[90rem]">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/14 bg-indigo-500/8 px-3 py-2 text-xs font-semibold text-indigo-200">
            <Sparkles size={14} />
            Everything you need
          </p>
          <h2 className="mt-6 text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            One focused career system.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
            Powerful AI tools and intelligent connections designed to accelerate
            every important step of your career journey.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-indigo-400/18 hover:bg-white/[0.035] hover:shadow-[var(--shadow-md)]"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-indigo-500/[0.07] blur-3xl transition group-hover:bg-violet-500/12" />
                <div className="relative">
                  <span className={"flex size-11 items-center justify-center rounded-2xl border " + feature.tone}>
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{feature.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
