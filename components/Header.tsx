"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "./Container";
import { ChevronDownIcon, MenuIcon, XIcon } from "./icons";
import { QuickQuoteButton } from "./QuickQuoteButton";
import { services } from "@/lib/site-config";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-cream-50/95 backdrop-blur transition-shadow ${
        scrolled ? "border-charcoal-200 shadow-sm" : "border-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" aria-label="AM Builders home" className="flex flex-col items-center gap-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no next/image benefit */}
          <img src="/brand/am-builders-mark.svg" alt="" aria-hidden="true" className="h-9 w-auto" />
          <span className="font-serif text-[11px] font-semibold uppercase leading-none tracking-widest text-charcoal-900">
            AM Builders
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className={`text-sm font-medium transition hover:text-clay-600 ${
              isActive("/") ? "text-clay-600" : "text-charcoal-700"
            }`}
          >
            Home
          </Link>

          <div ref={servicesRef} className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              className={`flex items-center gap-1 text-sm font-medium transition hover:text-clay-600 ${
                isActive("/services") ? "text-clay-600" : "text-charcoal-700"
              }`}
            >
              Services
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-2xl border border-charcoal-100 bg-cream-50 p-2 shadow-lg">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="block rounded-xl px-4 py-2.5 text-sm text-charcoal-700 transition hover:bg-cream-200 hover:text-clay-700"
                  >
                    {service.name}
                  </Link>
                ))}
                <div className="mt-1 border-t border-charcoal-100 pt-1">
                  <Link
                    href="/services"
                    className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-clay-600 transition hover:bg-cream-200"
                  >
                    View all services
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-clay-600 ${
                isActive(link.href) ? "text-clay-600" : "text-charcoal-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <QuickQuoteButton className="inline-flex items-center justify-center rounded-full bg-clay-600 px-6 py-2.5 text-sm font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700">
            Get a Free Quote
          </QuickQuoteButton>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-charcoal-800 lg:hidden"
        >
          {mobileOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-charcoal-100 bg-cream-50 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <Link href="/" className="rounded-lg px-3 py-3 text-base font-medium text-charcoal-800">
              Home
            </Link>

            <button
              type="button"
              onClick={() => setMobileServicesOpen((open) => !open)}
              aria-expanded={mobileServicesOpen}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-charcoal-800"
            >
              Services
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-charcoal-200 pl-4">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="rounded-lg px-3 py-2 text-sm text-charcoal-600"
                  >
                    {service.name}
                  </Link>
                ))}
                <Link href="/services" className="rounded-lg px-3 py-2 text-sm font-semibold text-clay-600">
                  View all services
                </Link>
              </div>
            )}

            {navLinks.slice(1).map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3 py-3 text-base font-medium text-charcoal-800">
                {link.label}
              </Link>
            ))}

            <QuickQuoteButton
              onBeforeOpen={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-clay-600 px-6 py-3 text-base font-semibold text-cream-50 shadow-sm"
            >
              Get a Free Quote
            </QuickQuoteButton>
          </Container>
        </div>
      )}
    </header>
  );
}
