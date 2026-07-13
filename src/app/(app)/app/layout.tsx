import { AppShell } from "@/components/app/app-shell";
import { requireOnboardingComplete } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

export default async function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireOnboardingComplete();
  return <AppShell user={user}>{children}</AppShell>;
}
