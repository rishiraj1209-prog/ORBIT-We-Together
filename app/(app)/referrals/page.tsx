"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Award,
  Copy,
  Gift,
  Link2,
  Medal,
  Send,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getReferrals, Referral } from "@/lib/referrals";

const referralStats = [
  { label: "Total Invites", value: "32", icon: Users, tone: "text-indigo-300" },
  { label: "Accepted", value: "21", icon: Send, tone: "text-violet-300" },
  { label: "Rewards", value: "8", icon: Gift, tone: "text-cyan-300" },
];

export default function ReferralsPage() {
  const referralLink = "https://orbit-we-together.vercel.app/invite/rishi-ai";

  const [leaderboard, setLeaderboard] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getReferrals();
      setLeaderboard(data);
      setLoading(false);
    }

    load();
  }, []);

  async function copyLink() {
    await navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  }

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-[90rem] space-y-6 lg:space-y-8">
        <PageHeader
          eyebrow={
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
              <Sparkles size={14} />
              Alumni Contribution System
            </span>
          }
          title="Grow the Orbit network."
          description="Invite students and alumni, unlock contribution badges, and help your college community access mentorship and referrals."
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
          <Card className="relative overflow-hidden border-indigo-400/12 bg-gradient-to-br from-indigo-500/10 via-violet-500/[0.035] to-transparent p-5 shadow-[var(--shadow-md)] sm:p-7">
            <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-indigo-500/14 blur-3xl" />
            <div className="relative">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-lg shadow-indigo-950/35">
                  <Link2 size={20} />
                </span>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white">Your invite link</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Share this with verified students and alumni.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/8 bg-slate-950/35 p-3 sm:flex-row sm:items-center">
                <p className="min-w-0 flex-1 break-all px-2 text-sm text-slate-400">{referralLink}</p>
                <Button variant="gradient" onClick={copyLink} className="shrink-0">
                  <Copy />
                  Copy link
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-3 divide-x divide-white/8 rounded-2xl border border-white/8 bg-white/[0.02]">
                {referralStats.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="px-3 py-4 text-center sm:px-5">
                      <Icon className={"mx-auto " + item.tone} size={17} />
                      <p className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
                        {item.value}
                      </p>
                      <p className="mt-1 text-[10px] leading-4 text-slate-600 sm:text-xs">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-violet-400/12 bg-gradient-to-br from-violet-500/10 to-cyan-500/[0.025] p-6 shadow-[var(--shadow-sm)] sm:p-7">
            <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-violet-500/16 blur-3xl" />
            <div className="relative">
              <span className="flex size-11 items-center justify-center rounded-2xl border border-violet-400/14 bg-violet-500/10 text-violet-300">
                <Award size={21} />
              </span>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                Current badge
              </p>
              <h2 className="mt-2 bg-gradient-to-r from-indigo-200 via-violet-200 to-cyan-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Mentor Builder
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                You are in the top 12% of contributors helping students access alumni mentorship.
              </p>
              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/8">
                <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />
              </div>
            </div>
          </Card>
        </section>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-amber-400/12 bg-amber-500/[0.07] text-amber-300">
                <Trophy size={18} />
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-white">Top contributors</h2>
                <p className="mt-0.5 text-xs text-slate-600">Community referral leaderboard</p>
              </div>
            </div>
            {!loading && leaderboard.length > 0 && (
              <span className="text-xs text-slate-600">{leaderboard.length} contributors</span>
            )}
          </div>

          <div className="p-4 sm:p-6">
            {loading ? (
              <div role="status" aria-label="Loading contributors" className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <Skeleton key={item} className="h-20 rounded-2xl" />
                ))}
                <span className="sr-only">Loading top contributors.</span>
              </div>
            ) : leaderboard.length === 0 ? (
              <EmptyState
                icon={<Users size={20} />}
                title="No contributors found yet"
                description="Add documents in the Firestore referrals collection to populate the leaderboard."
                className="min-h-56"
              />
            ) : (
              <div className="divide-y divide-white/8">
                {leaderboard.map((person, index) => (
                  <div key={person.id} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4">
                    <span
                      className={
                        index < 3
                          ? "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 font-bold text-slate-950 shadow-md shadow-amber-950/20"
                          : "flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.035] font-semibold text-slate-400"
                      }
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-200">{person.name}</p>
                      <p className="mt-1 text-xs text-slate-600">
                        {person.referrals} successful invites
                      </p>
                    </div>
                    <span className="inline-flex max-w-[9rem] items-center gap-1.5 rounded-full border border-indigo-400/12 bg-indigo-500/[0.07] px-2.5 py-1.5 text-[10px] font-semibold text-indigo-200 sm:max-w-none sm:px-3 sm:text-xs">
                      <Medal size={13} className="shrink-0" />
                      <span className="truncate">{person.badge}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
