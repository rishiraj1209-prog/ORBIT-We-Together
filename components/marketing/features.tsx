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

const ease = [0.22, 1, 0.36, 1] as const;

export default function Features() {
  return (
    <section id="features" className="relative px-4 py-20 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Everything you need
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
            One platform.{" "}
            <span className="text-gradient">Infinite possibilities.</span>
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Powerful AI tools and intelligent connections to accelerate your
            career journey.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="glass group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_0_50px_-12px_oklch(0.78_0.17_155/0.4)]"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
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
