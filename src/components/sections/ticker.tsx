import { Marquee } from "@/components/ui/marquee";

const stack = [
  "Salesforce",
  "HubSpot",
  "NetSuite",
  "Snowflake",
  "Zendesk",
  "Slack",
  "Shopify",
  "QuickBooks",
  "Jira",
  "Airtable",
  "Twilio",
  "SharePoint",
  "Stripe",
  "Gmail",
];

export function Ticker() {
  return (
    <section className="border-y border-border/70 bg-surface/30 py-8">
      <p className="mb-6 text-center font-mono text-eyebrow text-content-muted uppercase">
        Built for the stack you already run
      </p>
      <Marquee className="mask-fade-edges">
        {stack.map((tool) => (
          <span
            key={tool}
            className="px-8 text-lg font-medium whitespace-nowrap text-content-muted transition-colors hover:text-content-body"
          >
            {tool}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
