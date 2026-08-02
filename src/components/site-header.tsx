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
          ? "border-b border-border/80 bg-canvas/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a
          href="#top"
          className="focus-ring flex items-center gap-2.5 rounded-md"
          aria-label="Millwright home"
        >
          <Logo className="size-7" />
          <span className="text-[15px] font-semibold tracking-tight text-content">
            Millwright
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "focus-ring rounded-md text-sm text-content-muted transition-colors",
                "hover:text-content active:text-content-body",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#waitlist"
          className={cn(
            "focus-ring rounded-lg border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-content",
            "transition-colors hover:border-border-accent hover:bg-surface-raised",
            "active:bg-surface-inset",
          )}
        >
          Request access
        </a>
      </div>
    </header>
  );
}
