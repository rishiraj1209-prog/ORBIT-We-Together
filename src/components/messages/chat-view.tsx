"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { APP_ROUTES } from "@/lib/constants/app";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/ui/user-avatar";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import { cn } from "@/lib/utils/cn";
import type { AuthUser } from "@/types/auth";

interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  aiAssisted?: boolean;
}

interface ChatViewProps {
  conversationId: string;
  user: AuthUser;
}

export function ChatView({ conversationId, user }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/conversations/${conversationId}`)
      .then((r) => r.json())
      .then((d) => setMessages(d.messages ?? []))
      .finally(() => setLoading(false));
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(aiAssisted = false) {
    if (!content.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/conversations/${conversationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, aiAssisted }),
      });
      const { message } = await res.json();
      setMessages((prev) => [...prev, message]);
      setContent("");
      setTyping(true);
      setTimeout(() => setTyping(false), 2000);
    } finally {
      setSending(false);
    }
  }

  async function handleAiCompose() {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "compose", purpose: "networking", recipientName: "Alumni" }),
      });
      const { message } = await res.json();
      setContent(message);
    } finally {
      setAiLoading(false);
    }
  }

  if (loading) {
    return <div className="flex justify-center py-16"><AuthSpinner /></div>;
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-xl border border-border bg-surface">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Link href={APP_ROUTES.messages}>
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <UserAvatar name="Conversation" photoURL={null} size="sm" showOnline isOnline />
        <div>
          <p className="font-medium text-text-primary">Conversation</p>
          {typing && <p className="text-xs text-accent animate-pulse">typing...</p>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isOwn = msg.senderId === user.uid;
          return (
            <div key={msg.id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                isOwn ? "bg-accent text-white" : "bg-surface-elevated text-text-primary"
              )}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <div className={cn("mt-1 flex items-center gap-1 text-[10px]", isOwn ? "text-white/70" : "text-text-tertiary")}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  {msg.aiAssisted && <Sparkles className="h-3 w-3" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border p-4 space-y-2">
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleAiCompose} disabled={aiLoading} className="gap-1">
            <Sparkles className="h-3 w-3" />
            {aiLoading ? "Generating..." : "AI Compose"}
          </Button>
        </div>
        <div className="flex gap-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
            rows={2}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void handleSend(content.includes("AI") || aiLoading);
              }
            }}
          />
          <Button size="icon" onClick={() => handleSend()} disabled={sending || !content.trim()} aria-label="Send">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
