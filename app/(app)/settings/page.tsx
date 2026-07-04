"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  LogOut,
  Settings,
  Shield,
  Sparkles,
  User,
  Mail,
  CheckCircle2,
} from "lucide-react";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/providers/auth-provider";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();

  async function logout() {
    await signOut(auth);
    router.push("/");
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <Settings size={16} />
            Account Settings
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Manage your account.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            View your profile, authentication status and account security.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="green-glass relative overflow-hidden rounded-[2.5rem] p-8">
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-green-400 to-lime-400 shadow-lg shadow-green-500/20">
                  <User className="text-slate-950" size={34} />
                </div>

                <div>
                  <h2 className="text-3xl font-black">
                    {user?.displayName || "Orbit User"}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-slate-400">
                    <Mail size={16} />
                    {user?.email || "Not signed in"}
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-3">
                    <Shield className="text-green-300" />

                    <div>
                      <h3 className="font-semibold">
                        Firebase Authentication
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Your account is protected using Firebase Authentication.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-300" />

                    <div>
                      <h3 className="font-semibold">
                        Email Verification
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        {user?.emailVerified
                          ? "Your email has been verified."
                          : "Email verification is pending."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="mt-8 flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-4 font-semibold transition hover:bg-red-500"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="green-glass rounded-[2rem] p-6">
              <Sparkles className="mb-4 text-green-300" />

              <h3 className="text-2xl font-bold">Orbit Status</h3>

              <p className="mt-4 leading-7 text-slate-400">
                Your account is connected to the Orbit AI Career Intelligence
                Platform.
              </p>

              <div className="mt-6 rounded-full bg-green-500/10 px-4 py-2 text-center font-semibold text-green-300">
                Active
              </div>
            </div>

            <div className="green-glass rounded-[2rem] p-6">
              <Shield className="mb-4 text-green-300" />

              <h3 className="text-2xl font-bold">Security</h3>

              <p className="mt-4 leading-7 text-slate-400">
                Authentication, database access and storage are protected using
                Firebase Security Rules.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
