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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#071b14",
          color: "white",
          fontSize: 72,
          fontWeight: 900,
        }}
      >
        <div>BPS Chat Market</div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#22c55e" }}>
          عروض العملاء والمتاجر
        </div>
        <div style={{ fontSize: 28, marginTop: 22, color: "#a7f3d0" }}>
          www.bpschat.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}