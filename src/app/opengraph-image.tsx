import { ImageResponse } from "next/og";

// Default Open Graph / Twitter image for every page (overridden per blog post
// when it has a cover image). Branded card, no external assets/fonts.
export const alt = "A88 Finance Group — Real Finance Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background:
            "linear-gradient(135deg, #0b2a4a 0%, #0e3360 55%, #124a86 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
            marginBottom: "44px",
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 20,
              background: "#ed9732",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 800,
              color: "#0b2a4a",
            }}
          >
            A88
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            Finance Group
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          Real Finance Solutions from Someone Who Gets It
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#f6b968",
            marginTop: 34,
          }}
        >
          Personal · Business · Car Finance — for everyday Australians
        </div>
      </div>
    ),
    { ...size },
  );
}
