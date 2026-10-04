import { cn } from "cn";
import type { CSSProperties } from "react";
import type { ReactNode } from "react";

export default function HeaderContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("z-50", className)}>
      {children}
    </header>
  );
}
