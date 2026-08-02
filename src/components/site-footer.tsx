import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-base-800/70 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="size-6" />
            <span className="font-semibold tracking-tight text-base-100">
              {site.name}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-base-400">{site.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 text-sm sm:items-end">
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-base-400 transition-colors hover:text-base-100"
          >
            {site.contactEmail}
          </a>
          <p className="text-base-400">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
