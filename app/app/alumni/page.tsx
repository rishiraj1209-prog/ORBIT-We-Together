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

      if (err) {
        setError(err);
      } else {
        setAlumni(data || []);
      }

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
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <BrainCircuit size={16} />
            AI Alumni Discovery
          </p>

          <h1 className="text-5xl font-black">Find the right alumni.</h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Search alumni by company, role, branch or career path.
          </p>
        </div>

        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <Search className="text-slate-400" size={20} />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Google, AI, Robotics, ECE..."
            className="w-full bg-transparent outline-none"
          />
        </div>

        {loading ? (
          <p className="text-slate-400">Loading alumni...</p>
        ) : error ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-red-300">
            {error}
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-400">
            No alumni found yet. Add alumni documents in Firestore collection{" "}
            <span className="text-indigo-300">alumni</span>.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAlumni.map((person) => (
              <div
                key={person.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-xl font-black">
                    {person.name
                      .split(" ")
                      .map((item) => item[0])
                      .join("")}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">{person.name}</h3>
                    <p className="text-sm text-slate-400">{person.role}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-slate-300">
                  <p className="flex items-center gap-2">
                    <Briefcase size={16} />
                    {person.company}
                  </p>

                  <p className="flex items-center gap-2">
                    <GraduationCap size={16} />
                    {person.branch} • {person.graduationYear}
                  </p>

                  <p className="flex items-center gap-2">
                    <Users size={16} />
                    Mentor available
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-cyan-300">
                      <Star size={16} />
                      AI Match
                    </p>

                    <p className="text-2xl font-black">92%</p>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Strong match based on skills, goals and career trajectory.
                  </p>
                </div>

                <button className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold transition hover:bg-indigo-500">
                  Request Introduction
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}