import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { requireAdmin } from "@/lib/auth/guards";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminPage() {
  await requireAdmin();
  return <AdminDashboard />;
}
