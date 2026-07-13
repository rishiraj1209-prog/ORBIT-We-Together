"use client";

import { motion } from "framer-motion";
import { Link2, Share2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

const features = [
  {
    id: "matching",
    badge: "AI Matching",
    icon: Sparkles,
    title: "Meet alumni who fit — with reasons that make sense",
    description:
      "Orbit analyzes goals, skills, and experience to surface high-fit matches. Every suggestion comes with three human-readable reasons — not a black box.",
    highlights: [
      "Daily personalized match cards",
      "Natural language alumni search",
      "Human-readable match context",
    ],
    align: "left" as const,
  },
  {
    id: "intros",
    badge: "Warm Intros",
    icon: Link2,
    title: "Warm introductions, not cold spam",
    description:
      "Request an intro through a mutual connection. AI drafts the message. Both sides see full context before anyone hits send.",
    highlights: [
      "3-step intro workflow",
      "AI-drafted messages in multiple tones",
      "Connector approval built in",
    ],
    align: "right" as const,
  },
  {
    id: "referrals",
    badge: "Referral Growth",
    icon: Share2,
    title: "Every member grows the network",
    description:
      "Personal relay links, qualified referral tracking, and a leaderboard that celebrates connectors — not vanity clicks.",
    highlights: [
      "Unique referral codes per member",
      "Badges from Connector to Super Connector",
      "Leaderboard with real attribution",
    ],
    align: "left" as const,
  },
];

function FeatureVisual({ id }: { id: string }) {
  if (id === "matching") {
    return (
      <div className="rounded-xl border border-border bg-background/60 p-6">
        <div className="space-y-3">
          {[
            { name: "Product leader", fit: "Strong fit", role: "Fintech · Alumni" },
            { name: "Founder", fit: "Shared goals", role: "Climate · Alumni" },
            { name: "Engineer", fit: "Shared context", role: "AI systems · Alumni" },
          ].map((match) => (
            <div
              key={match.name}
              className="flex items-center justify-between rounded-lg border border-border bg-surface p-3"
            >
              <div>
                <p className="text-sm font-medium">{match.name}</p>
                <p className="text-xs text-text-tertiary">{match.role}</p>
              </div>
              <span className="text-xs font-semibold text-accent">
                {match.fit}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "intros") {
    return (
      <div className="rounded-xl border border-border bg-background/60 p-6">
        <div className="space-y-4">
          {[
            { step: "1", label: "Request sent", done: true },
            { step: "2", label: "Connector approved", done: true },
            { step: "3", label: "Intro made", done: false },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                  item.done
                    ? "bg-success text-white"
                    : "border border-border text-text-tertiary"
                )}
              >
                {item.step}
              </div>
              <span
                className={cn(
                  "text-sm",
                  item.done ? "text-text-primary" : "text-text-tertiary"
                )}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-background/60 p-6">
      <div className="mb-4 rounded-lg border border-dashed border-accent/40 bg-accent-subtle p-4 text-center">
        <p className="font-mono text-sm text-accent">orbit.app/signup?ref=COMMUNITY</p>
      </div>
      <div className="space-y-2">
        {[
          { rank: 1, name: "Connector A", count: 14 },
          { rank: 2, name: "Connector B", count: 11 },
          { rank: 3, name: "You", count: 8 },
        ].map((row) => (
          <div
            key={row.rank}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2"
          >
            <span className="text-sm">
              <span className="mr-2 text-text-tertiary">#{row.rank}</span>
              {row.name}
            </span>
            <span className="text-sm tabular-nums text-text-secondary">
              {row.count} qualified
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="accent" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need for a network that compounds
          </h2>
        </div>

        <div className="mt-20 space-y-24">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className={cn(
                "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                feature.align === "right" && "lg:[&>div:first-child]:order-2"
              )}
            >
              <div>
                <Badge variant="ai" className="mb-4">
                  {feature.badge}
                </Badge>
                <feature.icon className="mb-4 h-8 w-8 text-accent" />
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {feature.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <FeatureVisual id={feature.id} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
