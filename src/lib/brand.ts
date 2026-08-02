/**
 * Brand primitives for contexts that cannot read CSS custom properties:
 * next/og renders the OG image and favicon server-side with no stylesheet,
 * and the theme-colour meta tag must be a literal string.
 *
 * These values mirror the primitives in src/app/globals.css. That file is the
 * source of truth for anything rendered in the browser — change a value there
 * and mirror it here. No other file should contain a colour literal.
 */
export const brand = {
  canvas: "#08090a",
  surface: "#0d0f11",
  border: "#191d20",
  borderStrong: "#24292e",
  content: "#e9edf1",
  contentBody: "#a4adb6",
  contentMuted: "#8b959f",
  contentSubtle: "#626c76",
  accent: "#e8a83d",
  accentStrong: "#d99425",
  accentDeep: "#b47818",
} as const;

/** Accent at a given alpha, for glows and washes. */
export function accentAlpha(alpha: number): string {
  return `rgba(232, 168, 61, ${alpha})`;
}
