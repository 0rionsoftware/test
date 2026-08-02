"use client";

import { useEffect, useState } from "react";

import { NumberTicker } from "@/components/ui/number-ticker";

/**
 * Live signup count for social proof. Renders nothing until the count is
 * meaningful — an empty waitlist is worse than no number at all.
 */
export function WaitlistCount({ threshold = 25 }: { threshold?: number }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/waitlist")
      .then((res) => res.json())
      .then((data: { count?: number }) => {
        if (!cancelled && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null || count < threshold) {
    return (
      <p className="text-sm text-base-400">
        Fixed-scope builds. Flat monthly maintenance. No per-seat pricing.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2" aria-hidden>
        {["#d99425", "#7d8791", "#363d44", "#b47818"].map((color) => (
          <span
            key={color}
            className="size-7 rounded-full border-2 border-base-950"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <p className="text-sm text-base-400">
        <NumberTicker value={count} className="font-medium text-base-100" /> teams on the
        waitlist
      </p>
    </div>
  );
}
