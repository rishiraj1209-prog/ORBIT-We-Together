import type { AlumniProfile } from "@/types/profile";
import type { MatchRecommendation } from "@/types/social";
import type { ActivityItem } from "@/types/activity";
import { SEED_OPPORTUNITIES } from "@/lib/data/seed-opportunities";
import { SEED_EVENTS } from "@/lib/data/seed-events";
import { getWelcomeMessage } from "@/lib/data/notifications";
import { getMatchRecommendations } from "@/lib/ai/matching";
import { generateSmartInsights } from "@/lib/ai/compose";
import type { AuthUser } from "@/types/auth";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import { memoryStore } from "@/lib/data/memory-store";

export interface DashboardData {
  welcomeMessage: string;
  matches: MatchRecommendation[];
  trendingAlumni: AlumniProfile[];
  referralProgress: { current: number; goal: number; code: string };
  upcomingEvents: typeof SEED_EVENTS;
  opportunities: typeof SEED_OPPORTUNITIES;
  activities: ActivityItem[];
  insights: string[];
  stats: {
    connections: number;
    introductions: number;
    profileViews: number;
    networkGrowth: number;
  };
}

export async function getDashboardData(user: AuthUser): Promise<DashboardData> {
  let userDoc = null;
  let realProfiles: AlumniProfile[] = [];
  if (isFirebaseAdminConfigured()) {
    const [{ getAdminUserDocument }, { listDirectoryProfiles }] =
      await Promise.all([
        import("@/lib/firebase/admin-users"),
        import("@/lib/firebase/profile"),
      ]);
    userDoc = await getAdminUserDocument(user.uid);
    realProfiles = await listDirectoryProfiles();
  }
  const skills = userDoc?.skills ?? user.skills ?? ["Networking"];
  const industry = userDoc?.industry ?? user.industry;
  const displayName = user.displayName ?? userDoc?.displayName ?? "Member";

  const otherProfiles = realProfiles.filter((profile) => profile.uid !== user.uid);
  const connections = memoryStore.connections.getByUser(user.uid);
  const introductions = memoryStore.introductions.getByUser(user.uid);

  const matches = getMatchRecommendations(
    skills,
    industry,
    displayName,
    otherProfiles,
    user.uid,
    3
  );

  const trending = [...otherProfiles]
    .sort((a, b) => (b.lastActiveAt ?? "").localeCompare(a.lastActiveAt ?? ""))
    .slice(0, 4);

  const activities: ActivityItem[] = [
    ...connections.map((connection) => ({
      id: connection.id,
      type: "connection" as const,
      title: connection.status === "pending" ? "Connection request" : "Connection updated",
      description: connection.status === "pending" ? "A real member is waiting for your response" : `Connection ${connection.status}`,
      timestamp: connection.updatedAt,
      href: "/app/network",
    })),
    ...introductions.map((introduction) => ({
      id: introduction.id,
      type: "introduction" as const,
      title: "Warm introduction update",
      description: `Introduction ${introduction.status}`,
      timestamp: introduction.updatedAt,
      href: "/app/introductions",
    })),
  ].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return {
    welcomeMessage: getWelcomeMessage(displayName),
    matches,
    trendingAlumni: trending,
    referralProgress: {
      current: userDoc?.referralCount ?? 0,
      goal: 5,
      code: userDoc?.referralCode ?? `ORBIT-${user.uid.slice(0, 6).toUpperCase()}`,
    },
    upcomingEvents: SEED_EVENTS.slice(0, 3),
    opportunities: SEED_OPPORTUNITIES.slice(0, 3),
    activities,
    insights: generateSmartInsights({
      skills,
      industry,
      profileCompleteness: userDoc?.profileCompleteness ?? user.profileCompleteness ?? 50,
      connectionCount: connections.filter((connection) => connection.status === "accepted").length,
    }),
    stats: {
      connections: connections.filter((connection) => connection.status === "accepted").length,
      introductions: introductions.length,
      profileViews: 0,
      networkGrowth: 0,
    },
  };
}
