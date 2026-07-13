"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const steps = [
  {
    step: "01",
    title: "Join & verify",
    description:
      "Sign up with Google or college email. Complete your profile in under 3 minutes. AI polishes it instantly.",
  },
  {
    step: "02",
    title: "Get matched",
    description:
      "Orbit surfaces alumni who fit your goals — with clear reasons why. Search in plain English when you need more.",
  },
  {
    step: "03",
    title: "Get introduced",
    description:
      "Request a warm intro through a mutual connection. AI drafts the message. You edit, send, and connect.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-y border-border bg-surface/50 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps to your first meaningful connection
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            From signup to warm intro in minutes — not months of cold messaging.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-8 hidden h-px bg-border md:block"
          />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative text-center md:text-left"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background font-mono text-sm font-semibold text-accent md:mx-0">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
