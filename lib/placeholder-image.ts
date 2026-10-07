function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Generates an on-brand "photo coming soon" placeholder as an inline SVG data
// URI, so project cards render a real <img> (with real alt text) instead of
// a decorative icon box. Once a real photo is available for a project, set
// its imageSrc field in content/projects.ts and this is never called.
export function placeholderImageDataUri({
  label,
  width = 800,
  height = 600,
}: {
  label: string;
  width?: number;
  height?: number;
}): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#e8e3dd" />
    <g transform="translate(${width / 2}, ${height / 2 - 36})" fill="none" stroke="#8f7d6a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="-36" y="-28" width="72" height="56" rx="6" />
      <circle cx="-13" cy="-11" r="6" />
      <path d="M36 14 L14 -8 L-36 28" />
    </g>
    <text x="${width / 2}" y="${height / 2 + 44}" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#6f5f4e">${escapeXml(label)}</text>
    <text x="${width / 2}" y="${height / 2 + 72}" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#8f7d6a">Photo coming soon</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
