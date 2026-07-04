"use client";

import { motion } from "motion/react";
import {
  BrainCircuit,
  Users,
  Briefcase,
  Target,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Career Copilot",
    description: "Ask career questions, generate roadmaps, and get personalized next steps.",
    metric: "24×7",
  },
  {
    icon: Users,
    title: "Alumni Intelligence",
    description: "Find the right alumni by company, role, branch, and career path.",
    metric: "Smart Match",
  },
  {
    icon: Briefcase,
    title: "Referral Engine",
    description: "Discover referral-backed opportunities matched to your profile.",
    metric: "AI Ranked",
  },
  {
    icon: Target,
    title: "Roadmap Builder",
    description: "Turn your dream company goal into practical weekly career missions.",
    metric: "90 Days",
  },
  {
    icon: Sparkles,
    title: "Resume Intelligence",
    description: "Analyze resume gaps, improve ATS readiness, and save feedback.",
    metric: "ATS Ready",
  },
  {
    icon: TrendingUp,
    title: "Progress Dashboard",
    description: "Track profile completion, AI readiness, activity, and career growth.",
    metric: "Live Score",
  },
];

export default function Features() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <Sparkles size={16} />
            One career operating system
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            Everything students need to move from ambition to opportunity.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Orbit brings together AI, alumni, resumes, referrals, roadmaps and progress tracking inside one polished career workspace.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.12)]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-400/20" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 shadow-lg shadow-cyan-500/20">
                    <Icon size={28} className="text-cyan-200" />
                  </div>

                  <p className="mb-3 text-sm font-semibold text-cyan-300">
                    {feature.metric}
                  </p>

                  <h3 className="text-2xl font-bold">{feature.title}</h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}