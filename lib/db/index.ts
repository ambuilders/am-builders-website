// Neon Postgres client over HTTP — the serverless driver, so it works from
// Vercel functions without connection pooling problems.
//
// Requires DATABASE_URL (see .env.example). Nothing in the marketing site
// touches this; the client portal is the only consumer.
//
// The client is built at import time because @auth/drizzle-adapter inspects
// the real Drizzle instance when it's constructed (a lazy Proxy fails its
// internal type checks). `next build` imports this module without
// DATABASE_URL set, so a placeholder stands in during the build — no query
// runs at build time. isDatabaseConfigured() is the guard for request-time
// code that needs to fail clearly when the variable is genuinely missing.
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const BUILD_PLACEHOLDER = "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder";

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export const db = drizzle(neon(process.env.DATABASE_URL ?? BUILD_PLACEHOLDER), { schema });

export { schema };
