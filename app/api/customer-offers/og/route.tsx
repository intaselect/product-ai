import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getIdFromSlug(slug: string) {
  const parts = slug.split("-");
  const id = Number(parts[parts.length - 1]);
  return Number.isFinite(id) ? id : null;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "";
    const id = getIdFromSlug(slug);

    if (!id) {
      return new Response("Invalid slug", { status: 400 });
    }

    const { data: offer } = await supabase
      .from("customer_offers")
      .select("product_name, price, image_url, store_name")
      .eq("id", id)
      .eq("status", "approved")
      .single();

    if (!offer) {
      return new Response("Not found", { status: 404 });
    }

    const productName = String(offer.product_name || "عرض من BPS Chat").slice(0, 90);
    const price = String(offer.price || "");
    const storeName = String(offer.store_name || "BPS Market");

    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            background: "linear-gradient(135deg, #061b13, #0f172a)",
            color: "white",
            padding: "46px",
            fontFamily: "Arial",
          }}
        >
          <div
            style={{
              width: "55%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 38, fontWeight: 900, color: "#22c55e" }}>
              BPS Chat Market
            </div>

            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                marginTop: 30,
                lineHeight: 1.35,
              }}
            >
              {productName}
            </div>

            <div
              style={{
                fontSize: 42,
                fontWeight: 900,
                marginTop: 28,
                color: "#facc15",
              }}
            >
              {price}
            </div>

            <div style={{ fontSize: 28, marginTop: 22 }}>
              {storeName}
            </div>

            <div style={{ fontSize: 24, marginTop: 36, color: "#a7f3d0" }}>
              www.bpschat.com
            </div>
          </div>

          <div
            style={{
              width: "45%",
              borderRadius: "34px",
              background: "white",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 120,
              fontWeight: 900,
            }}
          >
            BPS
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response("OG image error", { status: 500 });
  }
}