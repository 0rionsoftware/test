import { NextResponse } from "next/server";

import { sendWelcomeEmail } from "@/lib/waitlist/notify";
import { clientKey, rateLimit, sweep } from "@/lib/waitlist/rate-limit";
import { isDisposable, normalizeEmail, signupSchema } from "@/lib/waitlist/schema";
import { getStore } from "@/lib/waitlist/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  sweep();

  const limit = rateLimit(clientKey(request.headers));
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
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
      await sendWelcomeEmail(normalized, position);
    }

    return NextResponse.json({ ok: true, position, alreadyJoined: !created });
  } catch (error) {
    console.error("[waitlist] Signup failed:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Try again in a moment." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({ count: await getStore().count() });
  } catch (error) {
    console.error("[waitlist] Count failed:", error);
    return NextResponse.json({ count: 0 });
  }
}
