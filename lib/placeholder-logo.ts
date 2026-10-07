function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Generates an on-brand dashed-border "logo coming soon" placeholder as an
// inline SVG data URI, for use on the Trusted Partners page and the
// homepage partner ticker. Once a real logo is available for a partner, set
// that partner's `logoUrl` in content/partners.ts and this is never called.
export function placeholderLogoDataUri({ size = 72 }: { size?: number } = {}): string {
  const inset = 2;
  const boxSize = size - inset * 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect x="${inset}" y="${inset}" width="${boxSize}" height="${boxSize}" rx="10" fill="#eee4d9" stroke="#b5b0ad" stroke-width="2" stroke-dasharray="6 5" />
    <text x="${size / 2}" y="${size / 2 - 2}" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(size * 0.13)}" font-weight="bold" fill="#73706d">${escapeXml("LOGO")}</text>
    <text x="${size / 2}" y="${size / 2 + 15}" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(size * 0.1)}" fill="#9c9691">${escapeXml("Placeholder")}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
