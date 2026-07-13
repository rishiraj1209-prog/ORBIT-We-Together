"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { STATS } from "@/lib/constants/site";

const testimonials = [
  {
    quote:
      "I got an intro to a PM at my dream company in 48 hours. The AI match reasons were spot on — I didn't feel awkward reaching out.",
    name: "Arjun Patel",
    role: "Final year CS · Student",
    initials: "AP",
  },
  {
    quote:
      "Finally, intro requests with context. I approve in 30 seconds, AI drafts the message, done. This is how alumni networks should work.",
    name: "Priya Sharma",
    role: "Product Manager · Stripe",
    initials: "PS",
  },
  {
    quote:
      "We went from a dead Google Sheet to 400 verified alumni in one semester. The referral leaderboard made it fun.",
    name: "Dr. Mehta",
    role: "Alumni Relations · IIT Delhi",
    initials: "DM",
  },
];

export function SocialProofSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Loved by students, alumni, and college offices
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
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full border-border/80">
                <CardContent className="flex h-full flex-col p-6">
                  <blockquote className="flex-1 text-sm leading-relaxed text-text-secondary">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-accent-subtle text-accent">
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-text-tertiary">{item.role}</p>
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
