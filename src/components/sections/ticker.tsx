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
    <section className="border-y border-base-800/70 bg-base-900/30 py-8">
      <p className="mb-6 text-center font-mono text-xs tracking-[0.2em] text-base-400 uppercase">
        Wired into the tools you already run
      </p>
      <Marquee className="mask-fade-edges">
        {stack.map((tool) => (
          <span
            key={tool}
            className="px-8 text-lg font-medium whitespace-nowrap text-base-400 transition-colors hover:text-base-300"
          >
            {tool}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
