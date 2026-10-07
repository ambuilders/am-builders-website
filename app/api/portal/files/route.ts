import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { requireFileAccess } from "@/lib/portal/access";

// Streams a private portal file (photo or document) only to the client who
// owns the project it belongs to.
//
// Blob URLs are never rendered into a page — the browser asks for
// /api/portal/files?key=...&kind=photo and this route decides. A key that
// belongs to another client is refused with the same 404 as a key that
// doesn't exist, so responses can't be used to discover what exists.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const kind = url.searchParams.get("kind");

  if (!key || (kind !== "photo" && kind !== "document")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const allowed = await requireFileAccess(kind, key);
  if (!allowed) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("Portal: BLOB_READ_WRITE_TOKEN is not configured");
    return NextResponse.json({ error: "File storage is not configured yet." }, { status: 503 });
  }

  try {
    // Private blob: the SDK streams it to us server-side. The client never
    // receives a blob URL, so a file can't be shared or guessed by anyone.
    const result = await get(key, { access: "private" });
    if (!result?.stream) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const fileName = key.split("/").pop() ?? "document";

    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob?.contentType ?? "application/octet-stream",
        "Content-Disposition": kind === "document" ? `attachment; filename="${fileName}"` : "inline",
        // Private to this client — never cached by a shared proxy.
        "Cache-Control": "private, max-age=300, must-revalidate",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    console.error("Portal: failed to stream blob", error);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
