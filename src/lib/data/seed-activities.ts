import type { ActivityItem } from "@/types/activity";

export function getSeedActivities(): ActivityItem[] {
  return [
    {
      id: "act-001",
      type: "connection",
      title: "New connection request",
      description: "Priya Sharma wants to connect with you",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      actorName: "Priya Sharma",
      href: "/app/network",
    },
    {
      id: "act-002",
      type: "introduction",
      title: "Introduction accepted",
      description: "Arjun Patel accepted your introduction request",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      actorName: "Arjun Patel",
      href: "/app/introductions",
    },
    {
      id: "act-003",
      type: "event",
      title: "Event reminder",
      description: "AI in Product fireside chat starts in 2 days",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      href: "/app/events",
    },
    {
      id: "act-004",
      type: "opportunity",
      title: "New opportunity match",
      description: "Senior SWE at Stripe matches your skills",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      href: "/app/opportunities",
    },
    {
      id: "act-005",
      type: "referral",
      title: "Referral signed up",
      description: "Your referral Emma joined Orbit",
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      actorName: "Emma Williams",
      href: "/app/referrals",
    },
    {
      id: "act-006",
      type: "profile",
      title: "Profile viewed",
      description: "Sarah Chen viewed your profile",
      timestamp: new Date(Date.now() - 345600000).toISOString(),
      actorName: "Sarah Chen",
      href: "/app/profile/seed-003",
    },
  ];
}

