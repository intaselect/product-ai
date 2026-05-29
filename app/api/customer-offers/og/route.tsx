import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

const SITE_URL = "https://www.bpschat.com";

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
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";
  const id = getIdFromSlug(slug);

  if (!id) {
    return new Response("Invalid slug", { status: 400 });
  }

  const { data: offer } = await supabase
    .from("customer_offers")
    .select("product_name, price, image_url, store_name, country")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (!offer) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#071b14",
          color: "white",
          padding: "45px",
          fontFamily: "Arial",
        }}
      >
        <div style={{ width: "52%", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#22c55e" }}>
            BPS Chat Market
          </div>

          <div style={{ fontSize: 48, fontWeight: 900, marginTop: 30, lineHeight: 1.35 }}>
            {offer.product_name}
          </div>

          <div style={{ fontSize: 42, fontWeight: 900, marginTop: 30, color: "#facc15" }}>
            {offer.price}
          </div>

          <div style={{ fontSize: 26, marginTop: 20 }}>
            {offer.store_name || "BPS Market"}
          </div>

          <div style={{ fontSize: 24, marginTop: "auto", color: "#a7f3d0" }}>
            www.bpschat.com
          </div>
        </div>

        <div
          style={{
            width: "48%",
            background: "white",
            borderRadius: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          <img
            src={offer.image_url}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}