import type { AppNotification } from "@/types/notification";

export function getDefaultNotifications(userId: string): AppNotification[] {
  return [
    {
      id: "notif-001",
      userId,
      type: "connection",
      title: "New connection request",
      body: "Priya Sharma wants to connect",
      href: "/app/network",
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "notif-002",
      userId,
      type: "introduction",
      title: "Introduction update",
      body: "Your intro to James Rodriguez was accepted",
      href: "/app/introductions",
      read: false,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: "notif-003",
      userId,
      type: "event",
      title: "Event starting soon",
      body: "AI in Product fireside chat — March 20",
      href: "/app/events",
      read: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "notif-004",
      userId,
      type: "achievement",
      title: "Achievement unlocked!",
      body: "You earned the Network Starter badge",
      href: "/app/referrals",
      read: true,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ];
}

export function getWelcomeMessage(displayName: string | null): string {
  const hour = new Date().getHours();
  const name = displayName?.split(" ")[0] ?? "there";
  if (hour < 12) return `Good morning, ${name}`;
  if (hour < 17) return `Good afternoon, ${name}`;
  return `Good evening, ${name}`;
}
