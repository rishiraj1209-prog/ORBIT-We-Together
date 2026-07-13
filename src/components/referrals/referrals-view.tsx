"use client";

import { useEffect, useState } from "react";
import { Copy, Gift, Trophy, Users } from "lucide-react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/ui/stat-card";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import type { Achievement, LeaderboardEntry, ReferralStats } from "@/types/referral";

export function ReferralsView() {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/referrals")
      .then((r) => r.json())
      .then((d) => {
        setStats(d.stats);
        setLeaderboard(d.leaderboard ?? []);
        setAchievements(d.achievements ?? []);
        setInviteLink(d.inviteLink ?? "");
      })
      .finally(() => setLoading(false));
  }, []);

  function copyLink() {
    void navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return <div className="flex justify-center py-16"><AuthSpinner /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Referral Dashboard</h1>
        <p className="mt-1 text-text-secondary">Invite alumni and climb the leaderboard</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total referrals" value={stats?.totalReferrals ?? 0} icon={Users} />
        <StatCard label="Converted" value={stats?.convertedReferrals ?? 0} change="Active members" icon={Gift} />
        <StatCard label="Your rank" value={`#${stats?.rank ?? "-"}`} icon={Trophy} />
        <StatCard label="Points earned" value={stats?.points ?? 0} icon={Trophy} />
      </div>

      <Card className="border-accent/20 bg-gradient-to-br from-accent-subtle/30 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-accent" /> Your invite link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <code className="flex-1 truncate rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-secondary">
              {inviteLink}
            </code>
            <Button onClick={copyLink} className="gap-2 shrink-0">
              <Copy className="h-4 w-4" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <p className="mt-3 text-xs text-text-tertiary">
            Referral code: <span className="font-mono font-medium text-accent">{stats?.referralCode}</span>
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Leaderboard</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {leaderboard.slice(0, 8).map((entry) => (
              <div key={entry.uid} className="flex items-center gap-3 rounded-lg p-2 hover:bg-surface-elevated">
                <span className="w-6 text-center text-sm font-bold text-text-tertiary">#{entry.rank}</span>
                <UserAvatar name={entry.displayName} photoURL={entry.photoURL} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-text-primary">{entry.displayName}</p>
                  <p className="text-xs text-text-secondary">{entry.referralCount} referrals</p>
                </div>
                <Badge variant="accent">{entry.points} pts</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.unlocked ? "bg-accent-subtle text-accent" : "bg-surface-elevated text-text-tertiary"}`}>
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${a.unlocked ? "text-text-primary" : "text-text-tertiary"}`}>{a.title}</p>
                  <p className="text-xs text-text-secondary">{a.description}</p>
                  {!a.unlocked && a.maxProgress && (
                    <Progress value={a.progress ?? 0} max={a.maxProgress} className="mt-2 h-1" />
                  )}
                </div>
                {a.unlocked && <Badge variant="success">Unlocked</Badge>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
