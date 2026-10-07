import type { ExtractedLayout } from "./extract-layout";
import { placeWindowsOnPerimeter, pointOnPerimeter, pointOnWall } from "./geometry";
import { packRows } from "./packer";
import { HALLWAY_WIDTH_FT, buildRoomSpecs, type RoomSpec } from "./rooms";
import type { DoorMark, EntryMark, FloorPlanInput, FloorPlanLayout, Room, WindowMark } from "./types";

const MIN_FOOTPRINT_DIMENSION_FT = 8;
const MAX_FOOTPRINT_DIMENSION_FT = 120;
const MAX_EXISTING_FEATURES = 5;
const EXISTING_FEATURE_TARGET_SQFT = 25;

// Only trust an uploaded plan's footprint when it's a plain rectangle with
// two legible, sane dimensions — an L-shape or "other" footprint still
// falls back to the area-based rectangle assumption, since the packer
// tiles a single rectangle rather than an arbitrary polygon.
function usableFootprint(extracted: ExtractedLayout | null | undefined): { widthFt: number; heightFt: number } | null {
  if (!extracted || extracted.footprintShape !== "rectangle") return null;
  const { approxWidthFt, approxHeightFt } = extracted;
  if (approxWidthFt === null || approxHeightFt === null) return null;
  if (
    approxWidthFt < MIN_FOOTPRINT_DIMENSION_FT ||
    approxWidthFt > MAX_FOOTPRINT_DIMENSION_FT ||
    approxHeightFt < MIN_FOOTPRINT_DIMENSION_FT ||
    approxHeightFt > MAX_FOOTPRINT_DIMENSION_FT
  ) {
    return null;
  }
  return { widthFt: approxWidthFt, heightFt: approxHeightFt };
}

type Categorized = {
  bedroomPairs: [string, string][]; // [bedroomId, closetId]
  fullBaths: string[];
  halfBaths: string[];
  kitchen: string | null;
  wetBar: string | null;
  gamesRoom: string | null;
  utility: string;
};

function categorize(specs: RoomSpec[]): Categorized {
  const bedroomPairs: [string, string][] = [];
  const bedroomIds = specs.filter((s) => s.kind === "bedroom").map((s) => s.id);
  for (const bedroomId of bedroomIds) {
    const index = bedroomId.split("-")[1];
    const closetId = `closet-${index}`;
    if (specs.some((s) => s.id === closetId)) bedroomPairs.push([bedroomId, closetId]);
  }

  return {
    bedroomPairs,
    fullBaths: specs.filter((s) => s.kind === "bathroom").map((s) => s.id),
    halfBaths: specs.filter((s) => s.kind === "half-bathroom").map((s) => s.id),
    kitchen: specs.find((s) => s.kind === "kitchen")?.id ?? null,
    wetBar: specs.find((s) => s.kind === "wet-bar")?.id ?? null,
    gamesRoom: specs.find((s) => s.kind === "games-room")?.id ?? null,
    utility: specs.find((s) => s.kind === "utility")!.id,
  };
}

// "Open concept" is represented by merging the wet bar and games room into
// a single labeled room rather than trying to selectively hide shared
// walls — simpler to render correctly and just as clear on the page.
function mergeGamesAndWetBar(specs: RoomSpec[]): RoomSpec[] {
  const wetBar = specs.find((s) => s.kind === "wet-bar");
  const gamesRoom = specs.find((s) => s.kind === "games-room");
  if (!wetBar || !gamesRoom) return specs;

  const merged: RoomSpec = {
    id: "games-wetbar-combo",
    kind: "games-room",
    label: "Games Room & Wet Bar (Open Concept)",
    targetAreaSqFt: wetBar.targetAreaSqFt + gamesRoom.targetAreaSqFt,
  };

  return [...specs.filter((s) => s.kind !== "wet-bar" && s.kind !== "games-room"), merged];
}

function rowsToPlan(rows: string[][]): string[][] {
  return rows.filter((row) => row.length > 0);
}

// Existing fixed features Claude identified in an uploaded plan (a furnace,
// a bathroom rough-in, a sump pit, a support post) become their own small
// rooms that every variation includes and labels as existing/preserved,
// rather than being pinned to exact coordinates — the packer tiles rows,
// it has no notion of an arbitrary fixed x/y obstacle.
function buildExistingFeatureSpecs(extracted: ExtractedLayout | null | undefined): RoomSpec[] {
  if (!extracted) return [];
  return extracted.existingFeatures.slice(0, MAX_EXISTING_FEATURES).map((feature, index) => ({
    id: `existing-feature-${index}`,
    kind: "existing-feature" as const,
    label: `Existing: ${feature.label}`,
    targetAreaSqFt: EXISTING_FEATURE_TARGET_SQFT,
  }));
}

// Folds the existing-feature rooms into whichever row already holds the
// utility room (same single-item-row-stretch avoidance used elsewhere: a
// lone feature joins that row, several get a short row of their own).
function injectExistingFeatures(rows: string[][], featureIds: string[]) {
  if (featureIds.length === 0) return;
  const utilityRow = rows.find((row) => row.includes("utility"));
  if (featureIds.length === 1 && utilityRow) {
    utilityRow.push(...featureIds);
    return;
  }
  rows.push(featureIds);
}

function assignDoors(rooms: Room[], hallwayWidthFt: number): DoorMark[] {
  return rooms
    .filter((room) => room.kind !== "closet")
    .map((room) => {
      const touchesHallway = Math.abs(room.x - hallwayWidthFt) < 0.01;
      return {
        x: room.x,
        y: room.y + room.height * (touchesHallway ? 0.3 : 0.5),
        wallSide: "left" as const,
        widthFt: room.kind === "bedroom" || room.kind === "games-room" ? 3 : 2.5,
      };
    });
}

function buildEntryAndWindows(
  basementWidthFt: number,
  basementHeightFt: number,
  input: FloorPlanInput,
  entryFraction: number,
  extracted?: ExtractedLayout | null,
): { entry?: EntryMark; windows: WindowMark[] } {
  // Real entry/window locations are exterior-wall facts, not something that
  // should vary by concept — when an upload identified them, every
  // variation uses the same real positions instead of the per-variation
  // heuristic used for sqft-only submissions.
  const extractedEntry = extracted?.entryPoints[0];
  const extractedWindows = extracted?.windows ?? [];

  if (!extractedEntry && extractedWindows.length === 0 && !input.hasSideEntry && !input.hasWindows) {
    return { windows: [] };
  }

  const entryPoint = extractedEntry
    ? pointOnWall(basementWidthFt, basementHeightFt, extractedEntry.wallSide, extractedEntry.positionFraction)
    : input.hasSideEntry
      ? pointOnPerimeter(basementWidthFt, basementHeightFt, entryFraction)
      : undefined;
  const entry: EntryMark | undefined = entryPoint
    ? { x: entryPoint.x, y: entryPoint.y, wallSide: entryPoint.wallSide, widthFt: 3 }
    : undefined;

  const windowPoints =
    extractedWindows.length > 0
      ? extractedWindows.map((w) => pointOnWall(basementWidthFt, basementHeightFt, w.wallSide, w.positionFraction))
      : input.hasWindows
        ? placeWindowsOnPerimeter(basementWidthFt, basementHeightFt, input.windowCount, entryPoint)
        : [];

  const windows: WindowMark[] = windowPoints.map((point) => ({
    x: point.x,
    y: point.y,
    wallSide: point.wallSide,
    widthFt: 3,
  }));

  return { entry, windows };
}

function dimensions(areaSqFt: number): { widthFt: number; heightFt: number } {
  const ASPECT_RATIO = 1.3; // width : height
  const heightFt = Math.sqrt(areaSqFt / ASPECT_RATIO);
  const widthFt = areaSqFt / heightFt;
  return { widthFt, heightFt };
}

function pack(rows: string[][], specs: RoomSpec[], widthFt: number, heightFt: number): Room[] {
  const specsById = new Map(specs.map((spec) => [spec.id, spec]));
  const hallway: Room = {
    id: "hallway",
    kind: "hallway",
    label: "Hall",
    x: 0,
    y: 0,
    width: HALLWAY_WIDTH_FT,
    height: heightFt,
    areaSqFt: Math.round(HALLWAY_WIDTH_FT * heightFt),
  };

  const packedRooms = packRows(rowsToPlan(rows), specsById, HALLWAY_WIDTH_FT, 0, widthFt - HALLWAY_WIDTH_FT, heightFt);
  return [hallway, ...packedRooms];
}

export function generateFloorPlanVariations(
  input: FloorPlanInput,
  extracted?: ExtractedLayout | null,
): FloorPlanLayout[] {
  const footprint = usableFootprint(extracted);
  const { widthFt, heightFt } = footprint ?? dimensions(input.areaSqFt);
  const groundedInUpload = footprint !== null;
  const packableAreaSqFt = (widthFt - HALLWAY_WIDTH_FT) * heightFt;
  const baseSpecs = buildRoomSpecs(input, packableAreaSqFt);
  const existingFeatureSpecs = buildExistingFeatureSpecs(extracted);
  const existingFeatureIds = existingFeatureSpecs.map((spec) => spec.id);

  // --- Variation 1: clustered bedrooms, central bath, open social zone ---
  const v1Specs = [...mergeGamesAndWetBar(baseSpecs), ...existingFeatureSpecs];
  const v1Cat = categorize(v1Specs);
  const v1BedroomRow = v1Cat.bedroomPairs.flat();
  const v1BathIds = [...v1Cat.fullBaths, ...v1Cat.halfBaths];
  const v1SocialRow = [v1Cat.kitchen, v1Cat.gamesRoom, v1Cat.utility].filter((id): id is string => Boolean(id));
  const v1Rows: string[][] = [];
  if (v1BedroomRow.length > 0) v1Rows.push(v1BedroomRow);
  // A single bathroom given its own row would stretch to the full row width,
  // which reads oddly — fold a lone bath into the bedroom row instead, and
  // only give bathrooms a dedicated row when there are enough to fill one.
  if (v1BathIds.length === 1 && v1Rows.length > 0) {
    v1Rows[0].push(...v1BathIds);
  } else if (v1BathIds.length > 0) {
    v1Rows.push(v1BathIds);
  }
  v1Rows.push(v1SocialRow.length > 0 ? v1SocialRow : [v1Cat.utility]);
  injectExistingFeatures(v1Rows, existingFeatureIds);
  const v1Rooms = pack(v1Rows, v1Specs, widthFt, heightFt);
  const v1EntryWindows = buildEntryAndWindows(widthFt, heightFt, input, 0.15, extracted);

  // --- Variation 2: split bedrooms, ensuite primary, partitioned social row ---
  const v2Specs = [...baseSpecs, ...existingFeatureSpecs];
  const v2Cat = categorize(v2Specs);
  const v2Rows: string[][] = [];
  const remainingBaths = [...v2Cat.fullBaths];
  v2Cat.bedroomPairs.forEach((pair, index) => {
    if (index === 0 && remainingBaths.length > 0) {
      v2Rows.push([...pair, remainingBaths.shift() as string]);
    } else {
      v2Rows.push([...pair]);
    }
  });
  const v2CentralBaths = [...remainingBaths, ...v2Cat.halfBaths];
  const v2SocialRow = [v2Cat.kitchen, v2Cat.wetBar, v2Cat.gamesRoom, v2Cat.utility].filter(
    (id): id is string => Boolean(id),
  );
  // As in variation 1, a lone leftover bathroom joins the social row rather
  // than stretching across a row by itself; two or more get their own row.
  if (v2CentralBaths.length === 1) {
    v2SocialRow.unshift(...v2CentralBaths);
  } else if (v2CentralBaths.length > 1) {
    v2Rows.push(v2CentralBaths);
  }
  v2Rows.push(v2SocialRow.length > 0 ? v2SocialRow : [v2Cat.utility]);
  injectExistingFeatures(v2Rows, existingFeatureIds);
  const v2Rooms = pack(v2Rows, v2Specs, widthFt, heightFt);
  const v2EntryWindows = buildEntryAndWindows(widthFt, heightFt, input, 0.65, extracted);

  // --- Variation 3: clustered bedrooms, dedicated central bath row, fully partitioned zones ---
  const v3Specs = [...baseSpecs, ...existingFeatureSpecs];
  const v3Cat = categorize(v3Specs);
  const v3BedroomRow = v3Cat.bedroomPairs.flat();
  const v3BathRow = [...v3Cat.fullBaths, ...v3Cat.halfBaths];
  const v3KitchenRow = [v3Cat.kitchen, v3Cat.utility].filter((id): id is string => Boolean(id));
  const v3SocialRow = [v3Cat.wetBar, v3Cat.gamesRoom].filter((id): id is string => Boolean(id));
  const v3Rows: string[][] = [];
  if (v3BedroomRow.length > 0) v3Rows.push(v3BedroomRow);
  // A lone bathroom folds into the kitchen row instead of standing alone.
  if (v3BathRow.length === 1 && v3KitchenRow.length > 0) {
    v3KitchenRow.unshift(...v3BathRow);
  } else if (v3BathRow.length > 0) {
    v3Rows.push(v3BathRow);
  }
  // v3KitchenRow always contains at least utility, so this row is never empty.
  v3Rows.push(v3KitchenRow);
  if (v3SocialRow.length > 0) v3Rows.push(v3SocialRow);
  injectExistingFeatures(v3Rows, existingFeatureIds);
  const v3Rooms = pack(v3Rows, v3Specs, widthFt, heightFt);
  const v3EntryWindows = buildEntryAndWindows(widthFt, heightFt, input, 0.85, extracted);

  return [
    {
      variationNumber: 1,
      variationName: "Open Social Zone",
      variationDescription:
        "Bedrooms clustered together with a shared central bath; the kitchenette, games room, and wet bar flow together as one open social space.",
      basementWidthFt: widthFt,
      basementHeightFt: heightFt,
      rooms: v1Rooms,
      doors: assignDoors(v1Rooms, HALLWAY_WIDTH_FT),
      windows: v1EntryWindows.windows,
      entry: v1EntryWindows.entry,
      groundedInUpload,
    },
    {
      variationNumber: 2,
      variationName: "En-Suite Primary Bedroom",
      variationDescription:
        "Each bedroom gets its own zone, with the primary bedroom opening directly into its own bathroom. The kitchenette, wet bar, and games room sit together near the entry.",
      basementWidthFt: widthFt,
      basementHeightFt: heightFt,
      rooms: v2Rooms,
      doors: assignDoors(v2Rooms, HALLWAY_WIDTH_FT),
      windows: v2EntryWindows.windows,
      entry: v2EntryWindows.entry,
      groundedInUpload,
    },
    {
      variationNumber: 3,
      variationName: "Defined Zones",
      variationDescription:
        "Bedrooms are clustered on one end with a dedicated central bathroom between the private and social zones. The kitchenette, wet bar, and games room are kept as distinct, separately-walled rooms.",
      basementWidthFt: widthFt,
      basementHeightFt: heightFt,
      rooms: v3Rooms,
      doors: assignDoors(v3Rooms, HALLWAY_WIDTH_FT),
      windows: v3EntryWindows.windows,
      entry: v3EntryWindows.entry,
      groundedInUpload,
    },
  ];
}
