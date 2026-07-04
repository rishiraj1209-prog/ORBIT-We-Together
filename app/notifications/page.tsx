"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  BrainCircuit,
  FileText,
  Route,
  Shield,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import {
  Notification,
  getNotifications,
} from "@/lib/notifications";

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
        return <FileText className="text-cyan-300" size={22} />;

      case "roadmap":
        return <Route className="text-indigo-300" size={22} />;

      case "ai":
        return <BrainCircuit className="text-violet-300" size={22} />;

      default:
        return <Shield className="text-emerald-300" size={22} />;
    }
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10">

          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <Bell size={16}/>
            Notification Center
          </p>

          <h1 className="text-5xl font-black">
            Your activity
          </h1>

          <p className="mt-4 text-slate-400">
            Resume updates, roadmap generation and AI activity.
          </p>

        </div>

        {loading ? (

          <p className="text-slate-400">
            Loading...
          </p>

        ) : notifications.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
            No notifications yet.
          </div>

        ) : (

          <div className="space-y-5">

            {notifications.map((item) => (

              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >

                <div className="flex items-start gap-5">

                  <div className="rounded-2xl bg-black/20 p-3">
                    {getIcon(item.type)}
                  </div>

                  <div>

                    <h2 className="text-xl font-bold">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-slate-400">
                      {item.message}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}