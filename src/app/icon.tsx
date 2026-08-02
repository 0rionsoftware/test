import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the Millwright ring mark on the brand's near-black. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08090a",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            width: 17,
            height: 17,
            borderRadius: 999,
            border: "3px solid #e8a83d",
          }}
        />
      </div>
    ),
    size,
  );
}
