"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Compass, Fingerprint, MessageCircle, Network, ShieldCheck, Sparkles, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: .7, ease: [0.22, 1, 0.36, 1] as const } };

const people = [
  { initials: "AM", name: "Anika Mehta", role: "Climate investor", score: "96%", pos: "left-[8%] top-[18%]" },
  { initials: "RK", name: "Rohan Kapoor", role: "Founder, Northstar", score: "91%", pos: "right-[5%] top-[13%]" },
  { initials: "SP", name: "Sara Patel", role: "Product, Linear", score: "89%", pos: "left-[2%] bottom-[16%]" },
  { initials: "VD", name: "Vikram Das", role: "Design leader", score: "87%", pos: "right-[4%] bottom-[12%]" },
];

function Constellation() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[600px]">
      <div className="absolute inset-[9%] rounded-full border border-gold/20" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-text-tertiary/20 animate-orbit-spin" />
      <div className="absolute inset-[36%] rounded-full border border-accent/25" />
      <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        <path d="M300 300L105 145M300 300L496 128M300 300L83 460M300 300L510 475" stroke="url(#line)" strokeWidth="1" />
        <defs><linearGradient id="line"><stop stopColor="#c8a96c"/><stop offset="1" stopColor="#c8a96c" stopOpacity="0"/></linearGradient></defs>
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/35 bg-surface shadow-[0_0_80px_rgba(200,169,108,.18)]">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-text-primary text-background">
          <span className="font-display text-3xl">You</span>
        </div>
      </div>
      {people.map((person, i) => (
        <motion.div key={person.name} initial={{ opacity: 0, scale: .75 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .65 + i * .13, duration: .55 }} className={`absolute ${person.pos} animate-orbit-float`} style={{ animationDelay: `${i * .6}s` }}>
          <div className="group flex items-center gap-3 rounded-2xl border border-border/80 bg-surface/90 p-2.5 pr-4 premium-shadow backdrop-blur-xl transition-transform hover:scale-105">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-subtle text-xs font-semibold text-accent">{person.initials}</span>
            <span className="hidden sm:block"><span className="block whitespace-nowrap text-xs font-semibold">{person.name}</span><span className="block whitespace-nowrap text-[10px] text-text-tertiary">{person.role}</span></span>
            <span className="ml-1 text-[10px] font-semibold text-gold">{person.score}</span>
          </div>
        </motion.div>
      ))}
      <div className="absolute left-1/2 top-[4%] -translate-x-1/2 rounded-full border border-gold/30 bg-ai-subtle px-3 py-1 text-[10px] uppercase tracking-[.22em] text-ai">Live constellation</div>
    </div>
  );
}

export function OrbitExperience() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[94vh] border-b border-border/60 pt-28 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(184,154,99,.13),transparent_32%),radial-gradient(circle_at_20%_0%,rgba(95,120,107,.14),transparent_28%)]" />
        <Container className="relative grid items-center gap-10 pb-20 lg:grid-cols-[.92fr_1.08fr] lg:pb-28">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[.16em] text-text-secondary backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_10px_var(--success)]" /> Relationship intelligence, reimagined
            </div>
            <h1 className="font-display text-balance text-[clamp(3.8rem,7vw,7.3rem)] leading-[.89] text-text-primary">Your next chapter is already <em className="text-gold">in orbit.</em></h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">A private intelligence layer for ambitious communities. Orbit reads the signal across people, intentions, and timing—then creates the connection that changes what happens next.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/signup">Enter your Orbit <ArrowRight /></Link></Button>
              <Button asChild variant="secondary" size="lg"><Link href="#intelligence">Explore the intelligence</Link></Button>
            </div>
            <div className="mt-12 flex items-center gap-6 text-xs text-text-tertiary">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Invite-only trust</span>
              <span className="h-4 w-px bg-border" />
              <span>No ads. No cold outreach.</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .15 }}><Constellation /></motion.div>
        </Container>
        <div className="border-t border-border/60 bg-surface/30 py-5">
          <Container className="flex flex-wrap items-center justify-between gap-5 text-[10px] uppercase tracking-[.22em] text-text-tertiary"><span>Trusted relationship infrastructure for</span><span className="text-text-secondary">Alumni</span><span className="text-text-secondary">Enterprise</span><span className="text-text-secondary">Venture</span><span className="text-text-secondary">Leadership communities</span></Container>
        </div>
      </section>

      <section id="intelligence" className="relative py-28 sm:py-36">
        <Container>
          <motion.div {...reveal} className="grid gap-12 lg:grid-cols-2 lg:items-end">
            <div><p className="mb-5 text-xs uppercase tracking-[.25em] text-gold">The relationship operating system</p><h2 className="font-display text-balance text-5xl leading-[.98] sm:text-7xl">It doesn’t show you more people. It reveals the <em>right</em> ones.</h2></div>
            <p className="max-w-lg text-lg leading-8 text-text-secondary lg:justify-self-end">Orbit models the invisible architecture of your community: shared context, trust paths, latent intent, and the precise moment an introduction becomes valuable.</p>
          </motion.div>
          <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Fingerprint, n: "01", title: "Trust Graph", text: "Understands who knows whom—and where genuine trust already exists." },
              { icon: Compass, n: "02", title: "Intent Radar", text: "Detects goals, availability, and where two trajectories are about to intersect." },
              { icon: BrainCircuit, n: "03", title: "Context Engine", text: "Explains every match in language that feels human, specific, and useful." },
              { icon: WandSparkles, n: "04", title: "Serendipity Mode", text: "Surfaces one unexpected, high-upside connection you would never search for." },
            ].map((item, i) => <motion.article key={item.title} {...reveal} transition={{ ...reveal.transition, delay: i*.08 }} className="group min-h-72 rounded-[28px] border border-border/80 bg-surface/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold/45 hover:bg-surface">
              <div className="flex items-center justify-between"><item.icon className="h-5 w-5 text-gold"/><span className="font-mono text-[10px] text-text-tertiary">{item.n}</span></div><h3 className="mt-24 text-xl font-medium">{item.title}</h3><p className="mt-3 text-sm leading-6 text-text-secondary">{item.text}</p>
            </motion.article>)}
          </div>
        </Container>
      </section>

      <section className="border-y border-border/60 bg-ink py-28 text-[#f2ede3] sm:py-36">
        <Container>
          <motion.div {...reveal} className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div><span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#c8a96c]/40"><MessageCircle className="h-5 w-5 text-[#c8a96c]"/></span><h2 className="font-display mt-8 text-5xl leading-none sm:text-7xl">Meet Aura, your relationship concierge.</h2><p className="mt-6 max-w-lg text-base leading-7 text-[#aaa99f]">Not a chatbot bolted onto a dashboard. Aura understands your network, spots timely openings, prepares introductions, and turns a vague goal into a clear next move.</p></div>
            <div className="rounded-[32px] border border-white/10 bg-white/[.035] p-4 shadow-2xl sm:p-7">
              <div className="flex items-center gap-3 border-b border-white/10 pb-5"><span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#c8a96c] text-[#10130f]"><Sparkles className="h-4 w-4"/><span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#10130f] bg-[#8dc7a9]"/></span><div><p className="text-sm font-medium">Aura</p><p className="text-[11px] text-[#777a72]">Relationship concierge · Active</p></div></div>
              <div className="space-y-4 py-7"><div className="max-w-[84%] rounded-2xl rounded-tl-sm bg-white/[.07] p-4 text-sm leading-6 text-[#d9d5cc]">I found a strong path to three climate investors through people you already trust. Anika is the best first conversation—your work overlaps, and she opened two mentoring slots yesterday.</div><div className="ml-auto max-w-[76%] rounded-2xl rounded-tr-sm bg-[#e9e2d4] p-4 text-sm text-[#171a16]">Prepare a warm introduction and give me the context before I send it.</div><div className="max-w-[84%] rounded-2xl rounded-tl-sm border border-[#c8a96c]/20 bg-[#c8a96c]/10 p-4 text-sm leading-6 text-[#e8dfcf]">Done. I drafted the note, mapped the mutual value, and suggested Thursday morning when both calendars are typically open.</div></div>
              <div className="flex gap-2 border-t border-white/10 pt-5"><span className="flex-1 rounded-full border border-white/10 px-5 py-3 text-sm text-[#777a72]">Ask Aura anything about your network…</span><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c8a96c] text-[#10130f]"><ArrowRight className="h-4 w-4"/></span></div>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-28 sm:py-40">
        <Container>
          <motion.div {...reveal} className="relative overflow-hidden rounded-[40px] border border-gold/25 bg-[linear-gradient(135deg,var(--surface),var(--ai-subtle))] px-7 py-20 text-center sm:px-16 sm:py-28">
            <Network className="mx-auto h-7 w-7 text-gold"/><h2 className="font-display mx-auto mt-7 max-w-4xl text-balance text-5xl leading-[.95] sm:text-7xl">The most valuable opportunity in your network is the one you haven’t seen yet.</h2><p className="mx-auto mt-7 max-w-xl text-base leading-7 text-text-secondary">Join a network designed to compound trust, generosity, and ambition.</p><Button asChild size="lg" className="mt-9"><Link href="/signup">Build your constellation <ArrowRight /></Link></Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
