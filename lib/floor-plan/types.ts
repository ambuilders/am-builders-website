export type CeilingHeightBand = "under-7-6" | "7-6-to-8" | "8-plus";

export type FloorPlanInput = {
  areaSqFt: number;
  hasWindows: boolean;
  windowCount: number;
  hasSideEntry: boolean;
  ceilingHeight: CeilingHeightBand;
  bedrooms: number; // 0-4
  bathrooms: number; // 0-2, in 0.5 steps
  hasKitchen: boolean;
  hasWetBar: boolean;
  hasGamesRoom: boolean;
};

export type RoomKind =
  | "bedroom"
  | "closet"
  | "bathroom"
  | "half-bathroom"
  | "kitchen"
  | "wet-bar"
  | "games-room"
  | "utility"
  | "hallway"
  | "existing-feature";

export type Room = {
  id: string;
  kind: RoomKind;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  areaSqFt: number;
};

export type WallSide = "top" | "right" | "bottom" | "left";

export type DoorMark = {
  x: number;
  y: number;
  wallSide: WallSide;
  widthFt: number;
};

export type WindowMark = {
  x: number;
  y: number;
  wallSide: WallSide;
  widthFt: number;
};

export type EntryMark = {
  x: number;
  y: number;
  wallSide: WallSide;
  widthFt: number;
};

export type FloorPlanLayout = {
  variationNumber: 1 | 2 | 3;
  variationName: string;
  variationDescription: string;
  basementWidthFt: number;
  basementHeightFt: number;
  rooms: Room[];
  doors: DoorMark[];
  windows: WindowMark[];
  entry?: EntryMark;
  // True when the footprint dimensions came from an uploaded floor plan
  // rather than the area-based rectangle assumption — drives the PDF's
  // "based on your uploaded floor plan" vs "...provided dimensions" note.
  groundedInUpload: boolean;
  // Set when an upload was analyzed but confidence was "rough" or lower,
  // or extraction failed — surfaced in the PDF as a gentle caveat.
  lowConfidenceNote?: string;
};
