import { cn } from "@/lib/utils";

/** Soft brass ambient light used behind the hero and closing CTA. */
export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[120px] animate-drift",
        "bg-accent-strong/20",
        className,
      )}
    />
  );
}

/** Thin brass rule that fades out at both ends — used as a section divider. */
export function HairlineRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-border-strong to-transparent",
        className,
      )}
    />
  );
}
