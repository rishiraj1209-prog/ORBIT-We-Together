import type { AppNotification } from "@/types/notification";

export function getDefaultNotifications(userId: string): AppNotification[] {
  void userId;
  return [];
}

export function getWelcomeMessage(displayName: string | null): string {
  const hour = new Date().getHours();
  const name = displayName?.split(" ")[0] ?? "there";
  if (hour < 12) return `Good morning, ${name}`;
  if (hour < 17) return `Good afternoon, ${name}`;
  return `Good evening, ${name}`;
}
