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
    description:
      "Ask career questions, generate next steps, and get personalized advice.",
  },
  {
    icon: FileText,
    title: "Smart Resume Analysis",
    description:
      "Analyze resume gaps, improve ATS readiness, and sharpen project impact.",
  },
  {
    icon: Network,
    title: "Alumni Intelligence",
    description:
      "Find the right alumni by company, branch, role, and career path.",
  },
  {
    icon: Route,
    title: "Personalized Roadmap",
    description:
      "Generate a practical weekly roadmap based on your dream company.",
  },
  {
    icon: Briefcase,
    title: "Opportunity Engine",
    description:
      "Discover internships, jobs, referrals, and programs matched to you.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description:
      "Track resume, roadmap, AI, referral, and opportunity updates instantly.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-8 py-36 lg:px-10">
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-green-500/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <Sparkles size={16} />
            Everything you need
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            One platform.{" "}
            <span className="green-text">Infinite possibilities.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Powerful AI tools and intelligent connections to accelerate your
            career journey.
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
                className="group green-glass relative overflow-hidden rounded-[2rem] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-green-400/40 hover:shadow-[0_0_45px_rgba(34,197,94,0.16)]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-500/10 blur-3xl transition group-hover:bg-lime-400/20" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 shadow-lg shadow-green-500/20">
                    <Icon size={27} className="text-slate-950" />
                  </div>

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
