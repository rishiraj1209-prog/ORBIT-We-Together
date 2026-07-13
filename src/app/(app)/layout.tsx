import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/constants/auth";
import { getCurrentUser } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(AUTH_ROUTES.login);
  }

  if (!user.emailVerified) {
    redirect(AUTH_ROUTES.verifyEmail);
  }

  return <>{children}</>;
}
