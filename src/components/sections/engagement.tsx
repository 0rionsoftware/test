import { Check } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { WaitlistForm } from "@/components/waitlist-form";

/**
 * Engagement stages. Deliberately describes the *shape* of each commercial
 * arrangement rather than quoting a figure — nothing here is priced until the
 * teardown is done, and inventing numbers pre-launch is worse than omitting
 * them. Add a `price` field per stage once you have set real rates.
 */
const stages = [
  {
    name: "Teardown",
    shape: "Fixed fee",
    cadence: "one-off",
    body: "One process, mapped end to end. Costed, with an honest build recommendation — including when the answer is not to build.",
    features: [
      "Two days with the people doing the work",
      "Process map and exception inventory",
      "Automation feasibility scoring",
      "Credited against a build if you proceed",
    ],
    featured: false,
  },
  {
    name: "Install",
    shape: "Fixed price",
    cadence: "per automation",
    body: "Scoped, built, calibrated, and handed over running. Quoted from the teardown and agreed before any work starts.",
    features: [
      "Eight-week build cycle",
      "Runs against your live systems, not a sandbox",
      "Human approval gate until accuracy is proven",
      "Documentation and team training",
      "Post-launch tuning included",
    ],
    featured: true,
  },
  {
    name: "Retainer",
    shape: "Flat monthly",
    cadence: "ongoing",
    body: "We own it after launch. API changes, process drift, volume spikes, new edge cases.",
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
            surprise invoice when volume grows. Every number is quoted from the teardown,
            in writing, before work starts.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {stages.map((stage, i) => (
            <Reveal key={stage.name} delay={i * 0.08}>
              <div
                className={
                  stage.featured
                    ? "h-full rounded-xl border border-brass-500/40 bg-gradient-to-b from-brass-500/[0.07] to-transparent p-8"
                    : "h-full rounded-xl border border-base-800 bg-base-900/40 p-8"
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-medium text-base-100">{stage.name}</h3>
                  <span className="font-mono text-xs tracking-wider text-base-400 uppercase">
                    {`0${i + 1}`}
                  </span>
                </div>

                <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-2xl font-semibold tracking-tight text-base-100">
                    {stage.shape}
                  </span>
                  <span className="text-sm text-base-400">{stage.cadence}</span>
                </p>

                <p className="mt-4 text-sm leading-relaxed text-base-400">{stage.body}</p>

                <ul className="mt-6 space-y-3 border-t border-base-800 pt-6">
                  {stage.features.map((feature) => (
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
            Build slots are limited. Join the list to get first refusal on one.
          </p>
          <WaitlistForm source="pricing" size="sm" />
        </Reveal>
      </div>
    </section>
  );
}
