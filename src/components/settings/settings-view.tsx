"use client";

import { Bell, Lock, Palette, User } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AuthUser } from "@/types/auth";

interface SettingsViewProps {
  user: AuthUser;
}

export function SettingsView({ user }: SettingsViewProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Settings</h1>
        <p className="mt-1 text-text-secondary">Manage your account preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4" /> Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user.email ?? ""} disabled />
          </div>
          <div className="space-y-2">
            <Label>Display name</Label>
            <Input value={user.displayName ?? ""} disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="h-4 w-4" /> Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">Theme</p>
            <p className="text-xs text-text-secondary">Switch between light and dark mode</p>
          </div>
          <ThemeToggle />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Connection requests", "Messages", "Introduction updates", "Event reminders", "Referral activity"].map((item) => (
            <label key={item} className="flex items-center justify-between">
              <span className="text-sm text-text-primary">{item}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border accent-accent" />
            </label>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lock className="h-4 w-4" /> Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="secondary">Change password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
