import { Reveal, TextReveal } from "@/components/ui/reveal";
import { Glow } from "@/components/ui/glow";
import { WaitlistForm } from "@/components/waitlist-form";
import { WaitlistCount } from "@/components/waitlist-count";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade-bottom opacity-70" />
      <Glow className="-top-32 left-1/2 h-[420px] w-[680px] -translate-x-1/2" />

      <div className="relative container-page">
        <Reveal direction="none">
          <a
            href="#waitlist"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 py-1.5 pr-4 pl-1.5 text-sm text-content-body backdrop-blur transition-colors hover:border-border-accent/50 hover:bg-surface-raised/70"
          >
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-contrast">
              Now
            </span>
            Onboarding our first cohort
          </a>
        </Reveal>

        <TextReveal
          text="Your team is the integration layer. Let's fix that."
          highlight={["integration", "layer"]}
          delay={0.15}
          className="mt-8 max-w-3xl text-display font-semibold text-content"
        />

        <Reveal delay={0.5} className="mt-7 max-w-xl">
          <p className="text-lg leading-relaxed text-content-muted">
            Millwright builds the AI automations that run the work your team currently
            does by hand — intake, triage, data entry, follow-up, reporting. We scope it,
            build it, and keep it running. You get the hours back.
          </p>
        </Reveal>

        <Reveal delay={0.62} className="mt-10 max-w-xl">
          <div id="waitlist" className="scroll-mt-28">
            <WaitlistForm source="hero" />
            <p className="mt-3 text-sm text-content-muted">
              No spam, no drip sequence. One email when your slot opens.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.74} className="mt-10">
          <WaitlistCount />
        </Reveal>
      </div>
    </section>
  );
}
