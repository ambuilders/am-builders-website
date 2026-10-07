import type { Room } from "./types";
import type { RoomSpec } from "./rooms";

// Minimum row depth / room width, in feet, before a room reads as an
// unrealistically thin sliver on the diagram. These are floors, not hard
// sizes — distributeWithMinimum still always sums back to the exact total.
const MIN_ROW_HEIGHT_FT = 6;
const MIN_ROOM_WIDTH_FT = 5;

// Proportionally distributes `total` across `weights`, same as plain
// weighted allocation, but pins any share that would fall under `minSize`
// to exactly `minSize` and reallocates the remaining budget across the
// still-free items — a small "water-filling" pass. This is what keeps a
// lone small room sharing a row with a much bigger one (e.g. a utility
// room next to an open games room) from collapsing into an unrealistic
// sliver, while every allocation still sums exactly to `total`.
function distributeWithMinimum(weights: number[], total: number, minSize: number): number[] {
  const n = weights.length;
  if (n === 0) return [];
  if (minSize * n >= total) return new Array(n).fill(total / n);

  const result = new Array(n).fill(0);
  const fixed = new Array(n).fill(false);
  let remainingTotal = total;
  let remainingIndices = weights.map((_, i) => i);

  for (let iter = 0; iter < n; iter++) {
    const remainingWeightSum = remainingIndices.reduce((sum, i) => sum + weights[i], 0);
    const shareOf = (i: number) =>
      remainingWeightSum > 0
        ? (weights[i] / remainingWeightSum) * remainingTotal
        : remainingTotal / remainingIndices.length;

    const newlyFixed = remainingIndices.filter((i) => shareOf(i) < minSize);

    if (newlyFixed.length === 0) {
      for (const i of remainingIndices) result[i] = shareOf(i);
      break;
    }

    for (const i of newlyFixed) {
      result[i] = minSize;
      fixed[i] = true;
    }
    remainingTotal -= newlyFixed.length * minSize;
    remainingIndices = remainingIndices.filter((i) => !fixed[i]);
  }

  return result;
}

// A deterministic shelf packer: rows are stacked top-to-bottom, each sized
// proportionally to its total target area (with a minimum-depth floor), and
// rooms within a row are placed left-to-right sized proportionally to their
// share of that row (with a minimum-width floor). Every allocation is
// renormalized to sum exactly to the available space, so the result always
// exactly tiles the given rectangle with no gaps or overlaps — target areas
// act as relative weights, not hard sizes. A closet is placed as its own
// small rectangle immediately next to its bedroom within the same row,
// rather than nested inside it, to keep the packer's tiling guarantee simple.
export function packRows(
  rows: string[][],
  specsById: Map<string, RoomSpec>,
  packX: number,
  packY: number,
  packWidth: number,
  packHeight: number,
): Room[] {
  const rowWeights = rows.map((roomIds) =>
    roomIds.reduce((sum, id) => sum + (specsById.get(id)?.targetAreaSqFt ?? 0), 0),
  );
  const rowHeights = distributeWithMinimum(rowWeights, packHeight, MIN_ROW_HEIGHT_FT);

  const placedRooms: Room[] = [];
  let currentY = packY;

  rows.forEach((roomIds, rowIndex) => {
    const rowHeight = rowHeights[rowIndex];
    const roomWeights = roomIds.map((id) => specsById.get(id)?.targetAreaSqFt ?? 0);
    const roomWidths = distributeWithMinimum(roomWeights, packWidth, MIN_ROOM_WIDTH_FT);

    let currentX = packX;
    roomIds.forEach((id, roomIndex) => {
      const spec = specsById.get(id);
      if (!spec) return;

      const roomWidth = roomWidths[roomIndex];

      placedRooms.push({
        id: spec.id,
        kind: spec.kind,
        label: spec.label,
        x: currentX,
        y: currentY,
        width: roomWidth,
        height: rowHeight,
        areaSqFt: Math.round(roomWidth * rowHeight),
      });

      currentX += roomWidth;
    });

    currentY += rowHeight;
  });

  return placedRooms;
}
