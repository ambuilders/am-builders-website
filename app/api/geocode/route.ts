import { NextResponse } from "next/server";

// Proxies address search to OpenStreetMap's Nominatim (no API key required —
// there's no Google Maps/Places key configured for this project). Proxying
// server-side lets us set the identifying User-Agent Nominatim's usage
// policy requires: https://operations.osmfoundation.org/policies/nominatim/
// Restricted to Canada since AM Builders only serves Alberta.
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

type NominatimResult = {
  display_name: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 3) {
    return NextResponse.json({ results: [] });
  }

  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("countrycodes", "ca");
  url.searchParams.set("limit", "5");

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "AMBuildersWebsite/1.0 (+https://ambuilders.ca; info@ambuilders.ca)",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ results: [] }, { status: 502 });
    }

    const data = (await response.json()) as NominatimResult[];
    return NextResponse.json({
      results: data.map((item) => ({ label: item.display_name })),
    });
  } catch (error) {
    console.error("Geocode lookup failed:", error);
    return NextResponse.json({ results: [] }, { status: 502 });
  }
}
