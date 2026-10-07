# Pre-Launch Checklist

The site is fully built, SEO/AEO-ready, and functions correctly today — everything below is a placeholder standing in for real business details. Nothing here blocks development; it blocks going live with accurate information.

## Required before going live

- [x] **Real logo** — `public/logo.png`, `app/icon.tsx`, and `app/apple-icon.tsx` now use the real "AM Builders" mark; header/footer use the horizontal/reversed lockups from `public/brand/` (source: the "AM Builders Logo Exports" Claude Design canvas).
- [ ] **Open Graph image** — replace `public/og-image.jpg` (1200×630 social-share image); the logo export didn't include one, still a placeholder.
- [x] **Phone number** — `siteConfig.contact.phone` in `lib/site-config.ts` is now `+1 (403) 679 8138`, used on the Footer, Contact page, JSON-LD, and the floor-plan PDF cover; Footer/Contact display it as a `tel:` link (`siteConfig.contact.phoneHref`).
- [ ] **Email address** — confirm `info@ambuilders.ca` in `lib/site-config.ts` (`siteConfig.contact.email`) is the real inbox to use.
- [x] **Business address** — `siteConfig.address` and `siteConfig.contact.address` in `lib/site-config.ts` are now 480 Lawthorn Way SE, Airdrie, AB T4A 3M8 (used in JSON-LD and the Footer/Contact page display copy). Note: this is in Airdrie while the site's SEO framing (page titles, meta descriptions, homepage copy) is Calgary-first — intentional if Airdrie is just the registered office and Calgary is the primary market you're targeting, but worth double-checking.
- [x] **Business license number** — `siteConfig.licenseNumber` in `lib/site-config.ts` is now `LC2601992`, shown on the About page (with FAQ). This is a **City of Airdrie business license only** — it does not cover Calgary, Chestermere, or Cochrane, so it's also surfaced (with JSON-LD `identifier`) solely on the Airdrie entry in `content/locations.ts` / `/locations/airdrie`, not sitewide (e.g. not in the Footer's generic "Licensed General Contractor — Alberta" line, and not in the sitewide Organization/GeneralContractor JSON-LD). If licenses for the other three cities are obtained later, add them the same way (per-city, not to the shared `siteConfig` field) rather than widening this one's scope.
- [ ] **Years in business** — replace `[YEARS_PLACEHOLDER]` (homepage trust bar, About page FAQ) with a real number.
- [ ] **Real project photos** — in `content/projects.ts`, set `beforeImageSrc` / `afterImageSrc` per project to a photo path under `/public` (see the `TODO(Afroz)` comment above the array). Until set, project pages show a clearly-labeled placeholder graphic.
- [x] **Social links** — `siteConfig.social.facebook` and `.instagram` in `lib/site-config.ts` are set; `.linkedin` and `.google` (Google Business Profile) are still blank pending real profiles. The Footer only renders icons for whichever are actually set, and JSON-LD's `sameAs` field picks them up automatically.

## Optional — only if you want to change the starting design

- [ ] **Brand colors** — the earthy palette (charcoal / clay / cream / gold) lives in the `@theme` block in `app/globals.css`. Every component references the token names, not hardcoded hex values, so swapping the palette there is a low-effort rebrand. Note: the real logo mark uses charcoal + a rose/pink accent (`#E2597A`/`#FC8EAC`), not the site's clay/gold — worth a look together before launch.
- [ ] **Fonts** — currently Inter (body) + Fraunces (headings), set in `app/layout.tsx`.
- [ ] **Testimonials** — `app/page.tsx` has 3 placeholder testimonials (`[Client Name]`, `[City]`) ready to swap for real client quotes.

## Not blocking, but worth knowing

- Real photography is the main thing keeping `/projects` from looking fully "live" — filtering, detail pages, and structured data are all production-ready.
- `content/blog.ts` has one sample post as a template for building out `/blog` over time.
