export const site = {
  name: "Millwright",
  domain: "usemillwright.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usemillwright.com",
  tagline: "We build the machinery your business runs on.",
  description:
    "Millwright designs, installs, and maintains AI automations for the operational work your team does by hand — intake, triage, data entry, follow-up, reporting.",
  contactEmail: "hello@usemillwright.com",
  social: {
    x: "https://x.com/usemillwright",
    linkedin: "https://www.linkedin.com/company/usemillwright",
  },
} as const;
