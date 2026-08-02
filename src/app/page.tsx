import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Capabilities } from "@/components/sections/capabilities";
import { Cta } from "@/components/sections/cta";
import { Engagement } from "@/components/sections/engagement";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Problem } from "@/components/sections/problem";
import { Ticker } from "@/components/sections/ticker";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Ticker />
        <Problem />
        <HowItWorks />
        <Capabilities />
        <Engagement />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
