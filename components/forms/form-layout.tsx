import type { ReactNode } from "react";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function FormShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <FieldGroup className={cn("gap-5", className)}>{children}</FieldGroup>;
}

export function FormGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 max-md:grid-cols-1", className)}>
      {children}
    </div>
  );
}

export function FormActions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2 pt-1", className)}>{children}</div>
  );
}
