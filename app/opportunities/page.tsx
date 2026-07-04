"use client";

import { Briefcase, Building2, MapPin, Sparkles } from "lucide-react";

const opportunities = [
  {
    role: "AI Research Intern",
    company: "Google DeepMind",
    location: "Remote",
    type: "Referral Available",
    match: "96%",
  },
  {
    role: "Frontend Engineering Intern",
    company: "Microsoft",
    location: "Bangalore",
    type: "Alumni Posted",
    match: "91%",
  },
  {
    role: "Robotics Software Intern",
    company: "NVIDIA",
    location: "Hybrid",
    type: "Mentor Recommended",
    match: "94%",
  },
];

export default function OpportunitiesPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
          <Sparkles size={16} />
          Opportunity Engine
        </p>

        <h1 className="text-5xl font-black">AI-ranked opportunities.</h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Discover internships, referrals and alumni-posted roles matched to
          your profile and career goals.
        </p>

        <section className="mt-10 grid gap-6">
          {opportunities.map((item) => (
            <div
              key={item.role}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20">
                    <Briefcase className="text-emerald-300" />
                  </div>

                  <h2 className="text-2xl font-bold">{item.role}</h2>

                  <div className="mt-4 flex flex-wrap gap-4 text-slate-400">
                    <span className="flex items-center gap-2">
                      <Building2 size={16} />
                      {item.company}
                    </span>

                    <span className="flex items-center gap-2">
                      <MapPin size={16} />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5 text-center">
                  <p className="text-sm text-slate-400">AI Match</p>
                  <p className="text-4xl font-black">{item.match}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                  {item.type}
                </span>

                <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500">
                  Request Referral
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}