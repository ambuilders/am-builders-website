import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import heicConvert from "heic-convert";
import { z } from "zod/v4";

// This module only ever runs inside app/api/floor-plan-lead/route.ts (a
// server-side Next.js route handler). ANTHROPIC_API_KEY must never be sent
// to or read by client code — there is no client-side use of this file.

const WallSideSchema = z.enum(["top", "right", "bottom", "left"]);

const PositionSchema = z.object({
  wallSide: WallSideSchema,
  positionFraction: z.number().min(0).max(1),
  description: z.string(),
});

const FeatureSchema = z.object({
  label: z.string(),
  note: z.string(),
});

export const ExtractedLayoutSchema = z.object({
  footprintShape: z.enum(["rectangle", "l-shape", "other"]),
  approxWidthFt: z.number().nullable(),
  approxHeightFt: z.number().nullable(),
  entryPoints: z.array(PositionSchema),
  windows: z.array(PositionSchema),
  existingFeatures: z.array(FeatureSchema),
  confidence: z.enum(["clear", "rough", "illegible"]),
  confidenceNote: z.string(),
});

export type ExtractedLayout = z.infer<typeof ExtractedLayoutSchema>;

export type UploadedFile = {
  buffer: Buffer;
  mimeType: string;
  fileName: string;
};

export type ExtractionResult = {
  layout: ExtractedLayout | null;
  note: string;
};

type ClaudeContentBlock =
  | { type: "image"; source: { type: "base64"; media_type: "image/jpeg" | "image/png"; data: string } }
  | { type: "document"; source: { type: "base64"; media_type: "application/pdf"; data: string } };

type NormalizedKind = "pdf" | "png" | "jpeg" | "heic" | null;

// Safari/iOS frequently reports an empty or generic MIME type for HEIC
// photos, so fall back to the file extension when the type is unrecognized.
function normalizeKind(mimeType: string, fileName: string): NormalizedKind {
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/jpeg" || mimeType === "image/jpg") return "jpeg";
  if (mimeType === "image/heic" || mimeType === "image/heif") return "heic";

  const lowerName = fileName.toLowerCase();
  if (lowerName.endsWith(".pdf")) return "pdf";
  if (lowerName.endsWith(".png")) return "png";
  if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) return "jpeg";
  if (lowerName.endsWith(".heic") || lowerName.endsWith(".heif")) return "heic";
  return null;
}

async function toClaudeContentBlock(file: UploadedFile): Promise<ClaudeContentBlock | null> {
  const kind = normalizeKind(file.mimeType, file.fileName);

  if (kind === "pdf") {
    return {
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data: file.buffer.toString("base64") },
    };
  }

  if (kind === "png") {
    return { type: "image", source: { type: "base64", media_type: "image/png", data: file.buffer.toString("base64") } };
  }

  if (kind === "jpeg") {
    return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: file.buffer.toString("base64") } };
  }

  // Claude's vision input doesn't accept HEIC directly, so convert it to
  // JPEG first. This uses a pure-JS decoder (heic-convert) rather than a
  // native library, since prebuilt sharp binaries generally only ship AVIF
  // support, not the patent-encumbered HEVC codec real iPhone HEIC photos use.
  if (kind === "heic") {
    try {
      const converted = await heicConvert({ buffer: file.buffer, format: "JPEG", quality: 0.9 });
      return {
        type: "image",
        source: { type: "base64", media_type: "image/jpeg", data: Buffer.from(converted).toString("base64") },
      };
    } catch (error) {
      console.error("Failed to convert HEIC floor plan upload:", error);
      return null;
    }
  }

  return null;
}

const EXTRACTION_INSTRUCTIONS = `You are analyzing a photo or scan of a basement floor plan that a homeowner uploaded to a general contractor's website. It may be a professional builder's plan, a rough hand sketch, or a photo of a printed page — possibly imperfectly lit, angled, or partially illegible.

Analyze the plan and report:
- The overall footprint shape: a simple rectangle, an L-shape, or something else.
- Approximate overall exterior dimensions in feet, only if legible or reasonably estimable from a visible scale or dimension callouts — otherwise leave them null. These are estimates for concept purposes, not measurements.
- Any entry/door points into the space, each with an approximate location described relative to the image as drawn: which side of the image ("top", "right", "bottom", or "left") the point falls on, and a position fraction from 0 to 1 along that side.
- Any windows, in the same wallSide/positionFraction format.
- Any existing fixed features that should be preserved or worked around in a redesign — e.g. an existing bathroom rough-in, a furnace or mechanical location, a sump pit, a support column or post, a stairwell. Only report features you can actually identify in the image — never invent generic ones just to fill the list.
- An honest confidence assessment: "clear" for a clean, dimensioned drawing; "rough" for a legible sketch with real estimation involved; "illegible" if you cannot meaningfully make out the layout at all. If the file isn't actually a floor plan, set confidence to "illegible" and say so plainly in confidenceNote.`;

export async function extractFloorPlanLayout(file: UploadedFile): Promise<ExtractionResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not configured — skipping floor plan extraction.");
    return { layout: null, note: "Floor plan analysis is not configured." };
  }

  const contentBlock = await toClaudeContentBlock(file);
  if (!contentBlock) {
    return { layout: null, note: `Uploaded file type (${file.mimeType || "unknown"}) could not be processed.` };
  }

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.parse({
      model: "claude-sonnet-5",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: [contentBlock, { type: "text", text: EXTRACTION_INSTRUCTIONS }],
        },
      ],
      output_config: {
        format: zodOutputFormat(ExtractedLayoutSchema),
      },
    });

    const parsed = message.parsed_output;
    if (!parsed) {
      return { layout: null, note: "The floor plan analysis returned an unreadable response." };
    }

    return { layout: parsed, note: parsed.confidenceNote };
  } catch (error) {
    console.error("Floor plan extraction via Claude failed:", error);
    return { layout: null, note: "Automated floor plan analysis failed." };
  }
}
