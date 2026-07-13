"use client";

import { useEffect, useRef, useState } from "react";
import {
  BrainCircuit,
  FileText,
  Route,
  Send,
  Sparkles,
  User,
  Users,
  Wand2,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { loadChat, saveChat } from "@/lib/chat";

const quickPrompts = [
  "Create a 90-day roadmap to become an AI engineer.",
  "Review my resume and suggest improvements.",
  "How should I approach alumni for Google referrals?",
  "Write a professional referral request message.",
];

const capabilities = [
  {
    icon: Route,
    title: "Roadmap Generator",
    text: "Generate personalized career plans.",
    tone: "border-indigo-400/12 bg-indigo-500/8 text-indigo-300",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    text: "Improve ATS score and project impact.",
    tone: "border-violet-400/12 bg-violet-500/8 text-violet-300",
  },
  {
    icon: Users,
    title: "Alumni Strategy",
    text: "Find the right alumni and request referrals.",
    tone: "border-cyan-400/12 bg-cyan-500/[0.07] text-cyan-300",
  },
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
    <div className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-[90rem] space-y-6 lg:space-y-8">
        <PageHeader
          eyebrow={
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
              <Sparkles size={14} />
              Orbit AI Copilot
            </span>
          }
          title="Ask anything about your career."
          description="Resume feedback, alumni strategy, roadmaps, referrals, and career decisions—inside one intelligent assistant."
          actions={
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/12 bg-cyan-500/[0.06] px-3 py-2 text-xs font-medium text-cyan-200">
              <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              Copilot online
            </span>
          }
        />

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.55fr)]">
          <Card className="relative overflow-hidden border-indigo-400/12 shadow-[var(--shadow-md)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/45 to-transparent" />

            <div className="flex items-center justify-between gap-4 border-b border-white/8 bg-gradient-to-r from-indigo-500/[0.075] via-violet-500/[0.035] to-transparent px-4 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-lg shadow-indigo-950/35">
                  <BrainCircuit size={19} />
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-white">Orbit AI</h2>
                  <p className="truncate text-xs text-slate-500">Personalized career intelligence</p>
                </div>
              </div>

              <span className="hidden rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:inline-flex">
                Career chat
              </span>
            </div>

            <div
              aria-live="polite"
              className="h-[clamp(30rem,62vh,44rem)] space-y-6 overflow-y-auto px-4 py-6 [scrollbar-color:rgba(148,163,184,0.22)_transparent] sm:px-6"
            >
              {messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={message.role + "-" + index}
                    className={isUser ? "flex justify-end gap-3" : "flex justify-start gap-3"}
                  >
                    {!isUser && (
                      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl border border-indigo-400/12 bg-indigo-500/10 text-indigo-300">
                        <BrainCircuit size={15} />
                      </span>
                    )}

                    <div className={isUser ? "max-w-[85%] sm:max-w-[76%]" : "max-w-[88%] sm:max-w-[80%]"}>
                      <p
                        className={
                          isUser
                            ? "mb-1.5 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600"
                            : "mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600"
                        }
                      >
                        {isUser ? "You" : "Orbit AI"}
                      </p>
                      <div
                        className={
                          isUser
                            ? "rounded-[1.35rem] rounded-tr-md border border-indigo-400/15 bg-gradient-to-br from-indigo-500/16 to-violet-500/10 px-4 py-3.5 shadow-sm shadow-indigo-950/20 sm:px-5 sm:py-4"
                            : "rounded-[1.35rem] rounded-tl-md border border-white/8 bg-white/[0.035] px-4 py-3.5 sm:px-5 sm:py-4"
                        }
                      >
                        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-200 sm:text-[0.9375rem]">
                          {message.text}
                        </p>
                      </div>
                    </div>

                    {isUser && (
                      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.045] text-slate-400">
                        <User size={15} />
                      </span>
                    )}
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start gap-3">
                  <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl border border-indigo-400/12 bg-indigo-500/10 text-indigo-300">
                    <BrainCircuit className="animate-pulse" size={15} />
                  </span>
                  <div>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                      Orbit AI
                    </p>
                    <div className="flex items-center gap-1.5 rounded-[1.35rem] rounded-tl-md border border-white/8 bg-white/[0.035] px-5 py-4">
                      {[0, 1, 2].map((item) => (
                        <span
                          key={item}
                          className="size-1.5 animate-bounce rounded-full bg-indigo-300 motion-reduce:animate-none"
                          style={{ animationDelay: item * 120 + "ms" }}
                        />
                      ))}
                      <span className="sr-only">Orbit AI is thinking.</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="border-t border-white/8 bg-slate-950/35 p-3 sm:p-4">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 p-1.5 shadow-inner shadow-black/20 transition focus-within:border-indigo-400/30 focus-within:ring-3 focus-within:ring-indigo-500/10">
                <label htmlFor="ai-message" className="sr-only">
                  Ask Orbit AI
                </label>
                <input
                  id="ai-message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask Orbit AI..."
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 sm:px-4"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") sendMessage();
                  }}
                />

                <Button
                  aria-label="Send message"
                  variant="gradient"
                  size="icon"
                  onClick={() => sendMessage()}
                  disabled={loading}
                  className="shrink-0 rounded-xl"
                >
                  <Send size={17} />
                </Button>
              </div>
              <p className="mt-2 px-2 text-center text-[10px] leading-4 text-slate-700">
                Orbit AI can make mistakes. Review important career decisions.
              </p>
            </div>
          </Card>

          <aside className="space-y-5 xl:sticky xl:top-6">
            <Card className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl border border-violet-400/12 bg-violet-500/8 text-violet-300">
                  <Wand2 size={17} />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-white">Quick prompts</h2>
                  <p className="mt-0.5 text-xs text-slate-600">Start with a proven question.</p>
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    disabled={loading}
                    className="group flex w-full items-start gap-3 rounded-2xl border border-transparent p-3 text-left transition hover:border-white/8 hover:bg-white/[0.035] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400/10 bg-indigo-500/[0.07] text-[10px] font-semibold text-indigo-300">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-6 text-slate-400 transition group-hover:text-slate-200">
                      {prompt}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="border-b border-white/8 px-5 py-4 sm:px-6">
                <h2 className="text-sm font-semibold text-white">Copilot capabilities</h2>
              </div>
              <div className="divide-y divide-white/8">
                {capabilities.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-3 px-5 py-4 sm:px-6">
                      <span className={"flex size-9 shrink-0 items-center justify-center rounded-xl border " + item.tone}>
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-slate-200">{item.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-slate-600">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="relative overflow-hidden border-indigo-400/10 bg-gradient-to-br from-indigo-500/8 to-cyan-500/[0.025] p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-violet-500/12 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-200">
                  <Sparkles size={14} />
                  Better context, better answers
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Keep your profile updated so Orbit can tailor guidance to your skills,
                  branch, and career goal.
                </p>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
