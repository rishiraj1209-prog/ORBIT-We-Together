"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ChatMessage = { role: "assistant" | "user"; text: string; action?: string; label?: string };

export function OrbitConcierge({ name }: { name?: string | null }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: `Good to see you${name ? `, ${name.split(" ")[0]}` : ""}. I’m Aura. Tell me what you’re trying to make happen, and I’ll find the strongest path through your Orbit.` }]);
  const inputRef = useRef<HTMLInputElement>(null);

  async function ask(text: string) {
    if (!text.trim() || thinking) return;
    setMessages(current => [...current, { role: "user", text: text.trim() }]); setValue(""); setThinking(true);
    try {
      const response = await fetch("/api/ai/concierge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text }) });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json() as { answer: string; action?: string; label?: string };
      setMessages(current => [...current, { role: "assistant", text: data.answer, action: data.action, label: data.label }]);
    } catch { setMessages(current => [...current, { role: "assistant", text: "I couldn’t read the live graph just now. Open Network to explore your strongest current matches while I reconnect.", action: "/app/network", label: "Open Network" }]); }
    finally { setThinking(false); setTimeout(() => inputRef.current?.focus(), 50); }
  }

  function submit(event: FormEvent) { event.preventDefault(); void ask(value); }

  return (
    <>
      <button onClick={() => setOpen(true)} className={cn("fixed bottom-5 right-5 z-50 flex h-14 items-center gap-3 rounded-full border border-gold/35 bg-text-primary px-4 text-background shadow-[0_18px_60px_rgba(0,0,0,.28)] transition-all hover:-translate-y-1 sm:bottom-7 sm:right-7", open && "pointer-events-none opacity-0")} aria-label="Open Aura relationship concierge">
        <span className="relative"><Sparkles className="h-5 w-5 text-gold"/><span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-success ring-2 ring-text-primary"/></span><span className="hidden text-sm font-medium sm:inline">Ask Aura</span>
      </button>
      <AnimatePresence>
        {open && <motion.aside initial={{ opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }} transition={{ duration: .28, ease: [0.22,1,0.36,1] }} className="fixed inset-x-3 bottom-3 z-[70] flex h-[min(700px,calc(100vh-24px))] flex-col overflow-hidden rounded-[28px] border border-border bg-surface premium-shadow sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[410px]">
          <header className="flex items-center gap-3 border-b border-border/70 bg-ink px-5 py-4 text-[#f3efe6]"><span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#c8a96c] text-ink"><Sparkles className="h-4 w-4"/><span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-[#8dc7a9]"/></span><div className="flex-1"><p className="text-sm font-medium">Aura</p><p className="text-[10px] uppercase tracking-[.14em] text-[#8d9087]">Relationship concierge</p></div><button onClick={() => setOpen(false)} className="rounded-full p-2 text-[#aaa99f] hover:bg-white/10 hover:text-white" aria-label="Close concierge"><X className="h-4 w-4"/></button></header>
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">{messages.map((message, i) => <div key={i} className={cn("max-w-[88%] rounded-2xl p-3.5 text-sm leading-6", message.role === "user" ? "ml-auto rounded-tr-sm bg-text-primary text-background" : "rounded-tl-sm border border-border/70 bg-background text-text-secondary")}><p>{message.text}</p>{message.action && <Link href={message.action} onClick={() => setOpen(false)} className="mt-3 flex items-center gap-1.5 font-medium text-accent hover:gap-2.5">{message.label}<ArrowRight className="h-3.5 w-3.5"/></Link>}</div>)}{thinking && <div className="flex w-16 gap-1 rounded-2xl rounded-tl-sm border border-border bg-background p-4">{[0,1,2].map(i => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold" style={{ animationDelay: `${i*120}ms` }}/>)}</div>}</div>
          {messages.length === 1 && <div className="flex gap-2 overflow-x-auto px-4 pb-3">{["Find my best introduction", "Improve my profile", "Show career paths"].map(item => <button key={item} onClick={() => void ask(item)} className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-[11px] text-text-secondary hover:border-gold/40 hover:text-text-primary">{item}</button>)}</div>}
          <form onSubmit={submit} className="border-t border-border/70 p-3"><div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2 focus-within:border-gold/50"><MessageCircle className="h-4 w-4 text-text-tertiary"/><input ref={inputRef} value={value} onChange={e => setValue(e.target.value)} placeholder="What are you trying to make happen?" className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-text-tertiary"/><button type="submit" disabled={!value.trim() || thinking} className="flex h-9 w-9 items-center justify-center rounded-full bg-text-primary text-background disabled:opacity-30" aria-label="Send"><Send className="h-3.5 w-3.5"/></button></div></form>
        </motion.aside>}
      </AnimatePresence>
    </>
  );
}
