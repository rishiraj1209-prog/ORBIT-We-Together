"use client";

import { BrainCircuit, Briefcase, GraduationCap, Search, Star, Users } from "lucide-react";
import { useMemo, useState } from "react";

const alumni = [
  {
    name: "Ananya Sharma",
    role: "AI Engineer",
    company: "Google DeepMind",
    branch: "ECE",
    skills: ["AI", "Python", "Research"],
    match: 96,
  },
  {
    name: "Rohit Verma",
    role: "Software Engineer",
    company: "Microsoft",
    branch: "CSE",
    skills: ["DSA", "System Design", "React"],
    match: 91,
  },
  {
    name: "Priya Singh",
    role: "Robotics Engineer",
    company: "NVIDIA",
    branch: "ECE",
    skills: ["Robotics", "Embedded", "ML"],
    match: 94,
  },
  {
    name: "Aman Raj",
    role: "Product Manager",
    company: "Razorpay",
    branch: "Mechanical",
    skills: ["Product", "Growth", "Startups"],
    match: 83,
  },
  {
    name: "Sneha Iyer",
    role: "Data Scientist",
    company: "Amazon",
    branch: "EEE",
    skills: ["ML", "Analytics", "SQL"],
    match: 89,
  },
  {
    name: "Karan Mehta",
    role: "Backend Engineer",
    company: "Swiggy",
    branch: "CSE",
    skills: ["Node.js", "Cloud", "Databases"],
    match: 87,
  },
];

export default function AlumniPage() {
  const [query, setQuery] = useState("");

  const filteredAlumni = useMemo(() => {
    const q = query.toLowerCase();

    return alumni.filter((person) => {
      return (
        person.name.toLowerCase().includes(q) ||
        person.role.toLowerCase().includes(q) ||
        person.company.toLowerCase().includes(q) ||
        person.branch.toLowerCase().includes(q) ||
        person.skills.join(" ").toLowerCase().includes(q)
      );
    });
  }, [query]);

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
            Search alumni by company, role, skills, branch or career path.
            Orbit ranks them using AI-style match signals.
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAlumni.map((person) => (
            <div
              key={person.name}
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
                  {person.branch}
                </p>

                <p className="flex items-center gap-2">
                  <Users size={16} />
                  Mentor available
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {person.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-cyan-300">
                    <Star size={16} />
                    AI Match
                  </p>

                  <p className="text-2xl font-black">{person.match}%</p>
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
      </div>
    </main>
  );
}