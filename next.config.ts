import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // nodemailer is CommonJS with dynamic requires — bundling it breaks the
  // Auth.js route at build time. Keep it as a runtime dependency instead.
  serverExternalPackages: ["nodemailer"],
  // The site's canonical host is www (see siteConfig.url in
  // lib/site-config.ts) — permanently redirect the bare apex so the two
  // hosts don't serve duplicate content under different URLs. Requires both
  // ambuilders.ca and www.ambuilders.ca to be attached to this project in
  // Vercel's domain settings; a canonical tag alone doesn't stop a search
  // engine from indexing whichever host actually responds to a request.
  async redirects() {
    return [
      // The portal was specified as /client_portal; the site's routes are
      // kebab-case everywhere else, so the underscore form redirects in.
      {
        source: "/client_portal",
        destination: "/client-portal",
        permanent: true,
      },
      // Placeholder project pages that were removed once real client photos
      // replaced them. Their URLs are still indexed, so each one points at
      // the closest live page rather than 404ing or dumping everyone on the
      // homepage — a 404 loses the accumulated link equity, and an unrelated
      // homepage redirect is treated as a soft 404.
      ...[
        ["egress-ready-basement-development-calgary", "/basement-development-calgary"],
        ["basement-home-office-airdrie", "/basement-development-airdrie"],
        ["open-concept-kitchen-bath-renovation-calgary", "/services/renovations"],
        ["whole-home-renovation-cochrane", "/locations/cochrane"],
        ["lakeside-custom-home-chestermere", "/locations/chestermere"],
        ["foothills-acreage-custom-home-cochrane", "/services/new-home-construction"],
        ["retail-tenant-improvement-calgary", "/services/commercial-construction"],
        ["office-tenant-improvement-airdrie", "/services/commercial-construction"],
      ].map(([slug, destination]) => ({
        source: `/projects/${slug}`,
        destination,
        permanent: true,
      })),
      {
        source: "/:path*",
        has: [{ type: "host", value: "ambuilders.ca" }],
        destination: "https://www.ambuilders.ca/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
