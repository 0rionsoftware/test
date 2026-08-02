import { Glow } from "@/components/ui/glow";
import { Reveal } from "@/components/ui/reveal";
import { WaitlistForm } from "@/components/waitlist-form";

export function Cta() {
  return (
    <section className="relative overflow-hidden border-t border-base-800/70 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
      <Glow className="bottom-[-180px] left-1/2 h-[340px] w-[600px] -translate-x-1/2" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-[-0.025em] text-balance text-base-100 sm:text-5xl">
            Find out what your team would stop doing.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-base-400">
            Join the waitlist and we will send you the teardown checklist we use on the
            first call — the one that finds the automatable hours. It is useful whether or
            not you ever hire us.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <WaitlistForm source="footer-cta" />
        </Reveal>
      </div>
    </section>
  );
}
