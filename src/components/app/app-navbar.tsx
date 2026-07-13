"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { APP_ROUTES } from "@/lib/constants/app";
import { getDefaultNotifications } from "@/lib/data/notifications";
import type { AppNotification } from "@/types/notification";
import type { AuthUser } from "@/types/auth";
import { cn } from "@/lib/utils/cn";

interface NotificationsPanelProps {
  userId: string;
}

export function NotificationsPanel({ userId }: NotificationsPanelProps) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    getDefaultNotifications(userId)
  );
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs text-accent hover:text-accent-hover"
              >
                <Check className="h-3 w-3" />
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <Link
                key={notif.id}
                href={notif.href ?? "#"}
                onClick={() => {
                  markRead(notif.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex flex-col gap-0.5 border-b border-border/50 px-4 py-3 transition-colors hover:bg-surface-elevated",
                  !notif.read && "bg-accent-subtle/30"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-text-primary">{notif.title}</p>
                  {!notif.read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  )}
                </div>
                <p className="text-xs text-text-secondary">{notif.body}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface UserMenuProps {
  user: AuthUser;
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-surface-elevated"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <UserAvatar
          name={user.displayName ?? "User"}
          photoURL={user.photoURL}
          size="sm"
          showOnline
          isOnline
        />
        <span className="hidden text-sm font-medium text-text-primary md:block">
          {user.displayName?.split(" ")[0]}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-2xl">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium text-text-primary">
              {user.displayName}
            </p>
            <p className="text-xs text-text-secondary truncate">{user.email}</p>
          </div>
          <Link
            href={APP_ROUTES.profile(user.uid)}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
          >
            Your profile
          </Link>
          <Link
            href={APP_ROUTES.profileEdit}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
          >
            Edit profile
          </Link>
          <Link
            href={APP_ROUTES.settings}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
          >
            Settings
          </Link>
          {user.role === "admin" && (
            <Link
              href={APP_ROUTES.admin}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
            >
              Admin dashboard
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
