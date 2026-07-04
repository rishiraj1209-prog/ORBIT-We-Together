"use client";
import { toast, Toaster } from "sonner";
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

import { getReferrals, Referral } from "@/lib/referrals";

export default function ReferralsPage() {
  const referralLink = "https://orbit.app/invite/rishi-ai";

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
    <div className="px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            <Sparkles size={16} />
            Alumni Contribution System
          </p>

          <h1 className="text-5xl font-black">Grow the Orbit network.</h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Invite students and alumni, unlock contribution badges, and help
            your college community access mentorship and referrals.
          </p>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20">
                <Link2 className="text-emerald-300" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Your invite link</h2>
                <p className="text-slate-400">
                  Share this with verified students and alumni.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between">
              <p className="break-all text-slate-300">{referralLink}</p>

              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-500"
              >
                <Copy size={18} />
                Copy
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { label: "Total Invites", value: "32", icon: Users },
                { label: "Accepted", value: "21", icon: Send },
                { label: "Rewards", value: "8", icon: Gift },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <Icon className="mb-4 text-emerald-300" />
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-1 text-3xl font-black">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Award className="mb-5 text-yellow-300" size={34} />

            <h2 className="text-2xl font-bold">Your Badge</h2>

            <p className="mt-4 text-5xl font-black">Mentor Builder</p>

            <p className="mt-5 text-slate-400">
              You are in the top 12% of contributors helping students access
              alumni mentorship.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <Trophy className="text-yellow-300" />
            <h2 className="text-2xl font-bold">Top Contributors</h2>
          </div>

          {loading ? (
            <p className="text-slate-400">Loading contributors...</p>
          ) : leaderboard.length === 0 ? (
            <p className="text-slate-400">
              No contributors found yet. Add documents in Firestore collection{" "}
              <span className="text-indigo-300">referrals</span>.
            </p>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((person, index) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-semibold">{person.name}</p>
                      <p className="text-sm text-slate-400">
                        {person.referrals} successful invites
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-yellow-300">
                    <Medal size={16} />
                    {person.badge}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}