export const SITE = {
  name: "Orbit",
  tagline: "Intelligence for the people who move you forward.",
  description:
    "Orbit is the relationship intelligence platform that turns trusted communities into meaningful introductions, opportunities, and momentum.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

export const MARKETING_NAV = [
  { label: "Intelligence", href: "#intelligence" },
  { label: "Concierge", href: "#intelligence" },
  { label: "Manifesto", href: "#intelligence" },
] as const;

export const STATS = [
  { label: "Verified alumni", value: "2,400+" },
  { label: "Warm intros made", value: "850+" },
  { label: "Avg. match score", value: "89%" },
] as const;
