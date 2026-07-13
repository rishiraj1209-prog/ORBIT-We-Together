"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  Sparkles,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getOpportunities, Opportunity } from "@/lib/opportunities";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getOpportunities();
      setOpportunities(data);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-[90rem] space-y-6 lg:space-y-8">
        <PageHeader
          eyebrow={
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
              <Sparkles size={14} />
              Opportunity Engine
            </span>
          }
          title="AI-ranked opportunities."
          description="Discover internships, referrals, and alumni-posted roles matched to your profile and career goals."
          actions={
            !loading ? (
              <span className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-2 text-xs font-medium text-slate-400">
                {opportunities.length} {opportunities.length === 1 ? "opportunity" : "opportunities"}
              </span>
            ) : undefined
          }
        />

        {loading ? (
          <div role="status" aria-label="Loading opportunities" className="grid gap-4">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-64 rounded-[var(--radius-card)]" />
            ))}
            <span className="sr-only">Loading matched opportunities.</span>
          </div>
        ) : opportunities.length === 0 ? (
          <EmptyState
            icon={<Briefcase size={20} />}
            title="No opportunities found yet"
            description="Add documents in the Firestore opportunities collection to populate the opportunity engine."
          />
        ) : (
          <section aria-label="Matched opportunities" className="grid gap-4">
            {opportunities.map((item, index) => (
              <OpportunityCard key={item.id} item={item} rank={index + 1} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function OpportunityCard({ item, rank }: { item: Opportunity; rank: number }) {
  const matchValue = Math.max(0, Math.min(Number.parseFloat(item.match) || 0, 100));

  return (
    <Card className="group relative overflow-hidden p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-indigo-400/20 hover:shadow-[var(--shadow-md)] sm:p-6 lg:p-7">
      <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-indigo-500/10 blur-3xl transition group-hover:bg-violet-500/14" />
      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-lg shadow-indigo-950/35">
              <Briefcase size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                Match #{rank}
              </p>
              <h2 className="mt-1 break-words text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {item.role}
              </h2>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <MetaPill icon={Building2} value={item.company} />
            <MetaPill icon={MapPin} value={item.location} />
            <span className="rounded-full border border-cyan-400/12 bg-cyan-500/[0.06] px-3 py-2 text-xs font-medium text-cyan-200">
              {item.type}
            </span>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-500">
            Orbit recommends this opportunity based on your profile, skills, roadmap,
            and career goal.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
          <div className="min-w-44 rounded-2xl border border-indigo-400/12 bg-gradient-to-br from-indigo-500/10 to-violet-500/[0.045] p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-xs font-semibold text-indigo-200">
                <Target size={14} />
                AI Match
              </span>
              <span className="text-2xl font-bold tracking-tight text-white">{item.match}</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
                style={{ width: matchValue + "%" }}
              />
            </div>
          </div>
          <Button variant="gradient" size="lg">
            Request Referral
          </Button>
        </div>
      </div>
    </Card>
  );
}

function MetaPill({ icon: Icon, value }: { icon: typeof MapPin; value: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/8 bg-white/[0.025] px-3 py-2 text-xs text-slate-400">
      <Icon size={14} className="shrink-0 text-indigo-300" />
      <span className="truncate">{value}</span>
    </span>
  );
}
