export type NotificationType =
  | "connection"
  | "message"
  | "introduction"
  | "opportunity"
  | "event"
  | "referral"
  | "system"
  | "achievement";

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  href?: string;
  read: boolean;
  createdAt: string;
}
