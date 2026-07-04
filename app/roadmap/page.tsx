"use client";import { createNotification } from "@/lib/notifications";

import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  loadRoadmap,
  saveRoadmap,
} from "@/lib/roadmap-firestore";
import { CalendarDays, Sparkles } from "lucide-react";

export default function RoadmapPage() {
  const [goal, setGoal] = useState("AI Engineer at Google");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

useEffect(() => {
  async function restoreRoadmap() {
    if (!user) return;

    const previous = await loadRoadmap(user.uid);

    if (previous) {
      setRoadmap(previous);
    }
  }

  restoreRoadmap();
}, [user]);

  async function generateRoadmap() {
    if (!goal.trim()) return;

    setLoading(true);
    setRoadmap("");

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "career_roadmap",
        message: `Create a detailed 90-day career roadmap for this goal: ${goal}`,
      }),
    });

    const data = await res.json();
    setRoadmap(data.reply);

if (user) {
  await saveRoadmap(user.uid, data.reply);
  setRoadmap(data.reply);

if (user) {
  await saveRoadmap(user.uid, data.reply);

  await createNotification(user.uid, {
    title: "Roadmap generated",
    message: "Your AI-powered career roadmap is ready.",
    type: "roadmap",
  });
}
}
    setLoading(false);
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          <Sparkles size={16} />
          AI Career Roadmap
        </p>

        <h1 className="text-5xl font-black">Generate Your Career Roadmap</h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Enter your career goal and Orbit AI will create a practical roadmap
          with skills, projects, networking and internship actions.
        </p>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
          <label className="text-sm text-slate-400">Career Goal</label>

          <div className="mt-3 flex flex-col gap-3 md:flex-row">
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="flex-1 rounded-xl border border-white/10 bg-black/20 px-5 py-4 outline-none"
            />

            <button
              onClick={generateRoadmap}
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-6 py-4 font-semibold hover:bg-indigo-500 disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Roadmap"}
            </button>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-3">
            <CalendarDays className="text-cyan-300" />
            <h2 className="text-2xl font-bold">AI Roadmap</h2>
          </div>

          {!roadmap ? (
            <p className="text-slate-400">
              Your personalized roadmap will appear here.
            </p>
          ) : (
            <div className="whitespace-pre-wrap leading-8 text-slate-300">
              {roadmap}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}