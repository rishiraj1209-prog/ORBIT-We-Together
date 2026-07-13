"use client";

import { useEffect, useState } from "react";
import { Download, Smartphone, X } from "lucide-react";

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaRuntime() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }

    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const handleInstalled = () => setInstallPrompt(null);

    window.addEventListener("beforeinstallprompt", handlePrompt);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstallPrompt(null);
  }

  if (!installPrompt || dismissed) return null;

  return (
    <aside className="fixed bottom-4 left-4 z-[90] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-gold/30 bg-ink/95 p-4 text-[#f3efe6] shadow-2xl backdrop-blur-xl">
      <button type="button" onClick={() => setDismissed(true)} className="absolute right-3 top-3 rounded-full p-1 text-[#777a72] hover:text-white" aria-label="Dismiss install prompt"><X className="h-4 w-4" /></button>
      <div className="flex gap-3 pr-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c8a96c]/15 text-[#c8a96c]"><Smartphone className="h-5 w-5" /></span>
        <div><p className="text-sm font-medium">Install Orbit on Android</p><p className="mt-1 text-xs leading-5 text-[#aaa99f]">Full-screen access, a home-screen icon, and a faster app launch.</p></div>
      </div>
      <button type="button" onClick={install} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#f3efe6] px-4 py-2.5 text-xs font-semibold text-[#10130f]"><Download className="h-4 w-4" /> Install app</button>
    </aside>
  );
}
