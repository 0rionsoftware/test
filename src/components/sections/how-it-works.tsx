import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { HairlineRule } from "@/components/ui/glow";

const steps = [
  {
    n: "01",
    title: "Teardown",
    duration: "Week 1",
    body: "We sit with the people doing the work and map every step, exception, and workaround. You get the process map whether or not you hire us to build anything.",
  },
  {
    n: "02",
    title: "Install",
    duration: "Weeks 2–5",
    body: "We build the automation against your real systems and your real data — not a sandbox. It ships behind a human approval gate so nothing goes out unreviewed on day one.",
  },
  {
    n: "03",
    title: "Calibrate",
    duration: "Weeks 6–8",
    body: "We run it alongside your team, measure where it disagrees with them, and tune until it's right. The approval gate opens only when the numbers earn it.",
  },
  {
    n: "04",
    title: "Maintain",
    duration: "Ongoing",
    body: "Your vendors change their APIs, your process changes, your volume triples. We keep it running and report on what it saved you each month.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-border/70 py-section sm:py-section-lg">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-eyebrow text-accent uppercase">
            How it works
          </p>
          <h2 className="mt-4 text-title font-semibold text-balance text-content">
            A millwright installs the machine, then keeps it aligned.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-content-muted">
            Eight weeks from first conversation to an automation carrying real volume.
            Then we stay on it.
          </p>
        </Reveal>

        <RevealGroup className="mt-16">
          {steps.map((step, i) => (
            <RevealItem key={step.n}>
              {i > 0 && <HairlineRule />}
              <div className="grid gap-6 py-10 sm:grid-cols-[auto_1fr] sm:gap-12">
                <div className="flex items-start gap-4 sm:w-48">
                  <span className="font-mono text-sm text-accent">{step.n}</span>
                  <div>
                    <h3 className="text-xl font-medium text-content">{step.title}</h3>
                    <p className="mt-1 font-mono text-xs tracking-wider text-content-muted uppercase">
                      {step.duration}
                    </p>
                  </div>
                </div>
                <p className="max-w-2xl text-lg leading-relaxed text-content-muted">
                  {step.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
