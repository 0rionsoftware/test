import {
  ClipboardCheck,
  FileSearch,
  Inbox,
  LineChart,
  PhoneCall,
  Workflow,
} from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const capabilities = [
  {
    icon: Inbox,
    title: "Inbox and ticket triage",
    body: "Classify, route, and draft replies for high-volume queues. Escalates the ambiguous ones to a human instead of guessing.",
  },
  {
    icon: FileSearch,
    title: "Document intake",
    body: "Pull structured data out of invoices, POs, claims, and contracts — including the scanned ones — straight into your system of record.",
  },
  {
    icon: Workflow,
    title: "Cross-system sync",
    body: "Keep CRM, ERP, and billing in agreement without a nightly CSV and someone's Tuesday morning.",
  },
  {
    icon: PhoneCall,
    title: "Follow-up that happens",
    body: "Chase the quote, the renewal, the missing document, the unpaid invoice. Every time, on schedule, in your voice.",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance checks",
    body: "Review submissions against your policy before they go out. Flags exceptions with the rule they broke and the evidence.",
  },
  {
    icon: LineChart,
    title: "Reporting on autopilot",
    body: "The weekly numbers someone currently assembles by hand, built and sent before the meeting starts.",
  },
];

export function Capabilities() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-base-800/70 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-brass-400 uppercase">
            What we automate
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-balance text-base-100 sm:text-4xl">
            The unglamorous work that eats your week.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-base-400">
            We are not building you a chatbot. We are removing the six recurring tasks
            that quietly consume a third of your team&apos;s capacity.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title}>
              <SpotlightCard className="h-full">
                <Icon className="size-5 text-brass-400" strokeWidth={1.75} />
                <h3 className="mt-4 font-medium text-base-100">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-400">{body}</p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
