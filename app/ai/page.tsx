"use client";
import { useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { loadChat, saveChat } from "@/lib/chat";
import { useState } from "react";
import {
  BrainCircuit,
  Send,
  Sparkles,
  Route,
  FileText,
  Users,
  Wand2,
} from "lucide-react";

const quickPrompts = [
  {
    label: "90-day roadmap",
    prompt: "Create a 90-day roadmap to become an AI engineer.",
  },
  {
    label: "Resume review",
    prompt: "Review my resume and suggest improvements.",
  },
  {
    label: "Alumni strategy",
    prompt: "How should I approach alumni for Google referrals?",
  },
  {
    label: "Referral message",
    prompt: "Write a professional referral request message.",
  },
];

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AICopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi, I’m Orbit AI. Tell me your goal and I’ll create a personalized career strategy.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

useEffect(() => {
  async function restoreChat() {
    if (!user) return;

    const history = await loadChat(user.uid);

    if (history.length > 0) {
      setMessages(history);
    }
  }

  restoreChat();
}, [user]);

  async function sendMessage(text?: string) {
    const value = text || input;

    if (!value.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: value }]);
    if (user) {
  await saveChat(user.uid, "user", value);
}
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "career_chat",
        message: value,
      }),
    });

    const data = await res.json();

    const aiReply =
  data.reply || "Orbit AI could not generate a response.";

setMessages((prev) => [
  ...prev,
  {
    role: "ai",
    text: aiReply,
  },
]);

if (user) {
  await saveChat(user.uid, "ai", aiReply);
}

    setLoading(false);
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-300">
            <Sparkles size={16} />
            AI Career Copilot
          </p>

          <h1 className="text-5xl font-black">Ask Orbit AI</h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Get career roadmaps, resume feedback, alumni recommendations and
            referral messages from one intelligent assistant.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600">
                <BrainCircuit />
              </div>

              <div>
                <h2 className="font-bold">Orbit AI</h2>
                <p className="text-sm text-green-400">
                  {loading ? "Thinking..." : "Online"}
                </p>
              </div>
            </div>

            <div className="min-h-[420px] space-y-5">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-lg rounded-2xl bg-indigo-600/30 p-5"
                      : "max-w-lg whitespace-pre-wrap rounded-2xl bg-black/20 p-5 leading-8 text-slate-300"
                  }
                >
                  {message.text}
                </div>
              ))}

              {loading && (
                <div className="max-w-lg rounded-2xl bg-black/20 p-5 text-slate-400">
                  Orbit AI is generating your answer...
                </div>
              )}
            </div>

            <div className="mt-6 flex">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your career..."
                className="flex-1 rounded-l-xl border border-white/10 bg-black/20 px-5 py-4 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />

              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="flex items-center justify-center rounded-r-xl bg-indigo-600 px-6 disabled:opacity-60"
              >
                <Send size={18} />
              </button>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">
                <Wand2 size={20} />
                Quick Actions
              </h3>

              <div className="space-y-3">
                {quickPrompts.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => sendMessage(item.prompt)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <Route className="mb-4 text-cyan-300" />
              <h3 className="text-xl font-bold">Roadmap Generator</h3>
              <p className="mt-3 text-slate-400">
                Generate personalized 30-day and 90-day career roadmaps.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <FileText className="mb-4 text-indigo-300" />
              <h3 className="text-xl font-bold">Resume Analyzer</h3>
              <p className="mt-3 text-slate-400">
                Detect missing skills, improve ATS score and rewrite bullet
                points.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <Users className="mb-4 text-emerald-300" />
              <h3 className="text-xl font-bold">Alumni Matching</h3>
              <p className="mt-3 text-slate-400">
                Find the most relevant alumni based on your career goal.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}