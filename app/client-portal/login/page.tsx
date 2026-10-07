import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/metadata";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Client Portal Login",
    description: "Sign in to the AM Builders client portal.",
    path: "/client-portal/login",
  }),
  robots: { index: false, follow: false },
};

export default async function ClientPortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;

  return (
    <main className="py-24">
      <Container className="max-w-md">
        <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">Client Portal</p>
          <h1 className="mt-3 font-serif text-3xl text-charcoal-900">Sign in</h1>

          {sent ? (
            <div className="mt-6 rounded-xl border border-clay-200 bg-clay-50 p-5">
              <p className="font-serif text-lg text-charcoal-900">Check your email</p>
              <p className="mt-2 text-sm text-charcoal-600">
                If that address has portal access, we&apos;ve sent a sign-in link. It expires in 24
                hours — check your spam folder if it doesn&apos;t arrive within a few minutes.
              </p>
            </div>
          ) : (
            <>
              <p className="mt-3 text-sm text-charcoal-600">
                Enter the email address AM Builders set up for you and we&apos;ll send a sign-in
                link. No password required.
              </p>
              {error && (
                <p
                  role="alert"
                  className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  We couldn&apos;t sign you in with that link. Request a new one below.
                </p>
              )}
              <LoginForm />
              <p className="mt-6 text-xs text-charcoal-500">
                Portal access is set up by AM Builders after your contract is signed — there&apos;s
                no self-registration. If you need access, contact us and we&apos;ll invite you.
              </p>
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
