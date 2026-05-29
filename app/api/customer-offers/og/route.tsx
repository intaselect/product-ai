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
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";

  const id = getIdFromSlug(slug);

  if (!id) {
    return new Response("Invalid slug", { status: 400 });
  }

  const { data: offer } = await supabase
    .from("customer_offers")
    .select("product_name, price")
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#071b14",
          color: "white",
          padding: "40px",
        }}
      >
        <div style={{ fontSize: 42 }}>
          BPS Chat Market
        </div>

        <div
          style={{
            fontSize: 58,
            fontWeight: 900,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          {offer.product_name}
        </div>

        <div
          style={{
            fontSize: 50,
            color: "#facc15",
            marginTop: 30,
          }}
        >
          {offer.price}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}