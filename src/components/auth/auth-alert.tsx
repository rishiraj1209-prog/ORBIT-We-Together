import { cn } from "@/lib/utils/cn";

type AuthAlertVariant = "error" | "success" | "info";

interface AuthAlertProps {
  variant?: AuthAlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<AuthAlertVariant, string> = {
  error: "border-error/30 bg-error-subtle text-error",
  success: "border-success/30 bg-success-subtle text-success",
  info: "border-accent/30 bg-accent-subtle text-accent",
};

export function AuthAlert({
  variant = "error",
  title,
  children,
  className,
}: AuthAlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        variantStyles[variant],
        className
      )}
    >
      {title && <p className="mb-1 font-medium">{title}</p>}
      <p className="leading-relaxed opacity-90">{children}</p>
    </div>
  );
}
