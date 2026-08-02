import { site } from "@/lib/site";

/**
 * Sends the welcome email via Resend. No-ops unless RESEND_API_KEY and
 * RESEND_FROM are set, so the waitlist works before email is configured.
 * Failures are logged, never surfaced — a signup should not fail because
 * the email provider is down.
 */
export async function sendWelcomeEmail(email: string, position: number) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: email,
        subject: `You're on the ${site.name} waitlist`,
        text: [
          `You're #${position} on the list.`,
          "",
          `${site.name} installs and maintains the AI automations your team currently runs by hand.`,
          "",
          "We're onboarding in small batches so every install gets built properly. When your slot opens we'll email you to book a scoping call — no pitch, just a walk through the workflows you'd hand over first.",
          "",
          "Worth doing now: reply to this email with the one process that eats the most hours in your week. It moves you up the queue, because it tells us what to build next.",
          "",
          `— The ${site.name} team`,
          site.url,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("[waitlist] Resend rejected the email:", await response.text());
    }
  } catch (error) {
    console.error("[waitlist] Failed to send welcome email:", error);
  }
}
