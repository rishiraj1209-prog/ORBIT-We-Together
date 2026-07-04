"use client";

import { useEffect, useRef, useState } from "react";
import {
  BrainCircuit,
  FileText,
  Route,
  Send,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { loadChat, saveChat } from "@/lib/chat";

const quickPrompts = [
  "Create a 90-day roadmap to become an AI engineer.",
  "Review my resume and suggest improvements.",
  "How should I approach alumni for Google referrals?",
  "Write a professional referral request message.",
];

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AICopilotPage() {
  const { user } = useAuth();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi, I’m Orbit AI. Tell me your goal and I’ll create a personalized career strategy.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const value = text || input;

    if (!value.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: value }]);
    setInput("");
    setLoading(true);

    if (user) {
      await saveChat(user.uid, "user", value);
    }

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
    const aiReply = data.reply || "Orbit AI could not generate a response.";

    setMessages((prev) => [...prev, { role: "ai", text: aiReply }]);

    if (user) {
      await saveChat(user.uid, "ai", aiReply);
    }

    setLoading(false);
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl">
          <div className="border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-6">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              <Sparkles size={16} />
              Orbit AI Copilot
            </p>

            <h1 className="text-4xl font-black">Ask anything about your career.</h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Resume feedback, alumni strategy, roadmaps, referrals and career
              decisions — all in one intelligent assistant.
            </p>
          </div>

          <div className="h-[560px] space-y-5 overflow-y-auto p-6">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-2xl rounded-[1.5rem] bg-indigo-600/30 p-5"
                    : "max-w-2xl rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                }
              >
                <p className="whitespace-pre-wrap leading-8 text-slate-200">
                  {message.text}
                </p>
              </div>
            ))}

            {loading && (
              <div className="max-w-lg rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-3 text-slate-400">
                  <BrainCircuit className="animate-pulse text-cyan-300" />
                  Orbit AI is thinking...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="border-t border-white/10 p-5">
            <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Orbit AI..."
                className="flex-1 bg-transparent px-5 py-4 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />

              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="bg-indigo-600 px-6 transition hover:bg-indigo-500 disabled:opacity-60"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">
              <Wand2 size={20} />
              Quick Actions
            </h3>

            <div className="space-y-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-sm transition hover:bg-white/10"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {[
            {
              icon: Route,
              title: "Roadmap Generator",
              text: "Generate personalized 30-day and 90-day career plans.",
            },
            {
              icon: FileText,
              title: "Resume Analyzer",
              text: "Improve ATS score, keywords and project descriptions.",
            },
            {
              icon: Users,
              title: "Alumni Strategy",
              text: "Find the right alumni and generate intro messages.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
              >
                <Icon className="mb-4 text-cyan-300" />
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-slate-400">{item.text}</p>
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
                