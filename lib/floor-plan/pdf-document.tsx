import fs from "fs";
import path from "path";
import { Fragment } from "react";
import {
  Document,
  Image,
  Line,
  Page,
  Path,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { siteConfig } from "@/lib/site-config";
import type { DoorMark, EntryMark, FloorPlanInput, FloorPlanLayout, RoomKind, WallSide, WindowMark } from "./types";

export const DISCLAIMER =
  "Concept Layouts — for illustration purposes. Final design subject to a site walkthrough, structural assessment, and permit review by AM Builders.";

const ROOM_FILL: Record<RoomKind, string> = {
  bedroom: "#dce8f5",
  closet: "#eef2f7",
  bathroom: "#d7f0ec",
  "half-bathroom": "#d7f0ec",
  kitchen: "#fdf1d6",
  "wet-bar": "#f3ddf0",
  "games-room": "#e3f2d9",
  utility: "#e9e9e9",
  hallway: "#f4f4f4",
  "existing-feature": "#f0e4d4",
};

// Set by the API route based on whether a floor plan was uploaded and how
// well Claude could read it — drives the per-page grounding note and the
// "some measurements were estimated" caveat.
export type UploadContext = {
  fileUploaded: boolean;
  showEstimatedNote: boolean;
};

const DIAGRAM_MAX_WIDTH_PT = 470;
const DIAGRAM_MAX_HEIGHT_PT = 300;

function computeScale(widthFt: number, heightFt: number) {
  return Math.min(DIAGRAM_MAX_WIDTH_PT / widthFt, DIAGRAM_MAX_HEIGHT_PT / heightFt);
}

function feetInchesLabel(ft: number) {
  const whole = Math.floor(ft);
  const inches = Math.round((ft - whole) * 12);
  if (inches === 12) return `${whole + 1}'`;
  return inches === 0 ? `${whole}'` : `${whole}'${inches}"`;
}

type DoorSymbol = { leaf: [number, number, number, number]; arc: string };

// All four wall orientations swing the door leaf INTO the basement interior.
function doorSymbol(xFt: number, yFt: number, wallSide: WallSide, radiusFt: number, scale: number): DoorSymbol {
  const x = xFt * scale;
  const y = yFt * scale;
  const r = radiusFt * scale;

  switch (wallSide) {
    case "left":
      return { leaf: [x, y, x, y + r], arc: `M ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y}` };
    case "right":
      return { leaf: [x, y, x, y + r], arc: `M ${x} ${y + r} A ${r} ${r} 0 0 0 ${x - r} ${y}` };
    case "top":
      return { leaf: [x, y, x + r, y], arc: `M ${x + r} ${y} A ${r} ${r} 0 0 1 ${x} ${y + r}` };
    case "bottom":
      return { leaf: [x, y, x + r, y], arc: `M ${x + r} ${y} A ${r} ${r} 0 0 0 ${x} ${y - r}` };
  }
}

function windowLine(mark: WindowMark, scale: number) {
  const half = (mark.widthFt / 2) * scale;
  const x = mark.x * scale;
  const y = mark.y * scale;
  if (mark.wallSide === "top" || mark.wallSide === "bottom") {
    return { x1: x - half, y1: y, x2: x + half, y2: y };
  }
  return { x1: x, y1: y - half, x2: x, y2: y + half };
}

function readPublicAsset(relativePath: string): Buffer | undefined {
  try {
    return fs.readFileSync(path.join(process.cwd(), "public", relativePath));
  } catch {
    return undefined;
  }
}

function FloorPlanDiagram({ layout }: { layout: FloorPlanLayout }) {
  const scale = computeScale(layout.basementWidthFt, layout.basementHeightFt);
  const width = layout.basementWidthFt * scale;
  const height = layout.basementHeightFt * scale;

  return (
    <View style={styles.diagramWrap}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {layout.rooms.map((room) => (
          <Rect
            key={room.id}
            x={room.x * scale}
            y={room.y * scale}
            width={room.width * scale}
            height={room.height * scale}
            fill={ROOM_FILL[room.kind]}
            stroke="#1c1714"
            strokeWidth={1}
          />
        ))}

        {layout.rooms
          .filter((room) => room.width * scale > 34 && room.height * scale > 20)
          .map((room) => (
            <Text
              key={`${room.id}-label`}
              x={(room.x + room.width / 2) * scale}
              y={(room.y + room.height / 2) * scale - 3}
              style={styles.roomLabel}
            >
              {room.label}
            </Text>
          ))}

        {layout.rooms
          .filter((room) => room.kind !== "hallway" && room.kind !== "closet" && room.width * scale > 34 && room.height * scale > 20)
          .map((room) => (
            <Text
              key={`${room.id}-dims`}
              x={(room.x + room.width / 2) * scale}
              y={(room.y + room.height / 2) * scale + 9}
              style={styles.roomDims}
            >
              {`${feetInchesLabel(room.width)} x ${feetInchesLabel(room.height)}`}
            </Text>
          ))}

        {/* Outer wall outline, drawn heavier than interior partitions */}
        <Rect x={0} y={0} width={width} height={height} fill="none" stroke="#1c1714" strokeWidth={2.5} />

        {layout.doors.map((door: DoorMark, index) => {
          const symbol = doorSymbol(door.x, door.y, door.wallSide, door.widthFt, scale);
          return (
            <Fragment key={`door-${index}`}>
              <Line
                x1={symbol.leaf[0]}
                y1={symbol.leaf[1]}
                x2={symbol.leaf[2]}
                y2={symbol.leaf[3]}
                stroke="#1c1714"
                strokeWidth={1}
              />
              <Path d={symbol.arc} stroke="#8f7d6a" strokeWidth={0.75} fill="none" />
            </Fragment>
          );
        })}

        {layout.windows.map((win, index) => {
          const line = windowLine(win, scale);
          return (
            <Line
              key={`window-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#2f6f9e"
              strokeWidth={3.5}
            />
          );
        })}

        {layout.entry &&
          (() => {
            const entry = layout.entry as EntryMark;
            const symbol = doorSymbol(entry.x, entry.y, entry.wallSide, entry.widthFt, scale);
            return (
              <Fragment>
                <Line
                  x1={symbol.leaf[0]}
                  y1={symbol.leaf[1]}
                  x2={symbol.leaf[2]}
                  y2={symbol.leaf[3]}
                  stroke="#984322"
                  strokeWidth={1.5}
                />
                <Path d={symbol.arc} stroke="#984322" strokeWidth={1} fill="none" />
              </Fragment>
            );
          })()}
      </Svg>

      <View style={styles.scaleBar}>
        <View style={{ width: 10 * scale, height: 3, backgroundColor: "#1c1714" }} />
        <Text style={styles.scaleBarLabel}>= 10 ft (approx.)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
  },
  coverLogo: { width: 64, height: 64, marginBottom: 16 },
  coverTitle: { fontSize: 24, fontFamily: "Helvetica-Bold", color: "#1c1714", marginBottom: 8 },
  coverSubtitle: { fontSize: 12, color: "#423830", marginBottom: 24, lineHeight: 1.5 },
  specTable: { borderTopWidth: 1, borderTopColor: "#d1c7bb", paddingTop: 12 },
  specRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  specLabel: { fontSize: 10, color: "#6f5f4e" },
  specValue: { fontSize: 10, color: "#1c1714", fontFamily: "Helvetica-Bold" },
  pageTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#1c1714", marginBottom: 4 },
  pageSubtitle: { fontSize: 10, color: "#423830", marginBottom: 8, lineHeight: 1.4 },
  groundingNote: { fontSize: 9, fontFamily: "Helvetica-Oblique", color: "#984322", marginBottom: 4 },
  estimatedNote: { fontSize: 9, color: "#6f5f4e", marginBottom: 16, lineHeight: 1.4 },
  diagramWrap: { alignItems: "center", marginTop: 8 },
  roomLabel: { fontSize: 8, fontFamily: "Helvetica-Bold", fill: "#1c1714", textAnchor: "middle" },
  roomDims: { fontSize: 6.5, fill: "#564a3d", textAnchor: "middle" },
  scaleBar: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 6 },
  scaleBarLabel: { fontSize: 8, color: "#6f5f4e" },
  legend: { flexDirection: "row", flexWrap: "wrap", marginTop: 16, gap: 12 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4, marginRight: 12, marginBottom: 4 },
  legendSwatch: { width: 8, height: 8, borderWidth: 0.5, borderColor: "#1c1714" },
  legendLabel: { fontSize: 8, color: "#423830" },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    fontSize: 7.5,
    color: "#8f7d6a",
    textAlign: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#d1c7bb",
    paddingTop: 6,
  },
  ctaTitle: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#1c1714", marginBottom: 12 },
  ctaBody: { fontSize: 11, color: "#423830", lineHeight: 1.6, marginBottom: 20 },
  ctaBox: { backgroundColor: "#faf6ee", borderWidth: 1, borderColor: "#e8e3dd", padding: 16, borderRadius: 4 },
  ctaLine: { fontSize: 11, color: "#1c1714", marginBottom: 4 },
});

function Footer() {
  return (
    <Text style={styles.footer} fixed>
      {DISCLAIMER}
    </Text>
  );
}

const LEGEND_ENTRIES: { kind: RoomKind; label: string }[] = [
  { kind: "bedroom", label: "Bedroom" },
  { kind: "bathroom", label: "Bathroom" },
  { kind: "kitchen", label: "Kitchenette" },
  { kind: "wet-bar", label: "Wet Bar" },
  { kind: "games-room", label: "Games Room" },
  { kind: "utility", label: "Utility" },
  { kind: "hallway", label: "Hallway" },
  { kind: "existing-feature", label: "Existing (Preserved)" },
];

function Legend() {
  return (
    <View style={styles.legend}>
      {LEGEND_ENTRIES.map((entry) => (
        <View key={entry.kind} style={styles.legendItem}>
          <View style={[styles.legendSwatch, { backgroundColor: ROOM_FILL[entry.kind] }]} />
          <Text style={styles.legendLabel}>{entry.label}</Text>
        </View>
      ))}
    </View>
  );
}

function specSummary(input: FloorPlanInput) {
  const bathroomLabel = input.bathrooms === Math.floor(input.bathrooms)
    ? `${input.bathrooms}`
    : `${input.bathrooms}`;

  return [
    { label: "Basement area", value: `${input.areaSqFt} sq ft` },
    { label: "Bedrooms", value: `${input.bedrooms}` },
    { label: "Bathrooms", value: bathroomLabel },
    { label: "Ceiling height", value: ceilingHeightLabel(input.ceilingHeight) },
    { label: "Kitchenette", value: input.hasKitchen ? "Yes" : "No" },
    { label: "Wet bar", value: input.hasWetBar ? "Yes" : "No" },
    { label: "Games room", value: input.hasGamesRoom ? "Yes" : "No" },
    { label: "Windows", value: input.hasWindows ? `${input.windowCount}` : "None" },
    { label: "Side entry", value: input.hasSideEntry ? "Yes" : "No" },
  ];
}

function ceilingHeightLabel(band: FloorPlanInput["ceilingHeight"]) {
  if (band === "under-7-6") return "Under 7'6\"";
  if (band === "7-6-to-8") return "7'6\" - 8'";
  return "8'+";
}

export function FloorPlanDocument({
  layouts,
  input,
  leadName,
  uploadContext,
}: {
  layouts: FloorPlanLayout[];
  input: FloorPlanInput;
  leadName: string;
  uploadContext?: UploadContext;
}) {
  const logo = readPublicAsset("logo.png");

  return (
    <Document title="AM Builders — Concept Floor Plans">
      <Page size="LETTER" style={styles.page}>
        {/* eslint-disable-next-line jsx-a11y/alt-text -- this is @react-pdf/renderer's PDF Image node, not an HTML <img>; it has no alt prop */}
        {logo && <Image src={logo} style={styles.coverLogo} />}
        <Text style={styles.coverTitle}>Your Basement Concept Floor Plans</Text>
        <Text style={styles.coverSubtitle}>
          Hi {leadName || "there"} — thanks for using the AM Builders basement floor plan tool. Based on the
          details you provided, we put together three concept layouts to help you start imagining what your
          finished basement could look like. Take a look at all three on the following pages.
        </Text>
        <View style={styles.specTable}>
          {specSummary(input).map((row) => (
            <View key={row.label} style={styles.specRow}>
              <Text style={styles.specLabel}>{row.label}</Text>
              <Text style={styles.specValue}>{row.value}</Text>
            </View>
          ))}
        </View>
        <Footer />
      </Page>

      {layouts.map((layout) => (
        <Page key={layout.variationNumber} size="LETTER" style={styles.page}>
          <Text style={styles.pageTitle}>{`Concept Layout ${layout.variationNumber} — ${layout.variationName}`}</Text>
          <Text style={styles.pageSubtitle}>{layout.variationDescription}</Text>
          {uploadContext?.fileUploaded && (
            <Text style={styles.groundingNote}>
              {layout.groundedInUpload ? "Based on your uploaded floor plan." : "Based on your provided basement dimensions."}
            </Text>
          )}
          {uploadContext?.showEstimatedNote && (
            <Text style={styles.estimatedNote}>
              Some measurements were estimated — we&apos;ll confirm exact dimensions during your free consultation.
            </Text>
          )}
          <FloorPlanDiagram layout={layout} />
          <Legend />
          <Footer />
        </Page>
      ))}

      <Page size="LETTER" style={styles.page}>
        <Text style={styles.ctaTitle}>Ready to make this real?</Text>
        <Text style={styles.ctaBody}>
          These concept layouts are a starting point for the conversation, not a finished design. Book a free
          consultation with AM Builders and our team will walk your space, confirm what&apos;s structurally
          possible, and turn a concept you like into a permit-ready plan.
        </Text>
        <View style={styles.ctaBox}>
          <Text style={styles.ctaLine}>Book a free consultation with AM Builders</Text>
          <Text style={styles.ctaLine}>Phone: {siteConfig.contact.phone}</Text>
          <Text style={styles.ctaLine}>Email: {siteConfig.contact.email}</Text>
          <Text style={styles.ctaLine}>{siteConfig.url}/contact?type=consultation</Text>
        </View>
        <Footer />
      </Page>
    </Document>
  );
}

export async function renderFloorPlanPdf(
  layouts: FloorPlanLayout[],
  input: FloorPlanInput,
  leadName: string,
  uploadContext?: UploadContext,
): Promise<Buffer> {
  return renderToBuffer(
    <FloorPlanDocument layouts={layouts} input={input} leadName={leadName} uploadContext={uploadContext} />,
  );
}
