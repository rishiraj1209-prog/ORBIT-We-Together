"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { APP_ROUTES } from "@/lib/constants/app";
import { UserAvatar } from "@/components/ui/user-avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import { cn } from "@/lib/utils/cn";

interface ConversationPreview {
  id: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  participants: Array<{
    uid: string;
    displayName: string;
    photoURL: string | null;
    isOnline?: boolean;
  }>;
}

export function MessagesView() {
  const [conversations, setConversations] = useState<ConversationPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/conversations")
      .then((r) => r.json())
      .then((d) => setConversations(d.conversations ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-16"><AuthSpinner /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Messages</h1>
        <p className="mt-1 text-text-secondary">Your conversations with alumni</p>
      </div>

      {conversations.length === 0 ? (
        <EmptyState icon={MessageSquare} title="No messages yet" description="Start a conversation from someone's profile." />
      ) : (
        <div className="divide-y divide-border rounded-xl border border-border bg-surface">
          {conversations.map((conv) => {
            const participant = conv.participants[0];
            return (
              <Link
                key={conv.id}
                href={APP_ROUTES.conversation(conv.id)}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-surface-elevated"
              >
                <UserAvatar
                  name={participant?.displayName ?? "Member"}
                  photoURL={participant?.photoURL}
                  showOnline
                  isOnline={participant?.isOnline}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={cn("font-medium", conv.unreadCount > 0 ? "text-text-primary" : "text-text-secondary")}>
                      {participant?.displayName}
                    </p>
                    {conv.lastMessageAt && (
                      <span className="text-xs text-text-tertiary">
                        {new Date(conv.lastMessageAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-text-secondary">{conv.lastMessage}</p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                    {conv.unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
