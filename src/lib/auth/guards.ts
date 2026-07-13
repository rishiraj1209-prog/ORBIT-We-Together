import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/constants/auth";
import { APP_ROUTES } from "@/lib/constants/app";
import { getCurrentUser } from "@/lib/auth/server";

export async function requireOnboardingComplete() {
  const user = await getCurrentUser();
  if (!user) redirect(AUTH_ROUTES.login);
  if (!user.emailVerified) redirect(AUTH_ROUTES.verifyEmail);
  if (!user.onboardingComplete) redirect(APP_ROUTES.onboarding);
  return user;
}

export async function requireOnboardingIncomplete() {
  const user = await getCurrentUser();
  if (!user) redirect(AUTH_ROUTES.login);
  if (!user.emailVerified) redirect(AUTH_ROUTES.verifyEmail);
  if (user.onboardingComplete) redirect(APP_ROUTES.home);
  return user;
}

export async function requireAdmin() {
  const user = await requireOnboardingComplete();
  if (user.role !== "admin") redirect(APP_ROUTES.home);
  return user;
}
