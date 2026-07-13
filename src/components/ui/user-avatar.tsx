import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils/cn";

interface UserAvatarProps {
  name: string;
  photoURL?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showOnline?: boolean;
  isOnline?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const onlineSizeClasses = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
  xl: "h-4 w-4",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function UserAvatar({
  name,
  photoURL,
  size = "md",
  className,
  showOnline,
  isOnline,
}: UserAvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <Avatar className={sizeClasses[size]}>
        {photoURL && <AvatarImage src={photoURL} alt={name} />}
        <AvatarFallback className="bg-accent-subtle font-medium text-accent">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {showOnline && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-surface",
            onlineSizeClasses[size],
            isOnline ? "bg-success" : "bg-text-tertiary"
          )}
          aria-label={isOnline ? "Online" : "Offline"}
        />
      )}
    </div>
  );
}
