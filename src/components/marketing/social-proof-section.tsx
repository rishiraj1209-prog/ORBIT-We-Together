"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { STATS } from "@/lib/constants/site";

const communityUseCases = [
  {
    title: "For students",
    description:
      "Discover relevant alumni with clear context before sending a thoughtful request.",
    marker: "ST",
  },
  {
    title: "For alumni",
    description:
      "Review well-framed requests, mentor intentionally, and open trusted doors without inbox noise.",
    marker: "AL",
  },
  {
    title: "For community teams",
    description:
      "Operate a living, permission-aware directory instead of a stale spreadsheet.",
    marker: "CT",
  },
];

export function SocialProofSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Designed for every side of a trusted community
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="rounded-xl border border-border bg-surface p-6 text-center"
            >
              <p className="text-3xl font-semibold tabular-nums tracking-tight text-accent">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {communityUseCases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full border-border/80">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-subtle text-xs font-semibold text-accent">
                    {item.marker}
                  </div>
                  <div className="mt-8 border-t border-border pt-6">
                    <div>
                      <p className="text-base font-medium">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
