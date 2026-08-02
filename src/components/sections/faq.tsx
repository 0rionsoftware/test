import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

const faqs: AccordionItem[] = [
  {
    question: "Are you a software product or an agency?",
    answer:
      "Neither, exactly. We build custom automations on your infrastructure and stay on to maintain them. You own the code and the accounts — if you fire us, everything keeps running.",
  },
  {
    question: "What happens to our data?",
    answer:
      "It stays in your systems. We work inside your cloud accounts and your vendor contracts wherever possible. We do not train models on your data, and we do not resell or aggregate it. Data handling terms are agreed before the teardown, not after.",
  },
  {
    question: "What if the AI gets something wrong?",
    answer:
      "It will, which is why nothing ships on full autopilot. Every automation launches behind a human approval gate, and we measure disagreement rates against your team during calibration. The gate only opens on the steps where the numbers justify it, and anything ambiguous keeps escalating to a person indefinitely.",
  },
  {
    question: "How small is too small?",
    answer:
      "If the process you want automated takes your team less than about five hours a week, a build will not pay for itself. Tell us anyway — sometimes the answer is a two-hour configuration change in a tool you already own, and we would rather say that than sell you a project.",
  },
  {
    question: "Our data is a mess. Is that a dealbreaker?",
    answer:
      "No. It is the normal starting condition, and the teardown is largely about finding where the mess actually blocks automation versus where it just looks bad. We will tell you honestly if cleanup has to come first.",
  },
  {
    question: "Why is there a waitlist?",
    answer:
      "Because installs need senior attention, and we would rather run a handful of builds properly than a pile of them badly. Slots open in batches. Joining costs you nothing and gets you the teardown offer first.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-base-800/70 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-brass-400 uppercase">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-balance text-base-100 sm:text-4xl">
            The questions we get asked first.
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
