// Copies photos from a shared Google Drive folder into Vercel Blob.
//
// Drive stays the working library — AM Builders already organises projects
// there — but the portal serves its own private copies rather than proxying
// Drive on every request. Drive isn't a CDN, its sharing model is per Google
// account rather than per portal login, and a folder left link-shared would
// expose client files. So we import once and serve privately.
//
// The folder must be readable by "anyone with the link" for the import to
// see it. That's acceptable for a folder of construction photos; it is NOT
// acceptable for contracts or anything containing personal information,
// which should be uploaded directly instead.

export type DriveFile = { id: string; name: string };

const FOLDER_ID = /[-\w]{25,}/;

/** Accepts a full Drive folder URL or a bare folder id. */
export function parseDriveFolderId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const match = trimmed.match(FOLDER_ID);
  return match ? match[0] : null;
}

/**
 * Lists a public Drive folder through the embedded folder view, which needs
 * no API key or service account — the same approach used to pull the public
 * project photos. Returns files in the order Drive lists them.
 */
export async function listDriveFolder(folderId: string): Promise<DriveFile[]> {
  const response = await fetch(`https://drive.google.com/embeddedfolderview?id=${folderId}#list`);
  if (!response.ok) throw new Error(`Drive folder could not be read (HTTP ${response.status})`);

  const html = await response.text();
  const ids = [...html.matchAll(/id="entry-([A-Za-z0-9_-]+)"/g)].map((m) => m[1]);
  const names = [...html.matchAll(/flip-entry-title">([^<]*)</g)].map((m) => m[1]);

  return ids.map((id, index) => ({ id, name: names[index] ?? `file-${index + 1}` }));
}

/**
 * Downloads one Drive file at a web-friendly size. Drive's thumbnail
 * endpoint returns a resized JPEG, which is what the portal wants — the
 * originals are 3–8 MB phone photos that would make the gallery crawl.
 */
export async function fetchDriveImage(fileId: string, width = 1600): Promise<Buffer> {
  const response = await fetch(`https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`);
  if (!response.ok) throw new Error(`Could not download Drive file (HTTP ${response.status})`);
  return Buffer.from(await response.arrayBuffer());
}
