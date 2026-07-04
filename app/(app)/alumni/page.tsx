"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BrainCircuit,
  Briefcase,
  GraduationCap,
  Search,
  Star,
  Users,
} from "lucide-react";

import { Alumni, getAlumni } from "@/lib/alumni";
import { safeAsync } from "@/lib/error";

export default function AlumniPage() {
  const [query, setQuery] = useState("");
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      const [data, err] = await safeAsync(() => getAlumni());

      if (err) setError(err);
      else setAlumni(data || []);

      setLoading(false);
    }

    load();
  }, []);

  const filteredAlumni = useMemo(() => {
    const q = query.toLowerCase();

    return alumni.filter((person) => {
      return (
        person.name.toLowerCase().includes(q) ||
        person.role.toLowerCase().includes(q) ||
        person.company.toLowerCase().includes(q) ||
        person.branch.toLowerCase().includes(q)
      );
    });
  }, [query, alumni]);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <BrainCircuit size={16} />
            AI Alumni Discovery
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Find the right alumni.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Search alumni by company, role, branch or career path and discover
            people who can guide your next move.
          </p>
        </div>

        <div className="green-glass flex items-center gap-3 rounded-[2rem] px-5 py-4">
          <Search className="text-green-300" size={20} />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Google, AI, Robotics, ECE..."
            className="w-full bg-transparent outline-none placeholder:text-slate-500"
          />
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-[2rem] border border-white/10 bg-white/5"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-red-300">
            {error}
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div className="green-glass rounded-[2rem] p-8 text-slate-400">
            No alumni found yet. Add alumni documents in Firestore collection{" "}
            <span className="text-green-300">alumni</span>.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAlumni.map((person) => (
              <div
                key={person.id}
                className="group green-glass relative overflow-hidden rounded-[2.2rem] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-green-400/40 hover:shadow-[0_0_45px_rgba(34,197,94,0.14)]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-500/10 blur-3xl transition group-hover:bg-lime-400/20" />

                <div className="relative">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 text-xl font-black text-slate-950 shadow-lg shadow-green-500/20">
                      {person.name
                        .split(" ")
                        .map((item) => item[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">{person.name}</h3>
                      <p className="text-sm text-slate-400">{person.role}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-slate-300">
                    <p className="flex items-center gap-2">
                      <Briefcase size={16} className="text-green-300" />
                      {person.company}
                    </p>

                    <p className="flex items-center gap-2">
                      <GraduationCap size={16} className="text-green-300" />
                      {person.branch} • {person.graduationYear}
                    </p>

                    <p className="flex items-center gap-2">
                      <Users size={16} className="text-green-300" />
                      Mentor available
                    </p>
                  </div>

                  <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-2 text-green-300">
                        <Star size={16} />
                        AI Match
                      </p>

                      <p className="text-2xl font-black">92%</p>
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      Strong match based on skills, goals and career trajectory.
                    </p>
                  </div>

                  <button className="green-button mt-6 w-full rounded-2xl px-4 py-3">
                    Request Introduction
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}