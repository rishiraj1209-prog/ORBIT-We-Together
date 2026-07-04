"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  Sparkles,
  Target,
} from "lucide-react";

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
    <div className="px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <Sparkles size={16} />
            Opportunity Engine
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            AI-ranked opportunities.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Discover internships, referrals and alumni-posted roles matched to
            your profile and career goals.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-[2rem] border border-white/10 bg-white/5"
              />
            ))}
          </div>
        ) : opportunities.length === 0 ? (
          <div className="green-glass rounded-[2rem] p-8 text-slate-400">
            No opportunities found yet. Add documents in Firestore collection{" "}
            <span className="text-green-300">opportunities</span>.
          </div>
        ) : (
          <section className="grid gap-6">
            {opportunities.map((item) => (
              <div
                key={item.id}
                className="group green-glass relative overflow-hidden rounded-[2.2rem] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-green-400/40 hover:shadow-[0_0_45px_rgba(34,197,94,0.14)]"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-500/10 blur-3xl transition group-hover:bg-lime-400/20" />

                <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 shadow-lg shadow-green-500/20">
                      <Briefcase className="text-slate-950" />
                    </div>

                    <h2 className="text-2xl font-black">{item.role}</h2>

                    <div className="mt-4 flex flex-wrap gap-3 text-slate-400">
                      <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm">
                        <Building2 size={16} className="text-green-300" />
                        {item.company}
                      </span>

                      <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm">
                        <MapPin size={16} className="text-green-300" />
                        {item.location}
                      </span>

                      <span className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-green-500/20 bg-green-500/10 p-6 text-center">
                    <Target className="mx-auto mb-3 text-green-300" />
                    <p className="text-sm text-slate-400">AI Match</p>
                    <p className="mt-1 text-5xl font-black">{item.match}</p>
                  </div>
                </div>

                <div className="relative mt-7 flex flex-wrap items-center justify-between gap-4">
                  <p className="max-w-2xl text-sm leading-7 text-slate-400">
                    Orbit recommends this opportunity based on your profile,
                    skills, roadmap and career goal.
                  </p>

                  <button className="green-button rounded-2xl px-6 py-3">
                    Request Referral
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}