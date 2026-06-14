import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
  className?: string;
}

export default function Background({ children, className }: BackgroundProps) {
  return (
    <div
      className={cn(
        "h-full w-full overflow-y-auto overscroll-none relative",
        className,
      )}
    >
      <div className="w-full h-full -z-10 a absolute inset-0  backdrop-blur-2xl opacity-60" />
      {children}
    </div>
  );
}
