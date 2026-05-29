import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#071b14",
          color: "white",
          fontSize: 90,
          fontWeight: 900,
        }}
      >
        BPS Chat Market
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}