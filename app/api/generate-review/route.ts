import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

// Drafts a Google review from a customer's own multiple-choice answers on
// /review (password-gated by middleware.ts, alongside this route). See
// app/api/review-login/route.ts for the login check that guards access.

type GenerateReviewBody = {
  service?: unknown;
  location?: unknown;
  standout?: unknown;
  crew?: unknown;
  recommend?: unknown;
  detail?: unknown;
};

export async function POST(request: Request) {
  const body: GenerateReviewBody = await request.json().catch(() => ({}));
  const { service, location, standout, crew, recommend, detail } = body;

  if (
    typeof service !== "string" ||
    typeof location !== "string" ||
    typeof standout !== "string" ||
    typeof crew !== "string" ||
    typeof recommend !== "string"
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not configured — cannot generate a review.");
    return NextResponse.json({ error: "Review generation is not configured" }, { status: 503 });
  }

  const prompt = `Write a short, natural-sounding Google review (3-5 sentences) for a general
contracting company called AM Builders, based on a real customer's own answers below.
Write in first person, casual and genuine — the way an actual customer types a review,
not polished ad copy. No generic marketing phrases. No emojis. No hashtags.

Project type: ${service}
Location: ${location}
What stood out most: ${standout}
How they'd describe the crew: ${crew}
Would they recommend AM Builders: ${recommend}
${typeof detail === "string" && detail ? `Extra detail to weave in naturally: ${detail}` : ""}

Return only the review text. No preamble, no quotation marks, no signature.`;

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = message.content.find((c) => c.type === "text");
    const review = textBlock ? textBlock.text.trim() : "";

    if (!review) {
      return NextResponse.json({ error: "No review text returned" }, { status: 502 });
    }

    return NextResponse.json({ review });
  } catch (error) {
    console.error("Review generation via Claude failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
