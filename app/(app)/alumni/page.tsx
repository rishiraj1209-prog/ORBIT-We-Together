"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BrainCircuit,
  Briefcase,
  GraduationCap,
  Search,
  Star,
  UserSearch,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
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
    <div className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-[90rem] space-y-6 lg:space-y-8">
        <PageHeader
          eyebrow={
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
              <BrainCircuit size={14} />
              AI Alumni Discovery
            </span>
          }
          title="Find the right alumni."
          description="Search by company, role, branch, or career path and discover people who can guide your next move."
          actions={
            !loading && !error ? (
              <span className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-2 text-xs font-medium text-slate-400">
                {filteredAlumni.length} {filteredAlumni.length === 1 ? "match" : "matches"}
              </span>
            ) : undefined
          }
        />

        <Card className="relative overflow-hidden border-indigo-400/12 bg-gradient-to-r from-indigo-500/[0.07] via-violet-500/[0.025] to-transparent p-3 shadow-[var(--shadow-sm)] sm:p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-slate-950/30 px-4 transition focus-within:border-indigo-400/30 focus-within:ring-3 focus-within:ring-indigo-500/10">
            <Search className="shrink-0 text-indigo-300" size={18} />
            <label htmlFor="alumni-search" className="sr-only">
              Search alumni
            </label>
            <input
              id="alumni-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Google, AI, Robotics, ECE..."
              className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="rounded-lg px-2 py-1 text-xs text-slate-500 transition hover:bg-white/[0.05] hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>
        </Card>

        {loading ? (
          <div role="status" aria-label="Loading alumni" className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} className="h-[22rem] rounded-[var(--radius-card)]" />
            ))}
            <span className="sr-only">Loading alumni directory.</span>
          </div>
        ) : error ? (
          <Card role="alert" className="border-red-500/20 bg-red-500/[0.07] p-6 text-sm text-red-200">
            {error}
          </Card>
        ) : filteredAlumni.length === 0 ? (
          <EmptyState
            icon={<UserSearch size={20} />}
            title={query ? "No matching alumni" : "No alumni found yet"}
            description={
              query
                ? "Try a broader company, role, branch, or career keyword."
                : "Add alumni documents in the Firestore alumni collection to populate this directory."
            }
          />
        ) : (
          <section aria-label="Alumni results" className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {filteredAlumni.map((person) => (
              <AlumniCard key={person.id} person={person} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function AlumniCard({ person }: { person: Alumni }) {
  const initials = person.name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2);

  return (
    <Card className="group relative overflow-hidden p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-indigo-400/20 hover:shadow-[var(--shadow-md)] sm:p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-indigo-500/10 blur-3xl transition group-hover:bg-violet-500/14" />
      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-lg font-bold text-white shadow-lg shadow-indigo-950/35">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold tracking-tight text-white">{person.name}</h2>
            <p className="mt-1 truncate text-sm text-slate-500">{person.role}</p>
          </div>
          <span className="rounded-full border border-cyan-400/12 bg-cyan-500/[0.06] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-200">
            Mentor
          </span>
        </div>

        <div className="mt-6 space-y-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm">
          <ProfileLine icon={Briefcase} value={person.company} />
          <ProfileLine
            icon={GraduationCap}
            value={person.branch + " • " + person.graduationYear}
          />
          <ProfileLine icon={Users} value="Mentor available" />
        </div>

        <div className="mt-4 rounded-2xl border border-indigo-400/12 bg-gradient-to-r from-indigo-500/8 to-violet-500/[0.04] p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-xs font-semibold text-indigo-200">
              <Star size={14} />
              AI Match
            </p>
            <p className="text-xl font-bold tracking-tight text-white">92%</p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
            <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-600">
            Strong match based on skills, goals, and career trajectory.
          </p>
        </div>

        <Button variant="gradient" className="mt-5 w-full">
          Request Introduction
        </Button>
      </div>
    </Card>
  );
}

function ProfileLine({ icon: Icon, value }: { icon: typeof Users; value: string }) {
  return (
    <p className="flex min-w-0 items-center gap-2.5 text-slate-400">
      <Icon size={15} className="shrink-0 text-indigo-300" />
      <span className="truncate">{value}</span>
    </p>
  );
}
