"use client";

import { motion } from "motion/react";
import {
  Users,
  Briefcase,
  BrainCircuit,
  TrendingUp,
} from "lucide-react";

export default function DashboardPreview() {
  const stats = [
    {
      title: "AI Resume Score",
      value: "94%",
      icon: BrainCircuit,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Mentors",
      value: "128",
      icon: Users,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Referrals",
      value: "42",
      icon: Briefcase,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Growth",
      value: "+18%",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center text-5xl font-bold"
        >
          AI Career Dashboard
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-slate-400">
                  {item.title}
                </h3>

                <p className="mt-2 text-5xl font-bold">
                  {item.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
