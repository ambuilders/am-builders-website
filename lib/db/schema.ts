// Client portal database schema (Neon Postgres via Drizzle).
//
// Security model: every portal read resolves session -> clientAccount ->
// project, and queries are filtered by those ids. The browser never supplies
// an Odoo partner id, a project id, or a blob key that hasn't first been
// checked against the session (see lib/portal/access.ts). Quotes and invoices
// are deliberately NOT stored here — they're read live from Odoo so the
// portal can't show stale financials.
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// ---------------------------------------------------------------------------
// Auth.js tables (required shape for @auth/drizzle-adapter)
// ---------------------------------------------------------------------------

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  // Staff see the admin area; clients never do. Set by hand in the database
  // for AM Builders' own accounts — there is no way to grant it from the UI.
  isStaff: boolean("is_staff").notNull().default(false),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [primaryKey({ columns: [account.provider, account.providerAccountId] })],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

// ---------------------------------------------------------------------------
// Portal tables
// ---------------------------------------------------------------------------

// The invite list. A magic link is only ever issued to an email that already
// has a row here (see the signIn callback in auth.ts) — there is no signup.
export const clientAccounts = pgTable("client_account", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  fullName: text("full_name").notNull(),
  // The single source of truth for what this account may read out of Odoo.
  odooPartnerId: integer("odoo_partner_id").notNull(),
  invitedAt: timestamp("invited_at").notNull().defaultNow(),
  lastLoginAt: timestamp("last_login_at"),
  isActive: boolean("is_active").notNull().default(true),
});

export const projectStatus = pgEnum("project_status", ["active", "complete", "on_hold"]);

export const projects = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientAccountId: uuid("client_account_id")
    .notNull()
    .references(() => clientAccounts.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  // Shown to the client, so quadrant/city rather than a full street address
  // is fine here — matches how projects are labelled publicly.
  location: text("location"),
  projectType: text("project_type"),
  status: projectStatus("status").notNull().default("active"),
  // Scoping keys for live Odoo reads. Partner id is copied from the owning
  // client account so a single query can filter on it.
  odooPartnerId: integer("odoo_partner_id").notNull(),
  odooSaleOrderId: integer("odoo_sale_order_id"),
  substantialCompletionDate: timestamp("substantial_completion_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const milestoneStatus = pgEnum("milestone_status", [
  "upcoming",
  "in_progress",
  "complete",
  "paid",
]);

// Mirrors the six-milestone-plus-holdback-release structure from the
// Construction Agreement template.
export const milestones = pgTable("milestone", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull(),
  status: milestoneStatus("status").notNull().default("upcoming"),
  completedAt: timestamp("completed_at"),
  notes: text("notes"),
});

export const photoKind = pgEnum("photo_kind", ["before", "after", "progress"]);

export const photos = pgTable("photo", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  // Blob pathname, never a public URL — files are streamed through an
  // authenticated route that checks project ownership first.
  blobKey: text("blob_key").notNull(),
  kind: photoKind("kind").notNull(),
  caption: text("caption"),
  phase: text("phase"),
  sortOrder: integer("sort_order").notNull().default(0),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const documentType = pgEnum("document_type", [
  "contract",
  "permit",
  "material_selection",
  "warranty_certificate",
  "other",
]);

export const documents = pgTable("document", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  blobKey: text("blob_key").notNull(),
  fileName: text("file_name").notNull(),
  docType: documentType("doc_type").notNull().default("other"),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

// Coverage dates are derived from substantial completion: Tier 1 runs one
// year, Tier 2 runs five. Stored rather than computed so a certificate issued
// with different dates stays accurate.
export const warranties = pgTable("warranty", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  certificateNumber: text("certificate_number"),
  coverageStart: timestamp("coverage_start").notNull(),
  tier1End: timestamp("tier1_end").notNull(),
  tier2End: timestamp("tier2_end").notNull(),
});

export const claimStatus = pgEnum("claim_status", ["submitted", "inspecting", "approved", "declined", "resolved"]);

export const warrantyClaims = pgTable("warranty_claim", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  status: claimStatus("status").notNull().default("submitted"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const messageSender = pgEnum("message_sender", ["client", "staff"]);

export const messages = pgTable("message", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  sender: messageSender("sender").notNull(),
  authorName: text("author_name").notNull(),
  body: text("body").notNull(),
  sentAt: timestamp("sent_at").notNull().defaultNow(),
});
