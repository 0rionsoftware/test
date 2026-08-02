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

A `503` means the deployment has no `DATABASE_URL`. The API refuses the signup rather
than accepting one it cannot store — see [Set a database](#1-set-a-database).

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

**Required — the waitlist is inert without it.** Set `DATABASE_URL` to any Postgres
connection string (Neon, Supabase, Vercel Postgres, RDS, self-hosted), then apply the
schema once:

```bash
psql "$DATABASE_URL" -f migrations/001_waitlist.sql
```

Point `DATABASE_URL` at a role with `SELECT, INSERT` on `waitlist` and nothing else —
the grants are at the bottom of that migration file. The app never needs `UPDATE`,
`DELETE`, or `CREATE`, so a leaked connection string cannot erase or reshape your list.

For throwaway environments, `WAITLIST_AUTO_MIGRATE=1` lets the app create the table
itself, at the cost of requiring DDL rights permanently. It is on by default in
development and off in production.

The local JSON file store is a development convenience only. On serverless the
filesystem is ephemeral and per-instance, so using it in production would accept a
signup, report success, and lose the row. Rather than do that, `getStore()` throws in
production when no connection string is set and the endpoint returns a `503` telling the
visitor to email instead. Set the variable and the endpoint starts working immediately —
no code change.

To read your signups:

```sql
SELECT email, company, source, created_at FROM waitlist ORDER BY created_at;
```

### 2. Turn on the welcome email (optional)

Set `RESEND_API_KEY` and `RESEND_FROM`. Until both are set, the send is skipped and
signups still succeed. Copy lives in `src/lib/waitlist/notify.ts`.

### 3. Content you still own

The page deliberately contains **no statistics and no prices**, because inventing either
pre-launch is worse than omitting them. What's left for you:

- `src/components/sections/engagement.tsx` — describes the *shape* of each commercial
  stage ("Fixed fee", "Fixed price", "Flat monthly"). Add a `price` field per stage once
  you've set real rates.
- `src/lib/site.ts` — domain, contact email, social handles.
- `src/components/sections/faq.tsx` — the data-handling answer commits you to not
  training on client data and to working inside their cloud accounts. Keep it only if
  you'll honour it.

If you later add stats to `problem.tsx`, cite them.

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

## Design system

Two token layers in `src/app/globals.css`:

- **Primitives** — the raw ramps (`--color-base-*`, `--color-brass-*`). Components never
  reference these.
- **Semantics** — what a thing *is*: `canvas`, `surface`, `border`, `content`,
  `content-muted`, `accent`, `danger`, `success`, `focus-ring`. Components use only
  these, so a rebrand is an edit to one file.

Also tokenised: fluid type (`text-display`, `text-title`, `text-title-lg`,
`text-eyebrow`), section rhythm (`py-section`, `py-section-lg`), and the page gutter
(`container-page`, `px-gutter`).

Two rules worth keeping:

1. **No colour literal outside `globals.css` and `src/lib/brand.ts`.** `brand.ts` exists
   only for `next/og` and the theme-colour meta tag, which cannot read CSS. The two files
   mirror each other — change one, change the other.
2. **New `--text-*` or `--color-*` tokens must be registered in `src/lib/utils.ts`.**
   tailwind-merge classifies unknown classes by prefix, so it cannot tell `text-display`
   (a size) from `text-content` (a colour) and will silently drop one when both go
   through `cn()`. That is a real bug this codebase has already hit.

Every interactive element carries the `focus-ring` utility rather than its own
`focus-visible:` chain, so keyboard focus is consistent and cannot be forgotten on a new
control.

## Security posture

What's in place, and what is deliberately left to you:

- **Secrets** never reach the client. `DATABASE_URL` and `RESEND_API_KEY` are read at
  runtime in server-only modules; only `NEXT_PUBLIC_*` is exposed. Verified by building
  with canary values and grepping `.next/static` and the build log.
- **SQL** goes through `postgres.js` tagged templates, so every value is parameterised.
  There is no string-built SQL anywhere.
- **Database role** should be least-privilege — see [Set a database](#1-set-a-database).
- **Validation** is server-side (zod) with length caps on every field. The client's
  `required` and `type="email"` are UX only.
- **Request bodies** over 16 KB are rejected before parsing, by `Content-Length` and
  again by actual length so a chunked body cannot slip past.
- **Rate limiting** is 5 requests per IP per minute on signup, and on the uncached path
  of the count endpoint. The limiter is in-memory and therefore per-instance; move it to
  Upstash or Redis if you need a hard global bound.
- **The count endpoint** is cached for 60s and invalidated on new signups, so page loads
  and scripted requests do not each cost a `COUNT(*)`.
- **Errors** return generic messages to the client and log details server-side. Verified
  that a bad connection string does not surface credentials in logs.
- **Headers**: CSP, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`,
  `Permissions-Policy`, HSTS. `X-Powered-By` is off. See `next.config.ts`.
- **No auth, sessions, uploads, or admin routes** exist, so those attack surfaces are
  absent rather than protected. The only way to read the list is direct database access.

### Known trade-off: signup status is observable

`POST /api/waitlist` returns `alreadyJoined` and a queue position, so someone can probe
whether a specific address is on the list. Rate limiting slows bulk enumeration but does
not prevent targeted checks — a competitor could test a list of known companies. It is
kept because "you're already on the list" and "#42 in the queue" both help conversion.

To close it, return a constant response from the signup handler regardless of outcome
and move the real status into the welcome email, which only the address owner can read.
That means dropping the queue position from the success state in `waitlist-form.tsx`.

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
