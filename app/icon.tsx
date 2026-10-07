import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Real "AM Builders" mark (assets/logo/am-builders-mark from the brand
// export) — replaces the earlier "AM" text placeholder. Embedded as a data
// URI <img> rather than raw <svg>/<path> JSX since Satori's SVG element
// support is inconsistent across versions.
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><g transform="translate(110 91) scale(2.533 2.535)"><path d="M75 6 L143 54" fill="none" stroke="#26282B" stroke-width="11" stroke-linecap="square"/><path d="M7 54 L75 6" fill="none" stroke="#E2597A" stroke-width="11" stroke-linecap="square"/><rect x="28" y="66" width="16" height="20" fill="#26282B"/><rect x="67" y="66" width="16" height="20" fill="#FC8EAC"/><rect x="106" y="66" width="16" height="20" fill="#26282B"/></g></svg>`;
const markDataUri = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString("base64")}`;

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse/Satori, not a browser <img> */}
        <img src={markDataUri} width="100%" height="100%" />
      </div>
    ),
    { ...size },
  );
}
