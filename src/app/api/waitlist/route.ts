import { NextResponse } from "next/server";

import { sendWelcomeEmail } from "@/lib/waitlist/notify";
import { clientKey, rateLimit, sweep } from "@/lib/waitlist/rate-limit";
import { isDisposable, normalizeEmail, signupSchema } from "@/lib/waitlist/schema";
import { getStore, MissingSchemaError, NoDurableStoreError } from "@/lib/waitlist/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The count is public and changes slowly, so serve it from memory. Without
 * this, every page load — and every scripted request — costs a COUNT(*)
 * against Postgres, which is free amplification for anyone hammering the
 * endpoint.
 */
const COUNT_TTL_MS = 60_000;
let countCache: { value: number; expiresAt: number } | null = null;

/**
 * Reject oversized bodies before `request.json()` buffers them into memory.
 * A real signup is a few hundred bytes; without this cap the rate limiter
 * still allows several very large payloads per IP per minute, which is free
 * memory pressure on a serverless instance.
 */
const MAX_BODY_BYTES = 16 * 1024;

export async function POST(request: Request) {
  sweep();

  const limit = rateLimit(clientKey(request.headers));
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request body too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    // Guard against a body that lies about (or omits) its Content-Length.
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request body too large." }, { status: 413 });
    }
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check your details and try again." },
      { status: 400 },
    );
  }

  const { email, company, useCase, source, website } = parsed.data;

  // Honeypot tripped — respond with success so bots do not learn anything.
  if (website) {
    return NextResponse.json({ ok: true, position: 0, alreadyJoined: false });
  }

  const normalized = normalizeEmail(email);
  if (isDisposable(normalized)) {
    return NextResponse.json(
      { error: "Please use a work email address." },
      { status: 400 },
    );
  }

  try {
    const { created, position } = await getStore().add({
      email: normalized,
      company: company || null,
      useCase: useCase || null,
      source: source || null,
      referrer: request.headers.get("referer"),
      createdAt: new Date().toISOString(),
    });

    if (created) {
      countCache = null;
      await sendWelcomeEmail(normalized, position);
    }

    return NextResponse.json({ ok: true, position, alreadyJoined: !created });
  } catch (error) {
    if (error instanceof MissingSchemaError) {
      console.error(`[waitlist] Signup rejected: ${error.message}`);
      return NextResponse.json(
        {
          error:
            "Our waitlist isn't accepting signups just yet. Email us and we'll add you by hand.",
        },
        { status: 503 },
      );
    }

    if (error instanceof NoDurableStoreError) {
      console.error(
        "[waitlist] Signup rejected: DATABASE_URL is not set on this deployment.",
      );
      return NextResponse.json(
        {
          error:
            "Our waitlist isn't accepting signups just yet. Email us and we'll add you by hand.",
        },
        { status: 503 },
      );
    }

    console.error("[waitlist] Signup failed:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Try again in a moment." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const now = Date.now();
  if (countCache && now < countCache.expiresAt) {
    return NextResponse.json({ count: countCache.value });
  }

  // Only uncached requests can reach the database, so the limiter guards the
  // expensive path rather than the cheap one.
  sweep();
  if (!rateLimit(`count:${clientKey(request.headers)}`).ok) {
    return NextResponse.json({ count: countCache?.value ?? 0 });
  }

  try {
    const value = await getStore().count();
    countCache = { value, expiresAt: now + COUNT_TTL_MS };
    return NextResponse.json({ count: value });
  } catch (error) {
    // Includes the no-database and missing-schema cases: report zero so the
    // page renders its fallback copy instead of a broken social-proof number.
    console.error("[waitlist] Count failed:", error);
    return NextResponse.json({ count: 0 });
  }
}
