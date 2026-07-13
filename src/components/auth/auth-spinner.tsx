import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AuthSpinnerProps {
  className?: string;
  label?: string;
}

export function AuthSpinner({ className, label = "Loading" }: AuthSpinnerProps) {
  return (
    <Loader2
      className={cn("h-4 w-4 animate-spin", className)}
      aria-label={label}
    />
  );
}
