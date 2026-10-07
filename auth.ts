// Client portal authentication (Auth.js v5).
//
// Invite-only by construction: the only provider is a magic link, and the
// signIn callback refuses any email that doesn't already have an active row
// in client_account. There is no signup path, no password to leak, and no
// way to self-register.
//
// Magic links are sent over SMTP (see .env.example) — deliberately NOT
// through Odoo, whose account is capped at 5 emails per day.
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { db, schema } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  session: { strategy: "database" },
  pages: {
    signIn: "/client-portal/login",
    verifyRequest: "/client-portal/login?sent=1",
    error: "/client-portal/login",
  },
  providers: [
    Nodemailer({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      },
      from: process.env.SMTP_FROM,
    }),
  ],
  callbacks: {
    // The gate. Runs before a session is created, for every sign-in attempt.
    async signIn({ user }) {
      const email = user.email?.toLowerCase().trim();
      if (!email) return false;

      const [invited] = await db
        .select({ id: schema.clientAccounts.id, isActive: schema.clientAccounts.isActive })
        .from(schema.clientAccounts)
        .where(eq(schema.clientAccounts.email, email))
        .limit(1);

      if (!invited?.isActive) return false;

      await db
        .update(schema.clientAccounts)
        .set({ lastLoginAt: new Date() })
        .where(eq(schema.clientAccounts.id, invited.id));

      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // Staff flag comes from the database on every request rather than
        // being carried in the session, so revoking it takes effect at once.
        const [row] = await db
          .select({ isStaff: schema.users.isStaff })
          .from(schema.users)
          .where(eq(schema.users.id, user.id))
          .limit(1);
        session.user.isStaff = row?.isStaff ?? false;
      }
      return session;
    },
  },
});
