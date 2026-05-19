import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";

  const parts = decodeURIComponent(slug).split("-");
  const country = parts.pop() || "";
  const query = parts.join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #071311, #0b0f14)",
          color: "white",
          padding: "60px",
          fontFamily: "Arial",
          direction: "rtl",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 900, marginBottom: 24 }}>
          BPS Chat | بي بي اس شات
        </div>

        <div style={{ fontSize: 58, fontWeight: 900, textAlign: "center" }}>
          مقارنة أسعار {query}
        </div>

        <div style={{ fontSize: 34, marginTop: 24, color: "#00ffd0" }}>
          عروض وأسعار في {country}
        </div>

        <div style={{ fontSize: 26, marginTop: 40, color: "#ccc" }}>
          Amazon • Noon • Jumia • Jarir • Extra
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}