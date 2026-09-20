import { cn } from "cn";

export function CategoryDot({
  color,
  size = "md",
}: {
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  };

  return (
    <span
      className={cn(
        sizeClasses[size] || sizeClasses.sm,
        "shrink-0 rounded-full",
      )}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}
