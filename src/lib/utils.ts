import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge resolves conflicts by matching class names against Tailwind's
 * built-in scales. Custom theme tokens are invisible to it, so it guesses from
 * the prefix — and `text-display` (a font size) looks identical to
 * `text-content` (a colour). It treated them as the same group and silently
 * dropped one, which is why the hero heading rendered at the browser default.
 *
 * Registering the tokens tells it which group each belongs to. Anything added
 * to the --text-* or --color-* namespaces in globals.css needs a line here.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "title", "title-lg", "eyebrow"] }],
      "text-color": [
        {
          text: [
            "content",
            "content-body",
            "content-muted",
            "content-subtle",
            "accent",
            "accent-hover",
            "accent-active",
            "accent-contrast",
            "danger",
            "success",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
