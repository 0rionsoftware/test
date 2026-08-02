import { ImageResponse } from "next/og";

import { accentAlpha, brand } from "@/lib/brand";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: brand.canvas,
          backgroundImage:
            `radial-gradient(900px circle at 50% -10%, ${accentAlpha(0.18)}, transparent 60%)`,
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: `2px solid ${brand.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                border: `3px solid ${brand.accent}`,
              }}
            />
          </div>
          <div style={{ fontSize: 32, color: brand.content, fontWeight: 600 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              color: brand.content,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Your team is the integration layer. Let&apos;s fix that.
          </div>
          <div style={{ fontSize: 28, color: brand.contentMuted, maxWidth: 820 }}>
            AI automation — scoped, installed, and maintained.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: brand.accent,
            letterSpacing: "0.08em",
          }}
        >
          {site.domain.toUpperCase()}
        </div>
      </div>
    ),
    size,
  );
}
