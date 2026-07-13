"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { Sparkles, TrendingUp, Users } from "lucide-react";

const sidebarItems = [
  { label: "Home", active: true },
  { label: "Discover", active: false },
  { label: "Messages", active: false },
  { label: "Introductions", active: false },
  { label: "Referrals", active: false },
];

const matchReasons = [
  "Both focused on product engineering",
  "She's open to mentoring interns",
  "Shared interest in fintech",
];

export function ProductPreview({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-ai/10 blur-2xl"
      />

      <Card className="relative overflow-hidden border-border/80 bg-surface shadow-2xl shadow-black/20">
        <div className="flex items-center gap-2 border-b border-border bg-surface-elevated/50 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-error/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
          </div>
          <div className="mx-auto rounded-md bg-background/60 px-3 py-1 text-xs text-text-tertiary">
            orbit.app/home
          </div>
        </div>

        <CardContent className="grid gap-0 p-0 lg:grid-cols-[180px_1fr]">
          <aside className="hidden border-r border-border bg-background/40 p-4 lg:block">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-accent/20" />
              <span className="text-sm font-semibold">Orbit</span>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "rounded-md px-3 py-2 text-xs font-medium",
                    item.active
                      ? "bg-accent-subtle text-accent"
                      : "text-text-tertiary"
                  )}
                >
                  {item.label}
                </div>
              ))}
            </nav>
          </aside>

          <div className="space-y-4 p-4 sm:p-6">
            <div>
              <p className="text-xs text-text-tertiary">Good morning, Arjun</p>
              <h3 className="mt-1 text-base font-semibold tracking-tight">
                AI matches for you
              </h3>
            </div>

            <Card className="border-border/80 bg-background/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-ai/30 text-sm font-semibold text-accent">
                        PS
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-success" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Priya Sharma</p>
                      <p className="text-xs text-text-secondary">
                        PM at Stripe · CS &apos;19
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent text-sm font-semibold text-accent">
                      92%
                    </div>
                    <span className="mt-1 text-[10px] text-text-tertiary">
                      match
                    </span>
                  </div>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {matchReasons.map((reason) => (
                    <li
                      key={reason}
                      className="flex items-start gap-2 text-xs text-text-secondary"
                    >
                      <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-ai" />
                      {reason}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex gap-2">
                  <div className="flex-1 rounded-lg bg-accent px-3 py-2 text-center text-xs font-medium text-white">
                    Request intro
                  </div>
                  <div className="rounded-lg border border-border px-3 py-2 text-xs text-text-secondary">
                    View profile
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-border bg-background/40 p-3">
                <Users className="h-4 w-4 text-accent" />
                <p className="mt-2 text-lg font-semibold tabular-nums">12</p>
                <p className="text-[10px] text-text-tertiary">Connections</p>
              </div>
              <div className="rounded-lg border border-border bg-background/40 p-3">
                <TrendingUp className="h-4 w-4 text-success" />
                <p className="mt-2 text-lg font-semibold tabular-nums">3</p>
                <p className="text-[10px] text-text-tertiary">Intros sent</p>
              </div>
              <div className="rounded-lg border border-border bg-background/40 p-3">
                <Badge variant="ai" className="text-[10px]">
                  AI
                </Badge>
                <p className="mt-2 text-lg font-semibold tabular-nums">85%</p>
                <p className="text-[10px] text-text-tertiary">Profile</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
