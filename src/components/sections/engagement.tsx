import { Check } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { WaitlistForm } from "@/components/waitlist-form";

// PLACEHOLDER PRICING — set these to your real numbers before launch.
const tiers = [
  {
    name: "Teardown",
    price: "$4k",
    cadence: "one-off",
    body: "One process, mapped end to end. Costed, with a build recommendation.",
    features: [
      "Two days on-site or remote",
      "Process map and exception inventory",
      "Automation feasibility scoring",
      "Credited against a build if you proceed",
    ],
    featured: false,
  },
  {
    name: "Install",
    price: "$18k–45k",
    cadence: "per automation",
    body: "Scoped, built, calibrated, and handed over running. Fixed price, agreed up front.",
    features: [
      "Eight-week build cycle",
      "Runs against your live systems",
      "Human approval gate until accuracy is proven",
      "Documentation and team training",
      "30-day post-launch tuning included",
    ],
    featured: true,
  },
  {
    name: "Retainer",
    price: "$2.5k",
    cadence: "per month",
    body: "We own it after launch. API changes, drift, volume spikes, new edge cases.",
    features: [
      "Monitoring and incident response",
      "Monthly hours-saved reporting",
      "Unlimited minor changes",
      "Priority slot for the next build",
    ],
    featured: false,
  },
];

export function Engagement() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-base-800/70 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-brass-400 uppercase">
            Engagement
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-balance text-base-100 sm:text-4xl">
            Priced like a build, not a subscription.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-base-400">
            You are buying an outcome and someone to own it. No seats, no usage meter, no
            surprise invoice when volume grows.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={
                  tier.featured
                    ? "h-full rounded-xl border border-brass-500/40 bg-gradient-to-b from-brass-500/[0.07] to-transparent p-8"
                    : "h-full rounded-xl border border-base-800 bg-base-900/40 p-8"
                }
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-base-100">{tier.name}</h3>
                  {tier.featured && (
                    <span className="rounded-full bg-brass-400/15 px-2.5 py-1 font-mono text-[10px] tracking-wider text-brass-300 uppercase">
                      Most common
                    </span>
                  )}
                </div>

                <p className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-base-100">
                    {tier.price}
                  </span>
                  <span className="text-sm text-base-400">{tier.cadence}</span>
                </p>

                <p className="mt-4 text-sm leading-relaxed text-base-400">{tier.body}</p>

                <ul className="mt-6 space-y-3 border-t border-base-800 pt-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-base-300">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-brass-400"
                        strokeWidth={2.5}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-xl text-center">
          <p className="mb-4 text-base-400">
            Ten build slots for Q1. Join the list to get first refusal on one.
          </p>
          <WaitlistForm source="pricing" size="sm" />
        </Reveal>
      </div>
    </section>
  );
}
