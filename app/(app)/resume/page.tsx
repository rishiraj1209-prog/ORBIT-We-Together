"use client";

import { useEffect, useState } from "react";
import { createNotification } from "@/lib/notifications";
import { useAuth } from "@/components/providers/auth-provider";
import {
  loadResumeAnalysis,
  saveResumeAnalysis,
} from "@/lib/resume-firestore";
import {
  FileText,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  Loader2,
} from "lucide-react";

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
    <div className="px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <Sparkles size={16} />
            Resume Intelligence
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            AI Resume Analyzer
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Paste your resume and Orbit AI will analyze ATS readiness, skills,
            gaps, strengths and improvements.
          </p>
        </div>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="green-glass rounded-[2.5rem] p-7">
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 p-4">
                <UploadCloud className="text-slate-950" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Resume Workspace</h2>
                <p className="text-sm text-slate-400">
                  Paste resume text for AI analysis.
                </p>
              </div>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={20}
              placeholder="Paste your resume text here..."
              className="w-full resize-none rounded-[1.5rem] border border-white/10 bg-black/30 p-5 leading-7 outline-none transition placeholder:text-slate-500 focus:border-green-400/50"
            />

            <button
              onClick={analyzeResume}
              disabled={loading || !resumeText.trim()}
              className="green-button mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Analyzing resume...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Analyze Resume
                </>
              )}
            </button>
          </div>

          <div className="green-glass rounded-[2.5rem] p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">AI Analysis</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Saved automatically after every analysis.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-3">
                <CheckCircle2 className="text-green-300" />
              </div>
            </div>

            {!analysis && !loading ? (
              <div className="flex min-h-[520px] items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-black/20 p-8 text-center">
                <div>
                  <FileText className="mx-auto mb-5 text-green-300" size={42} />
                  <h3 className="text-2xl font-bold">No analysis yet</h3>
                  <p className="mt-3 max-w-md text-slate-400">
                    Paste your resume and run analysis to get AI-powered
                    suggestions.
                  </p>
                </div>
              </div>
            ) : loading ? (
              <div className="min-h-[520px] rounded-[2rem] border border-white/10 bg-black/20 p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="h-5 animate-pulse rounded-full bg-white/10"
                    />
                  ))}
                </div>

                <p className="mt-8 text-green-300">
                  Orbit AI is reviewing your resume...
                </p>
              </div>
            ) : (
              <div className="max-h-[620px] overflow-y-auto rounded-[2rem] border border-white/10 bg-black/20 p-6">
                <div className="whitespace-pre-wrap leading-8 text-slate-300">
                  {analysis}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
    