"use client";

import { useEffect, useState } from "react";
import { BarChart3, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import type { AdminAnalytics, AdminReport } from "@/types/activity";

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [users, setUsers] = useState<Array<{ uid: string; displayName: string | null; email: string; verificationStatus: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/analytics").then((r) => r.json()),
      fetch("/api/admin/reports").then((r) => r.json()),
      fetch("/api/admin/users").then((r) => r.json()),
    ]).then(([analyticsData, reportsData, usersData]) => {
      setAnalytics(analyticsData.analytics);
      setReports(reportsData.reports ?? []);
      setUsers(usersData.users ?? []);
    }).finally(() => setLoading(false));
  }, []);

  async function verifyUser(uid: string, status: "verified" | "rejected") {
    await fetch("/api/admin/analytics", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, status }),
    });
    const res = await fetch("/api/admin/users");
    const d = await res.json();
    setUsers(d.users ?? []);
  }

  if (loading) {
    return <div className="flex justify-center py-16"><AuthSpinner /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-accent" />
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary">Platform analytics, verification, and moderation</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={analytics?.totalUsers ?? 0} icon={Users} />
        <StatCard label="Verified" value={analytics?.verifiedUsers ?? 0} icon={Shield} />
        <StatCard label="Pending verification" value={analytics?.pendingVerifications ?? 0} icon={Users} />
        <StatCard label="Active today" value={analytics?.activeToday ?? 0} change="Live counter" icon={BarChart3} />
      </div>

      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Platform Stats</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Total connections</span>
                  <span className="font-medium text-text-primary">{analytics?.totalConnections}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Introductions</span>
                  <span className="font-medium text-text-primary">{analytics?.totalIntroductions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Messages sent</span>
                  <span className="font-medium text-text-primary">{analytics?.totalMessages}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Signup Trend (7 days)</CardTitle></CardHeader>
              <CardContent>
                <div className="flex h-40 items-end gap-2">
                  {analytics?.signupTrend.map((day) => (
                    <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-accent/80 transition-all hover:bg-accent"
                        style={{ height: `${(day.count / 30) * 100}%`, minHeight: 4 }}
                      />
                      <span className="text-[10px] text-text-tertiary">{day.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="verification">
          <Card>
            <CardHeader><CardTitle>Pending Verifications</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {users.filter((u) => u.verificationStatus === "pending").length === 0 ? (
                <p className="text-sm text-text-secondary">No pending verifications.</p>
              ) : (
                users.filter((u) => u.verificationStatus === "pending").map((u) => (
                  <div key={u.uid} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="font-medium text-text-primary">{u.displayName ?? "Unknown"}</p>
                      <p className="text-xs text-text-secondary">{u.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => verifyUser(u.uid, "verified")}>Verify</Button>
                      <Button size="sm" variant="secondary" onClick={() => verifyUser(u.uid, "rejected")}>Reject</Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation">
          <Card>
            <CardHeader><CardTitle>Reports</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="warning">{report.status}</Badge>
                    <span className="text-xs text-text-tertiary">{report.targetType}</span>
                  </div>
                  <p className="mt-2 text-sm text-text-primary">{report.reason}</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="secondary">Review</Button>
                    <Button size="sm" variant="secondary">Dismiss</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
