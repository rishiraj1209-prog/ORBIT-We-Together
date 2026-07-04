"use client";
import { createNotification } from "@/lib/notifications";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  loadResumeAnalysis,
  saveResumeAnalysis,
} from "@/lib/resume-firestore";
import { FileText, Sparkles } from "lucide-react";

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
    setAnalysis(data.reply);

if (user) {
  await saveResumeAnalysis(user.uid, data.reply);
  if (user) {
  await saveResumeAnalysis(user.uid, data.reply);

  await createNotification(user.uid, {
    title: "Resume analyzed",
    message: "Orbit AI generated your latest resume feedback.",
    type: "resume",
  });
}
}
    setLoading(false);
  }

  return (
   <div className="px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-300">
          <Sparkles size={16} />
          Resume Intelligence
        </p>

        <h1 className="text-5xl font-black">AI Resume Analyzer</h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Paste your resume and Orbit AI will analyze ATS readiness, skills,
          gaps and improvements.
        </p>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
              <FileText className="text-cyan-300" />
              Resume Text
            </h2>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={18}
              placeholder="Paste your resume text here..."
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-5 outline-none"
            />

            <button
              onClick={analyzeResume}
              disabled={loading}
              className="mt-5 w-full rounded-xl bg-indigo-600 px-5 py-4 font-semibold hover:bg-indigo-500 disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <h2 className="mb-5 text-2xl font-bold">AI Analysis</h2>

            {!analysis ? (
              <p className="text-slate-400">
                Your AI-powered resume analysis will appear here.
              </p>
            ) : (
              <div className="whitespace-pre-wrap leading-8 text-slate-300">
                {analysis}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}