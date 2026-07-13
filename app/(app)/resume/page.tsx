"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Wand2,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Field, FieldDescription, FieldLabel, Textarea } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { createNotification } from "@/lib/notifications";
import {
  loadResumeAnalysis,
  saveResumeAnalysis,
} from "@/lib/resume-firestore";

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    async function restoreAnalysis() {
      if (!user) return;

      const previous = await loadResumeAnalysis(user.uid);

      if (previous) {
        setAnalysis(previous);
      }
    }

    restoreAnalysis();
  }, [user]);

  async function analyzeResume() {
    if (!resumeText.trim()) return;

    setLoading(true);
    setAnalysis("");

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "resume_analysis",
        message: resumeText,
      }),
    });

    const data = await res.json();
    const reply = data.reply || "Orbit AI could not analyze this resume.";

    setAnalysis(reply);

    if (user) {
      await saveResumeAnalysis(user.uid, reply);

      await createNotification(user.uid, {
        title: "Resume analyzed",
        message: "Orbit AI generated your latest resume feedback.",
        type: "resume",
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
              Resume Intelligence
            </span>
          }
          title="AI Resume Analyzer"
          description="Paste your resume and Orbit AI will review ATS readiness, skills, gaps, strengths, and high-impact improvements."
          actions={
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/12 bg-cyan-500/[0.06] px-3 py-2 text-xs font-medium text-cyan-200">
              <ShieldCheck size={14} />
              Private workspace
            </span>
          }
        />

        <section className="grid items-start gap-6 xl:grid-cols-[minmax(20rem,0.88fr)_minmax(0,1.12fr)]">
          <Card className="relative overflow-hidden border-indigo-400/12 shadow-[var(--shadow-md)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/45 to-transparent" />

            <div className="flex items-start gap-4 border-b border-white/8 bg-gradient-to-r from-indigo-500/[0.07] via-violet-500/[0.025] to-transparent px-5 py-5 sm:px-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-lg shadow-indigo-950/35">
                <UploadCloud size={20} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-300">
                    Step 1
                  </span>
                  <span className="h-px w-5 bg-white/10" />
                </div>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
                  Resume workspace
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Paste the complete text of your resume for analysis.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <Field>
                <div className="flex items-center justify-between gap-4">
                  <FieldLabel htmlFor="resume-text">Resume text</FieldLabel>
                  <span className="text-[10px] font-medium tabular-nums text-slate-700">
                    {resumeText.length.toLocaleString()} characters
                  </span>
                </div>
                <Textarea
                  id="resume-text"
                  value={resumeText}
                  onChange={(event) => setResumeText(event.target.value)}
                  rows={20}
                  placeholder="Paste your resume text here..."
                  spellCheck
                  className="min-h-[32rem] resize-none rounded-[1.35rem] bg-slate-950/40 p-4 font-mono text-[0.8125rem] leading-7 sm:p-5"
                />
                <FieldDescription>
                  Include experience, projects, education, skills, and links for more useful feedback.
                </FieldDescription>
              </Field>

              <Button
                variant="gradient"
                size="lg"
                onClick={analyzeResume}
                disabled={loading || !resumeText.trim()}
                className="mt-5 w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin motion-reduce:animate-none" />
                    Analyzing resume...
                  </>
                ) : (
                  <>
                    <FileText />
                    Analyze resume
                  </>
                )}
              </Button>

              <div className="mt-4 grid grid-cols-3 divide-x divide-white/8 rounded-2xl border border-white/8 bg-white/[0.02] py-3 text-center">
                <AnalysisFeature label="ATS" />
                <AnalysisFeature label="Impact" />
                <AnalysisFeature label="Skills" />
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-violet-400/10 shadow-[var(--shadow-md)] xl:sticky xl:top-6">
            <div className="flex items-start justify-between gap-4 border-b border-white/8 bg-gradient-to-r from-violet-500/[0.055] to-transparent px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-violet-400/12 bg-violet-500/10 text-violet-300">
                  <Wand2 size={20} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300">
                      Step 2
                    </span>
                    <span className="h-px w-5 bg-white/10" />
                  </div>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
                    AI analysis
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Saved automatically after every analysis.
                  </p>
                </div>
              </div>

              {analysis && !loading && (
                <span className="hidden items-center gap-1.5 rounded-full border border-cyan-400/12 bg-cyan-500/[0.06] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-200 sm:inline-flex">
                  <CheckCircle2 size={13} />
                  Saved
                </span>
              )}
            </div>

            <div className="p-4 sm:p-6">
              {!analysis && !loading ? (
                <EmptyState
                  icon={<FileText size={20} />}
                  title="No analysis yet"
                  description="Paste your resume and run the analyzer to receive targeted, AI-powered suggestions."
                  className="min-h-[35rem]"
                />
              ) : loading ? (
                <div
                  role="status"
                  aria-label="Analyzing resume"
                  className="min-h-[35rem] rounded-[var(--radius-card)] border border-white/8 bg-slate-950/30 p-5 sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl border border-indigo-400/12 bg-indigo-500/10 text-indigo-300">
                      <Loader2 className="animate-spin motion-reduce:animate-none" size={17} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Reviewing your resume</p>
                      <p className="mt-0.5 text-xs text-slate-600">This may take a moment.</p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-5">
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[92%]" />
                    <Skeleton className="h-4 w-[76%]" />
                    <Skeleton className="mt-8 h-7 w-52" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[88%]" />
                    <Skeleton className="h-4 w-[70%]" />
                  </div>
                  <span className="sr-only">Orbit AI is reviewing your resume.</span>
                </div>
              ) : (
                <div className="max-h-[44rem] min-h-[35rem] overflow-y-auto rounded-[var(--radius-card)] border border-white/8 bg-slate-950/30 p-5 [scrollbar-color:rgba(148,163,184,0.22)_transparent] sm:p-7">
                  <div className="whitespace-pre-wrap text-sm leading-7 text-slate-300 sm:text-[0.9375rem] sm:leading-8">
                    {analysis}
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

function AnalysisFeature({ label }: { label: string }) {
  return (
    <div className="px-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
        {label}
      </p>
      <p className="mt-1 text-xs font-medium text-slate-400">Review</p>
    </div>
  );
}
