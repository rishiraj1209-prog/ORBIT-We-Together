"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Loader2,
  Map,
  Route,
  Sparkles,
  Target,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Field, FieldDescription, FieldLabel, Input } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { createNotification } from "@/lib/notifications";
import { loadRoadmap, saveRoadmap } from "@/lib/roadmap-firestore";

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
        message: "Create a detailed 90-day career roadmap for this goal: " + goal,
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
    <div className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-[90rem] space-y-6 lg:space-y-8">
        <PageHeader
          eyebrow={
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
              <Sparkles size={14} />
              AI Career Roadmap
            </span>
          }
          title="Build your 90-day career plan."
          description="Choose a target and Orbit AI will create a focused roadmap across skills, projects, alumni outreach, and internship actions."
          actions={
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/12 bg-violet-500/[0.06] px-3 py-2 text-xs font-medium text-violet-200">
              <CalendarDays size={14} />
              90-day sprint
            </span>
          }
        />

        <Card className="relative overflow-hidden border-indigo-400/12 bg-gradient-to-br from-indigo-500/10 via-violet-500/[0.035] to-transparent p-5 shadow-[var(--shadow-md)] sm:p-6">
          <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-indigo-500/14 blur-3xl" />
          <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <Field>
              <FieldLabel htmlFor="career-goal">Career goal</FieldLabel>
              <Input
                id="career-goal"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                placeholder="Example: AI Engineer at Google"
                className="h-12 bg-slate-950/35 text-base"
              />
              <FieldDescription>
                Be specific about the role, domain, or company you want to target.
              </FieldDescription>
            </Field>

            <Button
              variant="gradient"
              size="lg"
              onClick={generateRoadmap}
              disabled={loading || !goal.trim()}
              className="w-full lg:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin motion-reduce:animate-none" />
                  Generating...
                </>
              ) : (
                <>
                  <Route />
                  Generate roadmap
                </>
              )}
            </Button>
          </div>
        </Card>

        <section className="grid items-start gap-6 xl:grid-cols-[minmax(17rem,0.52fr)_minmax(0,1.48fr)]">
          <aside className="grid gap-4 sm:grid-cols-3 xl:sticky xl:top-6 xl:grid-cols-1">
            <RoadmapFact
              icon={Target}
              label="Current goal"
              value={goal}
              description="The target guiding this roadmap."
              tone="border-indigo-400/12 bg-indigo-500/8 text-indigo-300"
            />
            <RoadmapFact
              icon={CalendarDays}
              label="Roadmap type"
              value="90-Day Sprint"
              description="Skills, projects, networking, and applications."
              tone="border-violet-400/12 bg-violet-500/8 text-violet-300"
            />
            <RoadmapFact
              icon={Map}
              label="Saved progress"
              value={roadmap ? "Roadmap saved" : "No roadmap yet"}
              description="Your latest generated roadmap is stored automatically."
              tone="border-cyan-400/12 bg-cyan-500/[0.07] text-cyan-300"
            />
          </aside>

          <Card className="relative overflow-hidden border-violet-400/10 shadow-[var(--shadow-md)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/8 bg-gradient-to-r from-violet-500/[0.055] to-transparent px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-lg shadow-indigo-950/35">
                  <Route size={20} />
                </span>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white">AI roadmap</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Personalized action plan generated by Orbit AI.
                  </p>
                </div>
              </div>
              {roadmap && !loading && (
                <span className="hidden items-center gap-1.5 rounded-full border border-cyan-400/12 bg-cyan-500/[0.06] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-200 sm:inline-flex">
                  <CheckCircle2 size={13} />
                  Saved
                </span>
              )}
            </div>

            <div className="p-4 sm:p-6">
              {!roadmap && !loading ? (
                <EmptyState
                  icon={<Route size={20} />}
                  title="No roadmap generated"
                  description="Confirm your target goal and generate your first AI-powered career roadmap."
                  className="min-h-[35rem]"
                />
              ) : loading ? (
                <div
                  role="status"
                  aria-label="Generating roadmap"
                  className="min-h-[35rem] rounded-[var(--radius-card)] border border-white/8 bg-slate-950/30 p-5 sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl border border-indigo-400/12 bg-indigo-500/10 text-indigo-300">
                      <Loader2 className="animate-spin motion-reduce:animate-none" size={17} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Building your roadmap</p>
                      <p className="mt-0.5 text-xs text-slate-600">Structuring your next 90 days.</p>
                    </div>
                  </div>
                  <div className="mt-8 space-y-5">
                    {[72, 100, 92, 64, 100, 86, 70].map((width, index) => (
                      <Skeleton key={index} className="h-4" style={{ width: width + "%" }} />
                    ))}
                  </div>
                  <span className="sr-only">Orbit AI is building your roadmap.</span>
                </div>
              ) : (
                <div className="max-h-[46rem] min-h-[35rem] overflow-y-auto rounded-[var(--radius-card)] border border-white/8 bg-slate-950/30 p-5 [scrollbar-color:rgba(148,163,184,0.22)_transparent] sm:p-7">
                  <div className="whitespace-pre-wrap text-sm leading-7 text-slate-300 sm:text-[0.9375rem] sm:leading-8">
                    {roadmap}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

function RoadmapFact({
  icon: Icon,
  label,
  value,
  description,
  tone,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  description: string;
  tone: string;
}) {
  return (
    <Card className="p-5">
      <span className={"flex size-9 items-center justify-center rounded-xl border " + tone}>
        <Icon size={17} />
      </span>
      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
        {label}
      </p>
      <h2 className="mt-2 break-words text-lg font-semibold leading-7 text-slate-200">{value}</h2>
      <p className="mt-2 text-xs leading-5 text-slate-600">{description}</p>
    </Card>
  );
}
