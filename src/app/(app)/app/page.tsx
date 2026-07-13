import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, CalendarDays, CircleDotDashed, Compass, Eye, Network, Sparkles, TrendingUp, Users } from "lucide-react";
import { requireOnboardingComplete } from "@/lib/auth/guards";
import { getDashboardData } from "@/lib/data/dashboard";
import { APP_ROUTES } from "@/lib/constants/app";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Command Center" };
export const dynamic = "force-dynamic";

const nodePositions = ["left-[7%] top-[20%]", "right-[6%] top-[15%]", "left-[12%] bottom-[11%]"];

export default async function DashboardPage() {
  const user = await requireOnboardingComplete();
  const data = await getDashboardData(user);
  const firstName = user.displayName?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 border-b border-border/60 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.24em] text-gold">Monday · Relationship briefing</p><h1 className="font-display text-5xl leading-none sm:text-6xl">Good morning, {firstName}.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">Your network changed while you were away. Here are the signals worth your attention.</p></div>
        <Button asChild><Link href={APP_ROUTES.directory}><Compass className="h-4 w-4"/> Discover people</Link></Button>
      </header>

      <div className="grid gap-5 xl:grid-cols-[1.42fr_.58fr]">
        <section className="relative min-h-[540px] overflow-hidden rounded-[30px] border border-border/70 bg-ink p-6 text-[#f3efe6] shadow-[0_30px_80px_rgba(0,0,0,.2)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,108,.12),transparent_43%)]" />
          <div className="relative z-10 flex items-start justify-between"><div><p className="text-[10px] uppercase tracking-[.22em] text-[#c8a96c]">Your constellation</p><h2 className="mt-2 text-xl font-medium">High-potential paths</h2></div><span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-[#aaa99f]"><span className="h-1.5 w-1.5 rounded-full bg-[#8dc7a9]"/> Live</span></div>
          <div className="absolute inset-x-6 bottom-7 top-24 sm:inset-x-10">
            <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c8a96c]/15" />
            <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />
            <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 700 400" preserveAspectRatio="none" aria-hidden="true"><path d="M350 205L90 70M350 205L620 58M350 205L120 360" stroke="#c8a96c" strokeWidth="1"/></svg>
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#c8a96c]/30 bg-[#171b17] shadow-[0_0_60px_rgba(200,169,108,.2)]"><UserAvatar name={user.displayName ?? "You"} photoURL={user.photoURL} size="lg"/></div>
            {data.matches.map((match, i) => <Link key={match.uid} href={APP_ROUTES.profile(match.uid)} className={`group absolute ${nodePositions[i]} flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.055] p-2.5 pr-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-[#c8a96c]/40`}>
              <UserAvatar name={match.displayName} photoURL={match.photoURL}/><div className="hidden sm:block"><p className="whitespace-nowrap text-xs font-medium">{match.displayName}</p><p className="max-w-32 truncate text-[10px] text-[#777a72]">{match.headline}</p></div><span className="text-[10px] font-semibold text-[#c8a96c]">{match.matchScore}%</span>
            </Link>)}
            <Link href={APP_ROUTES.network} className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs text-[#aaa99f] hover:text-white">Explore full graph <ArrowRight className="h-3 w-3"/></Link>
          </div>
        </section>

        <div className="space-y-5">
          <section className="rounded-[28px] border border-gold/25 bg-ai-subtle/65 p-6">
            <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-text-primary text-gold"><Sparkles className="h-4 w-4"/></span><Badge variant="ai">Aura insight</Badge></div>
            <h2 className="font-display mt-8 text-3xl leading-tight">One conversation could change your quarter.</h2>
            <p className="mt-4 text-sm leading-6 text-text-secondary">{data.insights[0] ?? "Your network has new momentum. Start with the match that has the strongest shared context."}</p>
            <Link href={APP_ROUTES.network} className="mt-6 flex items-center gap-2 text-sm font-medium text-text-primary">See why now <ArrowRight className="h-4 w-4"/></Link>
          </section>
          <section className="grid grid-cols-2 gap-3">
            {[{ icon: Users, value: data.stats.connections, label: "Trusted connections" }, { icon: Eye, value: data.stats.profileViews, label: "Profile signals" }, { icon: Network, value: data.stats.introductions, label: "Warm paths" }, { icon: TrendingUp, value: `${data.stats.networkGrowth}%`, label: "Graph growth" }].map(item => <div key={item.label} className="rounded-2xl border border-border/70 bg-surface/70 p-4"><item.icon className="h-4 w-4 text-gold"/><p className="mt-5 text-2xl font-medium tracking-tight">{item.value}</p><p className="mt-1 text-[10px] leading-4 text-text-tertiary">{item.label}</p></div>)}
          </section>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="rounded-[26px] border border-border/70 bg-surface/65 p-6 lg:col-span-2">
          <div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[.2em] text-text-tertiary">Network pulse</p><h2 className="mt-2 text-xl font-medium">What moved recently</h2></div><CircleDotDashed className="h-5 w-5 text-gold"/></div>
          <div className="mt-6 divide-y divide-border/60">{data.activities.slice(0,4).map((activity, i) => <Link key={activity.id} href={activity.href ?? "#"} className="group grid grid-cols-[32px_1fr_auto] items-center gap-3 py-4"><span className="font-mono text-[10px] text-text-tertiary">0{i+1}</span><span><span className="block text-sm font-medium">{activity.title}</span><span className="mt-1 block text-xs text-text-secondary">{activity.description}</span></span><ArrowRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-1 group-hover:text-gold"/></Link>)}</div>
        </section>
        <section className="rounded-[26px] border border-border/70 bg-surface/65 p-6"><p className="text-[10px] uppercase tracking-[.2em] text-text-tertiary">On your horizon</p><div className="mt-5 space-y-5">{data.upcomingEvents.slice(0,2).map(event => <Link href={APP_ROUTES.events} key={event.id} className="block"><div className="flex gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent"><CalendarDays className="h-4 w-4"/></span><div><p className="text-sm font-medium">{event.title}</p><p className="mt-1 text-xs text-text-tertiary">{new Date(event.date).toLocaleDateString("en", { month: "short", day: "numeric" })} · {event.location}</p></div></div></Link>)}<div className="border-t border-border/60 pt-5">{data.opportunities.slice(0,1).map(opp => <Link href={APP_ROUTES.opportunities} key={opp.id} className="flex gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ai-subtle text-ai"><Briefcase className="h-4 w-4"/></span><div><p className="text-sm font-medium">{opp.title}</p><p className="mt-1 text-xs text-text-tertiary">{opp.company} · Curated for you</p></div></Link>)}</div></div></section>
      </div>
    </div>
  );
}
