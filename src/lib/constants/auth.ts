export const SESSION_COOKIE_NAME = "orbit_session";

/** 14 days — Firebase session cookie maximum */
export const SESSION_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

export const AUTH_ROUTES = {
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  verifyEmail: "/verify-email",
} as const;

export const PROTECTED_ROUTE_PREFIX = "/app";

export const PUBLIC_AUTH_PATHS = [
  AUTH_ROUTES.login,
  AUTH_ROUTES.signup,
  AUTH_ROUTES.forgotPassword,
] as const;

export function getAllowedEmailDomains(): string[] {
  const raw = process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS ?? "";
  return raw
    .split(",")
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean);
}

export function isCollegeEmail(email: string): boolean {
  const domains = getAllowedEmailDomains();
  if (domains.length === 0) return true;

  const normalized = email.trim().toLowerCase();
  const atIndex = normalized.lastIndexOf("@");
  if (atIndex === -1) return false;

  const domain = normalized.slice(atIndex + 1);
  return domains.some(
    (allowed) => domain === allowed || domain.endsWith(`.${allowed}`)
  );
}
