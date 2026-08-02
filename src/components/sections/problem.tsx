import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

// PLACEHOLDER FIGURES — replace with numbers you can source and cite before
// this page goes live. Unsourced stats on a landing page are a liability.
const costs = [
  {
    stat: "18 hrs",
    label: "per employee, per week",
    body: "Time spent moving data between systems that were never designed to talk to each other.",
  },
  {
    stat: "6–9 mo",
    label: "typical internal build",
    body: "What it takes an in-house team to ship an automation that survives contact with real edge cases.",
  },
  {
    stat: "70%",
    label: "of pilots never ship",
    body: "AI proofs-of-concept that demo well, then die because nobody owns them after launch week.",
  },
];

export function Problem() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-brass-400 uppercase">
            The gap
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-balance text-base-100 sm:text-4xl">
            Buying AI software is easy. Getting it to run your actual operation is not.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-base-400">
            Every tool assumes a clean process, tidy data, and someone in-house to
            maintain it. Real operations have none of those. That gap is where automation
            projects go to die — and it is the only thing we work on.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-xl border border-base-800 bg-base-800 sm:grid-cols-3">
          {costs.map((cost) => (
            <RevealItem key={cost.stat} className="bg-base-950 p-8">
              <p className="font-mono text-3xl font-medium text-brass-400">{cost.stat}</p>
              <p className="mt-1 text-sm text-base-400">{cost.label}</p>
              <p className="mt-4 text-base-300">{cost.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
