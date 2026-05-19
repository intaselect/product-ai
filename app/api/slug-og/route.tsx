import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";

  const parts = decodeURIComponent(slug).split("-");
  const country = parts.pop() || "";
  const query = parts.join(" ");

  // 🟢 نجيب المنتجات
  const res = await fetch(
    `https://www.bpschat.com/api/search?query=${encodeURIComponent(query)}&country=${country}`
  );

  const json = await res.json();
  const products = (json?.value || []).slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#0b0f14",
          color: "white",
          padding: "40px",
          fontFamily: "Arial",
        }}
      >
        {/* عنوان */}
        <div style={{ fontSize: 42, fontWeight: 900 }}>
          BPS Chat | بي بي اس شات
        </div>

        <div style={{ fontSize: 52, marginTop: 20, fontWeight: 800 }}>
          مقارنة أسعار {query}
        </div>

        <div style={{ fontSize: 28, marginTop: 10, color: "#00ffd0" }}>
          في {country}
        </div>

        {/* المنتجات */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {products.map((p: any, i: number) => (
            <div
              key={i}
              style={{
                width: "300px",
                background: "#111",
                borderRadius: "16px",
                padding: "10px",
              }}
            >
              <img
                src={p.image || p.thumbnail}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  background: "#fff",
                  borderRadius: "10px",
                }}
              />

              <div
                style={{
                  fontSize: 20,
                  marginTop: 10,
                }}
              >
                {p.priceText || p.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}