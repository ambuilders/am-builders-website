import type { Config } from "drizzle-kit";

// Migrations are generated locally (`npx drizzle-kit generate`) and applied
// deliberately (`npx drizzle-kit migrate`) — never automatically on deploy.
export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
} satisfies Config;
