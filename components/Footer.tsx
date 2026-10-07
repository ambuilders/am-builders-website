import Link from "next/link";
import { Container } from "./Container";
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from "./icons";
import { cities, services, siteConfig } from "@/lib/site-config";

const socialLinks = [
  { label: "Facebook", href: siteConfig.social.facebook, icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedInIcon },
].filter((link) => link.href);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-cream-100">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" aria-label="AM Builders home">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no next/image benefit */}
            <img src="/brand/am-builders-reversed.svg" alt="AM Builders" className="h-14 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-cream-300">
            General contracting built on craftsmanship and trust — serving Calgary and the
            surrounding region.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-700 text-cream-300 transition hover:border-gold-500 hover:text-gold-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg text-cream-50">Service Areas</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link href={`/locations/${city.slug}`} className="text-cream-300 transition hover:text-gold-400">
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-cream-50">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-cream-300 transition hover:text-gold-400">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-cream-50">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream-300">
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="h-4 w-4 shrink-0 text-clay-400" />
              <a href={siteConfig.contact.phoneHref} className="transition hover:text-gold-400">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon className="h-4 w-4 shrink-0 text-clay-400" />
              <a href={`mailto:${siteConfig.contact.email}`} className="transition hover:text-gold-400">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-400" />
              <span>{siteConfig.contact.address}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-charcoal-800">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream-400 sm:flex-row">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/service-areas" className="transition hover:text-gold-400">
              Service Areas
            </Link>
            <Link href="/warranty_centre" className="transition hover:text-gold-400">
              Warranty
            </Link>
            <Link href="/careers" className="transition hover:text-gold-400">
              Careers
            </Link>
            <Link href="/privacy-policy" className="transition hover:text-gold-400">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition hover:text-gold-400">
              Terms of Service
            </Link>
            <p>Licensed General Contractor — Alberta</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
