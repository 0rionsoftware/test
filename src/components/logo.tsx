import { cn } from "@/lib/utils";

/**
 * Millwright mark: a gear tooth ring around a plumb-line centre — the
 * millwright's two tools, alignment and rotation.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("text-accent", className)}
    >
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.45"
      />
      <circle cx="16" cy="16" r="6.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="16" cy="16" r="1.75" fill="currentColor" />
      <path
        d="M16 4.5v3.25M16 24.25v3.25M27.5 16h-3.25M7.75 16H4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
