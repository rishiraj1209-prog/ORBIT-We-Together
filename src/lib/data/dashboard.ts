import type { AlumniProfile } from "@/types/profile";
import type { MatchRecommendation } from "@/types/social";
import type { ActivityItem } from "@/types/activity";
import { SEED_ALUMNI } from "@/lib/data/seed-alumni";
import { SEED_OPPORTUNITIES } from "@/lib/data/seed-opportunities";
import { SEED_EVENTS } from "@/lib/data/seed-events";
import { getSeedActivities } from "@/lib/data/seed-activities";
import { getWelcomeMessage } from "@/lib/data/notifications";
import { getMatchRecommendations } from "@/lib/ai/matching";
import { generateSmartInsights } from "@/lib/ai/compose";
import type { AuthUser } from "@/types/auth";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";

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
  let currentUserProfile: AlumniProfile | null = null;
  if (isFirebaseAdminConfigured()) {
    const [{ getAdminUserDocument }, { userDocumentToAlumniProfile }] =
      await Promise.all([
        import("@/lib/firebase/admin-users"),
        import("@/lib/firebase/profile"),
      ]);
    userDoc = await getAdminUserDocument(user.uid);
    currentUserProfile = userDoc
      ? userDocumentToAlumniProfile(userDoc)
      : null;
  }
  const skills = userDoc?.skills ?? user.skills ?? ["Networking"];
  const industry = userDoc?.industry ?? user.industry;
  const displayName = user.displayName ?? userDoc?.displayName ?? "Member";

  const allAlumni = [...SEED_ALUMNI];
  if (currentUserProfile) {
    allAlumni.unshift(currentUserProfile);
  }

  const matches = getMatchRecommendations(
    skills,
    industry,
    displayName,
    SEED_ALUMNI,
    user.uid,
    3
  );

  const trending = [...SEED_ALUMNI]
    .sort((a, b) => (b.mutualConnections ?? 0) - (a.mutualConnections ?? 0))
    .slice(0, 4);

  return {
    welcomeMessage: getWelcomeMessage(displayName),
    matches,
    trendingAlumni: trending,
    referralProgress: {
      current: userDoc?.referralCount ?? 2,
      goal: 5,
      code: userDoc?.referralCode ?? `ORBIT-${user.uid.slice(0, 6).toUpperCase()}`,
    },
    upcomingEvents: SEED_EVENTS.slice(0, 3),
    opportunities: SEED_OPPORTUNITIES.slice(0, 3),
    activities: getSeedActivities(),
    insights: generateSmartInsights({
      skills,
      industry,
      profileCompleteness: userDoc?.profileCompleteness ?? user.profileCompleteness ?? 50,
      connectionCount: 3,
    }),
    stats: {
      connections: 12,
      introductions: 4,
      profileViews: 28,
      networkGrowth: 15,
    },
  };
}
