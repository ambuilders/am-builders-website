import type { FloorPlanInput, RoomKind } from "./types";

// Target areas in sqft, chosen from the midpoint of each range in the spec.
// These are RELATIVE WEIGHTS, not hard sizes — the packer scales every room
// proportionally so the full set always exactly tiles the basement
// rectangle, so unusually small or large basements still produce a valid,
// non-overlapping concept diagram instead of overflowing or leaving gaps.
export const ROOM_TARGETS = {
  bedroom: 110,
  closet: 20,
  fullBath: 42,
  halfBath: 20,
  kitchen: 100,
  wetBar: 50,
  utility: 50,
  gamesRoomMin: 150,
} as const;

export const HALLWAY_WIDTH_FT = 3.5;

export type RoomSpec = {
  id: string;
  kind: RoomKind;
  label: string;
  targetAreaSqFt: number;
};

// Full bathrooms come from the integer part of the count, a half bath from
// a .5 remainder (e.g. 1.5 bathrooms = one full bath + one half bath).
function splitBathrooms(bathrooms: number): { full: number; half: number } {
  const full = Math.floor(bathrooms);
  const half = bathrooms - full >= 0.5 ? 1 : 0;
  return { full, half };
}

export function buildRoomSpecs(input: FloorPlanInput, packableAreaSqFt: number): RoomSpec[] {
  const specs: RoomSpec[] = [];

  for (let i = 1; i <= input.bedrooms; i++) {
    specs.push({ id: `bedroom-${i}`, kind: "bedroom", label: `Bedroom ${i}`, targetAreaSqFt: ROOM_TARGETS.bedroom });
    specs.push({ id: `closet-${i}`, kind: "closet", label: "Closet", targetAreaSqFt: ROOM_TARGETS.closet });
  }

  const { full, half } = splitBathrooms(input.bathrooms);
  for (let i = 1; i <= full; i++) {
    specs.push({
      id: `bathroom-${i}`,
      kind: "bathroom",
      label: full + half > 1 ? `Bathroom ${i}` : "Bathroom",
      targetAreaSqFt: ROOM_TARGETS.fullBath,
    });
  }
  for (let i = 1; i <= half; i++) {
    specs.push({
      id: `half-bathroom-${i}`,
      kind: "half-bathroom",
      label: "Half Bath",
      targetAreaSqFt: ROOM_TARGETS.halfBath,
    });
  }

  if (input.hasKitchen) {
    specs.push({ id: "kitchen", kind: "kitchen", label: "Kitchenette", targetAreaSqFt: ROOM_TARGETS.kitchen });
  }

  if (input.hasWetBar) {
    specs.push({ id: "wet-bar", kind: "wet-bar", label: "Wet Bar", targetAreaSqFt: ROOM_TARGETS.wetBar });
  }

  specs.push({ id: "utility", kind: "utility", label: "Utility", targetAreaSqFt: ROOM_TARGETS.utility });

  // Games room absorbs whatever's left, so the fixed-purpose rooms above
  // stay close to their nominal sizes for any reasonably-sized basement.
  if (input.hasGamesRoom) {
    const committedArea = specs.reduce((sum, spec) => sum + spec.targetAreaSqFt, 0);
    const remaining = packableAreaSqFt - committedArea;
    specs.push({
      id: "games-room",
      kind: "games-room",
      label: "Games Room",
      targetAreaSqFt: Math.max(ROOM_TARGETS.gamesRoomMin, remaining),
    });
  }

  return specs;
}
