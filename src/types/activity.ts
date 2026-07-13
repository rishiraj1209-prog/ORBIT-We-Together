export type ActivityType =
  | "connection"
  | "introduction"
  | "message"
  | "event"
  | "opportunity"
  | "profile"
  | "referral";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  actorName?: string;
  actorPhoto?: string | null;
  href?: string;
}

export interface AdminReport {
  id: string;
  reporterId: string;
  targetId: string;
  targetType: "user" | "message" | "opportunity";
  reason: string;
  status: "open" | "reviewed" | "resolved" | "dismissed";
  createdAt: string;
}

export interface AdminAnalytics {
  totalUsers: number;
  verifiedUsers: number;
  pendingVerifications: number;
  activeToday: number;
  totalConnections: number;
  totalIntroductions: number;
  totalMessages: number;
  signupTrend: Array<{ date: string; count: number }>;
}
