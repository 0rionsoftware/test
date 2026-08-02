"use client";

import { useEffect, useState } from "react";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#work", label: "What we automate" },
  { href: "#pricing", label: "Engagement" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-base-800/80 bg-base-950/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Millwright home">
          <Logo className="size-7" />
          <span className="text-[15px] font-semibold tracking-tight text-base-100">
            Millwright
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-base-400 transition-colors hover:text-base-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#waitlist"
          className="rounded-lg border border-base-700 bg-base-900 px-4 py-2 text-sm font-medium text-base-100 transition-colors hover:border-brass-500/60 hover:bg-base-850"
        >
          Request access
        </a>
      </div>
    </header>
  );
}
