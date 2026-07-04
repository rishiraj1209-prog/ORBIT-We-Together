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
        return <FileText className="text-green-300" size={22} />;
      case "roadmap":
        return <Route className="text-green-300" size={22} />;
      case "ai":
        return <BrainCircuit className="text-green-300" size={22} />;
      default:
        return <Shield className="text-green-300" size={22} />;
    }
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <Bell size={16} />
            Notification Center
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Your activity.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Resume updates, roadmap generation and AI-powered career activity.
          </p>
        </div>

        {loading ? (
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-[2rem] border border-white/10 bg-white/5"
              />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="green-glass rounded-[2.5rem] p-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10">
              <Sparkles className="text-green-300" />
            </div>

            <h2 className="text-2xl font-bold">No notifications yet</h2>

            <p className="mx-auto mt-3 max-w-md text-slate-400">
              Analyze your resume or generate a roadmap to start building your
              Orbit activity history.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="group green-glass relative overflow-hidden rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:shadow-[0_0_35px_rgba(34,197,94,0.12)]"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-green-500/10 blur-3xl transition group-hover:bg-lime-400/20" />

                <div className="relative flex items-start gap-5">
                  <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-3">
                    {getIcon(item.type)}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">{item.title}</h2>

                    <p className="mt-2 leading-7 text-slate-400">
                      {item.message}
                    </p>

                    <span className="mt-4 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-400">
                      {item.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}