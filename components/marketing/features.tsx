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
    description:
      "Get personalized career guidance powered by advanced AI models.",
  },
  {
    icon: Users,
    title: "Alumni Network",
    description:
      "Connect directly with successful alumni and industry mentors.",
  },
  {
    icon: Briefcase,
    title: "Referral Engine",
    description:
      "Discover opportunities and referral pathways from trusted professionals.",
  },
  {
    icon: Target,
    title: "Roadmap Builder",
    description:
      "Generate custom learning roadmaps for your dream career.",
  },
  {
    icon: Sparkles,
    title: "Resume Intelligence",
    description:
      "AI-powered resume analysis with actionable improvement suggestions.",
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    description:
      "Track your career readiness score and progress over time.",
  },
];

export default function Features() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl font-bold mb-6"
        >
          Everything You Need
        </motion.h2>

        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-16">
          Orbit combines AI, mentorship, networking and career intelligence
          into one powerful platform.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-7">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}