// Shared between the client upload field and the API route so both sides
// agree on what's accepted — used both for the client's own pre-submit
// check and the server's authoritative re-check of the same file.
export const ALLOWED_FLOOR_PLAN_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/heic",
  "image/heif",
  "application/pdf",
];

// Safari/iOS frequently reports an empty or generic MIME type for HEIC
// photos, so fall back to the file extension when the type is unrecognized.
export const ALLOWED_FLOOR_PLAN_EXTENSIONS = [".jpg", ".jpeg", ".png", ".heic", ".heif", ".pdf"];

export const MAX_FLOOR_PLAN_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export function isAllowedFloorPlanFile(file: { type: string; name: string }): boolean {
  if (ALLOWED_FLOOR_PLAN_MIME_TYPES.includes(file.type)) return true;
  const lowerName = file.name.toLowerCase();
  return ALLOWED_FLOOR_PLAN_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
}
