/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Must match siteConfig.url in lib/site-config.ts — the site serves on
  // www, and the bare apex redirects here (see next.config.ts).
  siteUrl: process.env.SITE_URL || "https://www.ambuilders.ca",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: [
    // Icon/OG metadata routes aren't real pages — keep them out of the sitemap.
    "/icon",
    "/apple-icon",
    "/opengraph-image",
    "/twitter-image",
    // Gated routes. These already redirect (middleware.ts) and carry
    // noindex, so they were never indexable — but listing a noindex URL in
    // the sitemap makes Search Console report it as an error, so keep them
    // out. /client-portal itself is the public landing page and stays in.
    "/review",
    "/review/*",
    "/client-portal/login",
    "/client-portal/dashboard",
    "/client-portal/admin",
    "/client-portal/projects/*",
  ],
  // /contact reads searchParams (for the quote/consultation tab) so Next
  // renders it dynamically and next-sitemap can't auto-discover it from the
  // static build output — add it back explicitly.
  additionalPaths: async (config) => [await config.transform(config, "/contact")],
  robotsTxtOptions: {
    policies: [
      // Standard search engines
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },

      // AI / answer-engine crawlers — explicitly allowed for AEO/GEO visibility
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GoogleOther", allow: "/" },
      { userAgent: "Bingbot-Copilot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
    ],
  },
};
