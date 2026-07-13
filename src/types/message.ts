export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  read: boolean;
  aiAssisted?: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  typing?: string[];
  onlineStatus?: Record<string, boolean>;
}

export interface ConversationPreview extends Conversation {
  participants: Array<{
    uid: string;
    displayName: string;
    photoURL: string | null;
    isOnline?: boolean;
  }>;
}
