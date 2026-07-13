"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { ProductPreview } from "@/components/marketing/product-preview";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE, STATS } from "@/lib/constants/site";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-subtle)_0%,_transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] opacity-30"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <p className="mb-4 inline-flex items-center rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm">
                AI-powered alumni networking
              </p>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
            >
              {SITE.tagline}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="mt-6 text-lg leading-relaxed text-text-secondary"
            >
              Orbit uses AI to surface the alumni you should know — then helps
              you get a warm introduction. Verified. Private. Actually useful.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get started — it&apos;s free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Play className="h-4 w-4" />
                  See how it works
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="mt-10 flex flex-wrap gap-8 border-t border-border pt-8"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-semibold tabular-nums tracking-tight text-text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-text-tertiary">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProductPreview />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
