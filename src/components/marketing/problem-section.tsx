"use client";

import { motion } from "framer-motion";
import { BookOpen, MessageCircleOff, UsersRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const problems = [
  {
    icon: BookOpen,
    title: "Broken discovery",
    description:
      "Alumni directories are static phone books. You can't find who actually matters for your goals.",
  },
  {
    icon: MessageCircleOff,
    title: "Awkward outreach",
    description:
      "Students don't know who to message or what to say. Cold DMs get ignored.",
  },
  {
    icon: UsersRound,
    title: "Dead networks",
    description:
      "One-time signup, zero ongoing value. WhatsApp groups fade after graduation.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Alumni networks fail for predictable reasons
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            LinkedIn is too broad. WhatsApp is too messy. Orbit is the
            intelligent layer your college actually needs.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full border-border/80 bg-surface transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle">
                    <problem.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {problem.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
