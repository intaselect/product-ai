import { ImageResponse } from "next/og";

export const runtime = "edge";

function getIdFromSlug(slug: string) {
  const parts = slug.split("-");
  const id = Number(parts[parts.length - 1]);
  return Number.isFinite(id) ? id : null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";
  const id = getIdFromSlug(slug);

  if (!id) return new Response("Invalid slug", { status: 400 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/customer_offers?id=eq.${id}&status=eq.approved&select=product_name,price,store_name`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  const offer = data?.[0];

  if (!offer) return new Response("Not found", { status: 404 });

  const productName = String(offer.product_name || "BPS Chat Market").slice(0, 80);
  const price = String(offer.price || "");
  const storeName = String(offer.store_name || "BPS Market");

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
          background: "#071b14",
          color: "white",
          padding: "50px",
        }}
      >
        <div style={{ fontSize: 42, color: "#22c55e", fontWeight: 900 }}>
          BPS Chat Market
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            marginTop: 30,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          {productName}
        </div>

        <div
          style={{
            fontSize: 52,
            color: "#facc15",
            marginTop: 32,
            fontWeight: 900,
          }}
        >
          {price}
        </div>

        <div style={{ fontSize: 28, marginTop: 24 }}>
          {storeName}
        </div>

        <div style={{ fontSize: 24, marginTop: 34, color: "#a7f3d0" }}>
          www.bpschat.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}