# Millwright

Landing page and waitlist for **Millwright** — an AI automation service that scopes,
builds, and maintains automations on a client's existing systems.

> _"We build the machinery your business runs on."_

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · `motion` · TypeScript

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — the app runs without it
npm run dev
```

Open http://localhost:3000. With no `DATABASE_URL` set, waitlist signups are written to
`.data/waitlist.json` (gitignored) so local development works with zero setup.

## The waitlist

Three entry points on the page (hero, pricing, closing CTA) all post to a single
endpoint. Each signup records which section it came from, so you can see what actually
converts.

### `POST /api/waitlist`

```jsonc
// request
{ "email": "you@company.com", "company": "Acme", "source": "hero" }

// 200
{ "ok": true, "position": 42, "alreadyJoined": false }

// 400 — validation failed
{ "error": "Enter a valid email address." }

// 429 — more than 5 attempts from one IP in 60s
{ "error": "Too many attempts. Try again in a minute." }
```

### `GET /api/waitlist`

Returns `{ "count": 42 }`. The hero uses it for social proof, but only renders the
number once it clears a threshold (default 25) — an empty waitlist is worse than no
number at all. Below the threshold it falls back to a positioning line.

### What's built in

| Concern | Handling |
| --- | --- |
| Validation | zod, server-side; the client never decides what's valid |
| Duplicates | Emails normalised before storage — `Dana.Reed+launch@gmail.com` and `danareed@gmail.com` collapse to one row |
| Bots | Hidden honeypot field. Tripping it returns a **fake success** so the bot learns nothing |
| Disposable addresses | Blocklist of common throwaway domains |
| Abuse | 5 requests per IP per minute, in-memory fixed window |
| Email | Optional Resend welcome email; a provider outage never fails a signup |

## Going to production

### 1. Set a database

The file store is **not** safe on serverless — the filesystem is ephemeral and
per-instance, so signups would be silently lost. Set `DATABASE_URL` to any Postgres
connection string (Neon, Supabase, Vercel Postgres, RDS, self-hosted) and the app
switches over automatically. The `waitlist` table is created on first write, so there is
no migration step.

To read your signups:

```sql
SELECT email, company, source, created_at FROM waitlist ORDER BY created_at;
```

### 2. Turn on the welcome email (optional)

Set `RESEND_API_KEY` and `RESEND_FROM`. Until both are set, the send is skipped and
signups still succeed. Copy lives in `src/lib/waitlist/notify.ts`.

### 3. Replace the placeholder content

These are **invented numbers, written to be replaced** — do not ship them as-is:

- `src/components/sections/problem.tsx` — the three "cost of the gap" stats. Substitute
  figures you can source and cite.
- `src/components/sections/engagement.tsx` — all pricing.
- `src/lib/site.ts` — domain, contact email, social handles.

### 4. Point at your domain

Set `NEXT_PUBLIC_SITE_URL` and update `site.url` in `src/lib/site.ts`. This drives
metadata, Open Graph tags, `robots.txt`, and the sitemap.

## Skiper UI

The page is built on the stack Skiper UI targets — Tailwind v4, `motion`, and a `cn`
helper — and `components.json` is configured with the Skiper registry:

```json
"registries": { "@skiper-ui": "https://skiper-ui.com/r/{name}.json" }
```

So you can pull components straight in:

```bash
npx shadcn@latest add @skiper-ui/skiper40
```

**Note:** `skiper-ui.com` was unreachable from the sandbox this was built in (blocked by
the environment's network policy), so no registry component could be installed or
verified here. The motion primitives in `src/components/ui/` are hand-written in the same
idiom as a stand-in:

| File | Component |
| --- | --- |
| `reveal.tsx` | `Reveal`, `RevealGroup` / `RevealItem`, `TextReveal` |
| `spotlight-card.tsx` | Cursor-tracking glow card |
| `marquee.tsx` | Seamless infinite ticker |
| `accordion.tsx` | Animated FAQ accordion |
| `number-ticker.tsx` | Count-up on scroll |
| `glow.tsx` | Ambient glow, hairline rule |

Each is a self-contained file consuming only `cn` and `motion`, so swapping one for the
real Skiper equivalent is a per-file replacement — nothing else needs to change. Verify
the registry URL against the current Skiper docs before your first `add`.

## Accessibility and motion

Every animation is gated on `prefers-reduced-motion` (via `useReducedMotion` and a CSS
media query in `globals.css`). The form has real labels, `aria-invalid`, `role="alert"`
on errors, and `role="status"` on success. There's a skip link, and the honeypot is
`aria-hidden` and removed from the tab order.

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run lint    # eslint
npx tsc --noEmit
```
