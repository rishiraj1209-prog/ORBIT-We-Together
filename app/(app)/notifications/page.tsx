"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  BrainCircuit,
  FileText,
  Route,
  Shield,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Notification, getNotifications } from "@/lib/notifications";

export default function NotificationsPage() {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) {
        setLoading(false);
        return;
      }

      const data = await getNotifications(user.uid);
      setNotifications(data);
      setLoading(false);
    }

    load();
  }, [user]);

  function getIcon(type: Notification["type"]) {
    switch (type) {
      case "resume":
        return <FileText size={18} />;
      case "roadmap":
        return <Route size={18} />;
      case "ai":
        return <BrainCircuit size={18} />;
      default:
        return <Shield size={18} />;
    }
  }

  function getTone(type: Notification["type"]) {
    switch (type) {
      case "resume":
        return "border-violet-400/12 bg-violet-500/8 text-violet-300";
      case "roadmap":
        return "border-cyan-400/12 bg-cyan-500/[0.07] text-cyan-300";
      case "ai":
        return "border-indigo-400/12 bg-indigo-500/8 text-indigo-300";
      default:
        return "border-slate-400/12 bg-slate-500/[0.07] text-slate-300";
    }
  }

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-5xl space-y-6 lg:space-y-8">
        <PageHeader
          eyebrow={
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
              <Bell size={14} />
              Notification Center
            </span>
          }
          title="Your activity."
          description="Resume updates, roadmap generation, and AI-powered career activity in one chronological feed."
          actions={
            !loading ? (
              <span className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-2 text-xs font-medium text-slate-400">
                {notifications.length} {notifications.length === 1 ? "update" : "updates"}
              </span>
            ) : undefined
          }
        />

        {loading ? (
          <div role="status" aria-label="Loading notifications" className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-28 rounded-[var(--radius-card)]" />
            ))}
            <span className="sr-only">Loading your activity.</span>
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={<Sparkles size={20} />}
            title="No notifications yet"
            description="Analyze your resume or generate a roadmap to start building your Orbit activity history."
            className="min-h-80"
          />
        ) : (
          <Card className="overflow-hidden">
            <div className="border-b border-white/8 px-5 py-4 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                Recent activity
              </p>
            </div>
            <div className="divide-y divide-white/8">
              {notifications.map((item) => (
                <article
                  key={item.id}
                  className="group relative flex gap-4 px-5 py-5 transition hover:bg-white/[0.02] sm:gap-5 sm:px-6 sm:py-6"
                >
                  <span
                    className={
                      "flex size-10 shrink-0 items-center justify-center rounded-xl border transition group-hover:scale-105 " +
                      getTone(item.type)
                    }
                  >
                    {getIcon(item.type)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h2 className="text-base font-semibold tracking-tight text-slate-200">
                        {item.title}
                      </h2>
                      <span className="w-fit rounded-full border border-white/8 bg-white/[0.025] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                        {item.type}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.message}</p>
                  </div>
                </article>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
