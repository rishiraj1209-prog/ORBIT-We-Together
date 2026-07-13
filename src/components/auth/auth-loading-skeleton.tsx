import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard } from "@/components/auth/auth-card";

export function AuthLoadingSkeleton() {
  return (
    <AuthCard>
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-11 w-full" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-11 w-full" />
      </div>
    </AuthCard>
  );
}
