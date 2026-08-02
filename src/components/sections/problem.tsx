import { GitBranch, UserX, Wrench } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const failures = [
  {
    icon: GitBranch,
    title: "The exceptions win",
    body: "The demo runs on the happy path. Your actual process is a thicket of special cases, and the automation meets all of them in week one.",
  },
  {
    icon: UserX,
    title: "Nobody owns it",
    body: "The pilot ships, the champion moves to the next priority, and within a quarter nobody can say whether it's still working or who to ask.",
  },
  {
    icon: Wrench,
    title: "It rots quietly",
    body: "A vendor changes an API. Your process changes. Volume triples. Nothing errors loudly — the output just gets worse until someone notices.",
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
          {failures.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title} className="bg-base-950 p-8">
              <Icon className="size-5 text-brass-400" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-medium text-base-100">{title}</h3>
              <p className="mt-3 leading-relaxed text-base-400">{body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-10">
          <p className="max-w-2xl text-base-400">
            None of these are model problems. They are ownership problems, which is why we
            price the maintenance, not the software.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
