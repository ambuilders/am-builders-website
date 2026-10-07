import type { WallSide } from "./types";

export type PerimeterPoint = { x: number; y: number; wallSide: WallSide };

// Converts a wall-relative position (as extracted from an uploaded floor
// plan — "on the top wall, 40% of the way along") into basement
// coordinates. Top/bottom walls run along the width; left/right walls run
// along the height.
export function pointOnWall(width: number, height: number, wallSide: WallSide, fraction: number): PerimeterPoint {
  const f = Math.min(1, Math.max(0, fraction));
  switch (wallSide) {
    case "top":
      return { x: f * width, y: 0, wallSide };
    case "bottom":
      return { x: f * width, y: height, wallSide };
    case "left":
      return { x: 0, y: f * height, wallSide };
    case "right":
      return { x: width, y: f * height, wallSide };
  }
}

// Walks the outer basement rectangle's perimeter clockwise from the
// top-left corner and returns the point at `fraction` (0-1) around it.
export function pointOnPerimeter(width: number, height: number, fraction: number): PerimeterPoint {
  const perimeter = 2 * (width + height);
  let distance = ((fraction % 1) + 1) % 1;
  distance *= perimeter;

  if (distance <= width) {
    return { x: distance, y: 0, wallSide: "top" };
  }
  distance -= width;
  if (distance <= height) {
    return { x: width, y: distance, wallSide: "right" };
  }
  distance -= height;
  if (distance <= width) {
    return { x: width - distance, y: height, wallSide: "bottom" };
  }
  distance -= width;
  return { x: 0, y: height - distance, wallSide: "left" };
}

function distanceAlongPerimeter(width: number, height: number, a: PerimeterPoint, b: PerimeterPoint): number {
  const toLinear = (p: PerimeterPoint) => {
    if (p.wallSide === "top") return p.x;
    if (p.wallSide === "right") return width + p.y;
    if (p.wallSide === "bottom") return width + height + (width - p.x);
    return 2 * width + height + (height - p.y);
  };
  const perimeter = 2 * (width + height);
  const diff = Math.abs(toLinear(a) - toLinear(b));
  return Math.min(diff, perimeter - diff);
}

// Evenly distributes `count` window points around the perimeter, skipping
// any point that would land within `avoidRadiusFt` of the entry (if given).
export function placeWindowsOnPerimeter(
  width: number,
  height: number,
  count: number,
  avoid?: PerimeterPoint,
  avoidRadiusFt = 3,
): PerimeterPoint[] {
  if (count <= 0) return [];

  const points: PerimeterPoint[] = [];
  const step = 1 / (count + 1);
  let fraction = step;
  let attempts = 0;

  while (points.length < count && attempts < count * 6) {
    const candidate = pointOnPerimeter(width, height, fraction);
    const tooCloseToEntry = avoid && distanceAlongPerimeter(width, height, candidate, avoid) < avoidRadiusFt;
    const tooCloseToCorner =
      Math.min(candidate.x, width - candidate.x) < 1.5 && Math.min(candidate.y, height - candidate.y) < 1.5;

    if (!tooCloseToEntry && !tooCloseToCorner) {
      points.push(candidate);
      fraction += step;
    } else {
      fraction += step / 3;
    }
    attempts++;
  }

  return points;
}
