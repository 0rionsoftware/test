"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. Children are duplicated once and the track is
 * translated -50%, so the loop is seamless for any content width.
 */
export function Marquee({
  children,
  className,
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {children}
        <span aria-hidden className="contents">
          {children}
        </span>
      </div>
    </div>
  );
}
