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
    <section className="py-section sm:py-section-lg">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-eyebrow text-accent uppercase">
            The gap
          </p>
          <h2 className="mt-4 text-title font-semibold text-balance text-content">
            Buying AI software is easy. Getting it to run your actual operation is not.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-content-muted">
            Every tool assumes a clean process, tidy data, and someone in-house to
            maintain it. Real operations have none of those. That gap is where automation
            projects go to die — and it is the only thing we work on.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-surface-inset sm:grid-cols-3">
          {failures.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title} className="bg-canvas p-8">
              <Icon className="size-5 text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-medium text-content">{title}</h3>
              <p className="mt-3 leading-relaxed text-content-muted">{body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-10">
          <p className="max-w-2xl text-content-muted">
            None of these are model problems. They are ownership problems, which is why we
            price the maintenance, not the software.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
