"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuickQuoteModal } from "@/components/QuickQuoteModal";

// /review is a standalone, password-gated tool (see middleware.ts), not part
// of the marketed site, so it renders without the shared Header/Footer/
// CtaBanner/QuickQuoteModal. This checks the path with the client-side
// usePathname hook rather than a server-side check (e.g. headers()) in the
// root layout — a dynamic server API there would force every route in the
// tree to render dynamically instead of staying statically prerendered.
export function SiteChrome({ children, jsonLd }: { children: ReactNode; jsonLd: ReactNode }) {
  const pathname = usePathname();
  const isBareShell = pathname?.startsWith("/review") ?? false;

  if (isBareShell) {
    return <>{children}</>;
  }

  return (
    <>
      {jsonLd}
      <Header />
      {children}
      <CtaBanner />
      <Footer />
      <QuickQuoteModal />
    </>
  );
}
