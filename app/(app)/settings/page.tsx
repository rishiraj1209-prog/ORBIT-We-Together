"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { LogOut, Settings, User, Shield } from "lucide-react";

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
    <div className="px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          <Settings size={16} />
          Account Settings
        </p>

        <h1 className="text-5xl font-black">Settings</h1>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20">
              <User className="text-indigo-300" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user?.displayName || "Orbit User"}
              </h2>
              <p className="text-slate-400">{user?.email || "Not signed in"}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <div className="flex items-center gap-3">
              <Shield className="text-emerald-300" />
              <div>
                <p className="font-semibold">Secure Firebase Account</p>
                <p className="text-sm text-slate-400">
                  Your authentication is managed through Firebase.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="mt-8 flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
          >
            <LogOut size={18} />
            Logout
          </button>
        </section>
      </div>
    </div>
  );
}