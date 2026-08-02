import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="size-6" />
            <span className="font-semibold tracking-tight text-content">
              {site.name}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-content-muted">{site.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 text-sm sm:items-end">
          <a
            href={`mailto:${site.contactEmail}`}
            className="focus-ring rounded-md text-content-muted transition-colors hover:text-content"
          >
            {site.contactEmail}
          </a>
          <p className="text-content-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
