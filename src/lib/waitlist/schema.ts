import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .max(320, "That email address is too long.")
    .email("Enter a valid email address."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  useCase: z.string().trim().max(600).optional().or(z.literal("")),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  /**
   * Honeypot. Bots fill it in, humans never see it. Deliberately permissive
   * here so the route can answer with a fake success rather than a validation
   * error — a 400 would tell the bot exactly which field gave it away.
   */
  website: z.string().max(200).optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;

/** Lowercase and strip Gmail-style dots/plus-tags so duplicates collapse. */
export function normalizeEmail(email: string): string {
  const trimmed = email.trim().toLowerCase();
  const [local, domain] = trimmed.split("@");
  if (!domain) return trimmed;

  if (domain === "gmail.com" || domain === "googlemail.com") {
    const base = local.split("+")[0].replace(/\./g, "");
    return `${base}@gmail.com`;
  }
  return trimmed;
}

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "throwawaymail.com",
  "yopmail.com",
  "trashmail.com",
  "sharklasers.com",
]);

export function isDisposable(email: string): boolean {
  const domain = email.split("@")[1];
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
}
