"use client";

import { useEffect, useState } from "react";
import { createNotification } from "@/lib/notifications";
import { useAuth } from "@/components/providers/auth-provider";
import { loadRoadmap, saveRoadmap } from "@/lib/roadmap-firestore";
import {
  CalendarDays,
  Loader2,
  Map,
  Route,
  Sparkles,
  Target,
} from "lucide-react";

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
    const reply = data.reply || "Orbit AI could not generate a roadmap.";

    setRoadmap(reply);

    if (user) {
      await saveRoadmap(user.uid, reply);

      await createNotification(user.uid, {
        title: "Roadmap generated",
        message: "Your AI-powered career roadmap is ready.",
        type: "roadmap",
      });
    }

    setLoading(false);
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <Sparkles size={16} />
            AI Career Roadmap
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Build your 90-day career plan.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Enter a career goal and Orbit AI will generate a focused roadmap
            across skills, projects, alumni outreach and internship actions.
          </p>
        </div>

        <section className="green-glass relative overflow-hidden rounded-[2.5rem] p-7">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1fr_0.45fr] lg:items-end">
            <div>
              <label className="text-sm text-slate-400">Career Goal</label>

              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Example: AI Engineer at Google"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none transition focus:border-green-400/50"
              />
            </div>

            <button
              onClick={generateRoadmap}
              disabled={loading || !goal.trim()}
              className="green-button flex items-center justify-center gap-2 rounded-2xl px-6 py-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <Route size={18} />
                  Generate Roadmap
                </>
              )}
            </button>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="space-y-6">
            <div className="green-glass rounded-[2rem] p-6">
              <Target className="mb-4 text-green-300" />
              <p className="text-sm text-slate-400">Current Goal</p>
              <h2 className="mt-2 text-2xl font-bold">{goal}</h2>
            </div>

            <div className="green-glass rounded-[2rem] p-6">
              <CalendarDays className="mb-4 text-green-300" />
              <p className="text-sm text-slate-400">Roadmap Type</p>
              <h2 className="mt-2 text-2xl font-bold">90-Day Sprint</h2>
              <p className="mt-3 leading-7 text-slate-400">
                Designed around skills, projects, networking and applications.
              </p>
            </div>

            <div className="green-glass rounded-[2rem] p-6">
              <Map className="mb-4 text-green-300" />
              <p className="text-sm text-slate-400">Saved Progress</p>
              <h2 className="mt-2 text-2xl font-bold">
                {roadmap ? "Roadmap saved" : "No roadmap yet"}
              </h2>
              <p className="mt-3 leading-7 text-slate-400">
                Your latest generated roadmap is stored automatically.
              </p>
            </div>
          </aside>

          <div className="green-glass rounded-[2.5rem] p-7">
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 p-4">
                <Route className="text-slate-950" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">AI Roadmap</h2>
                <p className="text-sm text-slate-400">
                  Personalized action plan generated by Orbit AI.
                </p>
              </div>
            </div>

            {!roadmap && !loading ? (
              <div className="flex min-h-[520px] items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-black/20 p-8 text-center">
                <div>
                  <Route className="mx-auto mb-5 text-green-300" size={44} />
                  <h3 className="text-2xl font-bold">No roadmap generated</h3>
                  <p className="mt-3 max-w-md text-slate-400">
                    Add a target goal and generate your first AI-powered career
                    roadmap.
                  </p>
                </div>
              </div>
            ) : loading ? (
              <div className="min-h-[520px] rounded-[2rem] border border-white/10 bg-black/20 p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="h-5 animate-pulse rounded-full bg-white/10"
                    />
                  ))}
                </div>

                <p className="mt-8 text-green-300">
                  Orbit AI is building your roadmap...
                </p>
              </div>
            ) : (
              <div className="max-h-[680px] overflow-y-auto rounded-[2rem] border border-white/10 bg-black/20 p-6">
                <div className="whitespace-pre-wrap leading-8 text-slate-300">
                  {roadmap}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
   