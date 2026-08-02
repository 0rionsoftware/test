"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({
  source,
  className,
  size = "lg",
}: {
  /** Which section the signup came from, stored for attribution. */
  source: string;
  className?: string;
  size?: "lg" | "sm";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<number | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          website: String(data.get("website") ?? ""),
          source,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        position?: number;
        alreadyJoined?: boolean;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setPosition(result.position ?? null);
      setMessage(
        result.alreadyJoined
          ? "You're already on the list — we'll be in touch."
          : "You're on the list.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className="flex items-center gap-3 rounded-lg border border-brass-500/40 bg-brass-500/10 px-4 py-4"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brass-400 text-base-950">
              <Check className="size-4" strokeWidth={3} />
            </span>
            <div className="text-left">
              <p className="text-sm font-medium text-base-100">{message}</p>
              <p className="text-sm text-base-400">
                {position
                  ? `You're #${position} in the queue. Check your inbox for what happens next.`
                  : "Check your inbox for what happens next."}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Honeypot — visually hidden, never announced, bots fill it in. */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor={`website-${source}`}>Leave this field empty</label>
              <input
                id={`website-${source}`}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div
              className={cn(
                "flex flex-col gap-3",
                size === "lg" ? "sm:flex-row" : "sm:flex-row",
              )}
            >
              <div className="relative flex-1">
                <label htmlFor={`email-${source}`} className="sr-only">
                  Work email
                </label>
                <input
                  id={`email-${source}`}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? `error-${source}` : undefined}
                  className={cn(
                    "w-full rounded-lg border bg-base-900/80 px-4 text-base-100 outline-none",
                    "placeholder:text-base-500",
                    "transition-colors duration-200",
                    "focus:border-brass-500 focus:ring-2 focus:ring-brass-500/25",
                    size === "lg" ? "h-13 text-base" : "h-11 text-sm",
                    status === "error" ? "border-red-500/60" : "border-base-700",
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg px-6 font-medium",
                  "bg-brass-400 text-base-950",
                  "transition-all duration-200 hover:bg-brass-300",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400",
                  "disabled:cursor-not-allowed disabled:opacity-70",
                  size === "lg" ? "h-13 text-base" : "h-11 text-sm",
                )}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Joining
                  </>
                ) : (
                  <>
                    Request access
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  id={`error-${source}`}
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-2 text-sm text-red-400"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
