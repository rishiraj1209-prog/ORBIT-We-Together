export const APP_ROUTES = {
  home: "/app",
  onboarding: "/onboarding",
  directory: "/app/directory",
  profile: (id: string) => `/app/profile/${id}`,
  profileEdit: "/app/profile/edit",
  messages: "/app/messages",
  conversation: (id: string) => `/app/messages/${id}`,
  introductions: "/app/introductions",
  network: "/app/network",
  opportunities: "/app/opportunities",
  events: "/app/events",
  referrals: "/app/referrals",
  settings: "/app/settings",
  admin: "/app/admin",
} as const;

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  adminOnly?: boolean;
}

export const APP_NAV: NavItem[] = [
  { label: "Home", href: APP_ROUTES.home, icon: "home" },
  { label: "Directory", href: APP_ROUTES.directory, icon: "users" },
  { label: "Network", href: APP_ROUTES.network, icon: "network" },
  { label: "Messages", href: APP_ROUTES.messages, icon: "messages" },
  { label: "Introductions", href: APP_ROUTES.introductions, icon: "handshake" },
  { label: "Opportunities", href: APP_ROUTES.opportunities, icon: "briefcase" },
  { label: "Events", href: APP_ROUTES.events, icon: "calendar" },
  { label: "Referrals", href: APP_ROUTES.referrals, icon: "gift" },
];

export const ADMIN_NAV: NavItem[] = [
  { label: "Admin", href: APP_ROUTES.admin, icon: "shield", adminOnly: true },
];

export const QUICK_ACTIONS = [
  { label: "Find alumni", href: APP_ROUTES.directory, icon: "search" },
  { label: "Request intro", href: APP_ROUTES.introductions, icon: "handshake" },
  { label: "Browse jobs", href: APP_ROUTES.opportunities, icon: "briefcase" },
  { label: "Invite friends", href: APP_ROUTES.referrals, icon: "gift" },
] as const;

export const ONBOARDING_STEPS = [
  { id: "welcome", title: "Welcome", description: "Let's set up your profile" },
  { id: "role", title: "Your role", description: "Tell us who you are" },
  { id: "resume", title: "Resume", description: "Upload or skip" },
  { id: "profile", title: "Profile", description: "Review AI suggestions" },
  { id: "avatar", title: "Photo", description: "Add your avatar" },
  { id: "complete", title: "Complete", description: "You're all set" },
] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEPS)[number]["id"];
