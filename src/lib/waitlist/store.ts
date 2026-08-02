import { promises as fs } from "node:fs";
import path from "node:path";

import postgres from "postgres";

export type WaitlistEntry = {
  email: string;
  company: string | null;
  useCase: string | null;
  source: string | null;
  referrer: string | null;
  createdAt: string;
};

export type SignupResult = {
  /** False when the email was already on the list — still a success to the caller. */
  created: boolean;
  position: number;
};

export interface WaitlistStore {
  add(entry: WaitlistEntry): Promise<SignupResult>;
  count(): Promise<number>;
}

/** Postgres error code for "relation does not exist". */
const UNDEFINED_TABLE = "42P01";

/**
 * Whether the store may issue DDL. Running `CREATE TABLE IF NOT EXISTS` on
 * every cold start looks harmless, but Postgres checks CREATE privilege on the
 * schema *before* the IF NOT EXISTS check — so leaving it on forces the
 * application role to hold DDL rights permanently, and a leaked connection
 * string could then create or alter objects. Default it off in production and
 * apply `migrations/001_waitlist.sql` once instead.
 */
const autoMigrate =
  process.env.WAITLIST_AUTO_MIGRATE === "1" || process.env.NODE_ENV !== "production";

/** Thrown when the schema is absent and the store is not allowed to create it. */
export class MissingSchemaError extends Error {
  constructor() {
    super(
      "The waitlist table does not exist. Apply migrations/001_waitlist.sql, " +
        "or set WAITLIST_AUTO_MIGRATE=1 to let the app create it (requires DDL rights).",
    );
    this.name = "MissingSchemaError";
  }
}

function rethrow(error: unknown): never {
  if (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: string }).code === UNDEFINED_TABLE
  ) {
    throw new MissingSchemaError();
  }
  throw error;
}

/**
 * Postgres-backed store. Works with any Postgres connection string
 * (Neon, Supabase, Vercel Postgres, RDS, self-hosted).
 */
class PostgresStore implements WaitlistStore {
  private sql: postgres.Sql;
  private ready: Promise<void> | null = null;

  constructor(connectionString: string) {
    this.sql = postgres(connectionString, {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
      // Managed Postgres providers terminate non-TLS connections.
      ssl: connectionString.includes("sslmode=disable") ? false : "require",
    });
  }

  /**
   * Creates the table only when explicitly permitted, so the production role
   * can be restricted to SELECT/INSERT on this one table.
   */
  private init() {
    this.ready ??= (async () => {
      if (!autoMigrate) return;
      await this.sql`
        CREATE TABLE IF NOT EXISTS waitlist (
          id          bigserial PRIMARY KEY,
          email       text NOT NULL UNIQUE,
          company     text,
          use_case    text,
          source      text,
          referrer    text,
          created_at  timestamptz NOT NULL DEFAULT now()
        )
      `;
    })();
    return this.ready;
  }

  async add(entry: WaitlistEntry): Promise<SignupResult> {
    await this.init();
    try {
      const rows = await this.sql<{ inserted: boolean }[]>`
        INSERT INTO waitlist (email, company, use_case, source, referrer)
        VALUES (${entry.email}, ${entry.company}, ${entry.useCase}, ${entry.source}, ${entry.referrer})
        ON CONFLICT (email) DO NOTHING
        RETURNING true AS inserted
      `;
      const created = rows.length > 0;

      const [{ position }] = await this.sql<{ position: number }[]>`
        SELECT COUNT(*)::int AS position FROM waitlist
        WHERE created_at <= (SELECT created_at FROM waitlist WHERE email = ${entry.email})
      `;

      return { created, position };
    } catch (error) {
      rethrow(error);
    }
  }

  async count(): Promise<number> {
    await this.init();
    try {
      const [{ count }] = await this.sql<{ count: number }[]>`
        SELECT COUNT(*)::int AS count FROM waitlist
      `;
      return count;
    } catch (error) {
      rethrow(error);
    }
  }
}

/**
 * Development fallback. Writes to a gitignored JSON file so `npm run dev`
 * works with zero configuration. Never selected in production — see
 * `getStore()`, which throws rather than let this lose real signups.
 */
class FileStore implements WaitlistStore {
  private file = path.join(process.cwd(), ".data", "waitlist.json");

  private async read(): Promise<WaitlistEntry[]> {
    try {
      return JSON.parse(await fs.readFile(this.file, "utf8")) as WaitlistEntry[];
    } catch {
      return [];
    }
  }

  async add(entry: WaitlistEntry): Promise<SignupResult> {
    const entries = await this.read();
    const existing = entries.findIndex((e) => e.email === entry.email);
    if (existing !== -1) {
      return { created: false, position: existing + 1 };
    }
    entries.push(entry);
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    await fs.writeFile(this.file, JSON.stringify(entries, null, 2));
    return { created: true, position: entries.length };
  }

  async count(): Promise<number> {
    return (await this.read()).length;
  }
}

/** Thrown when the app is running in production with nowhere durable to write. */
export class NoDurableStoreError extends Error {
  constructor() {
    super(
      "No DATABASE_URL configured. Refusing to accept signups that would be lost.",
    );
    this.name = "NoDurableStoreError";
  }
}

let cached: WaitlistStore | null = null;

export function getStore(): WaitlistStore {
  if (cached) return cached;

  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (url) {
    cached = new PostgresStore(url);
    return cached;
  }

  // The file store is a development convenience. On a serverless host the
  // filesystem is ephemeral and per-instance, so falling back to it in
  // production would accept a signup, report success, and lose the row.
  // Failing loudly is the only honest option.
  if (process.env.NODE_ENV === "production") {
    throw new NoDurableStoreError();
  }

  cached = new FileStore();
  return cached;
}
