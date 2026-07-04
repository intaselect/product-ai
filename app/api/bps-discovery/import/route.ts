import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export async function POST(req: Request) {
  try {
    const secret = req.headers.get("x-bps-secret");

    if (secret !== process.env.BPS_DISCOVERY_SECRET) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const title = String(body.title || "").trim();
    const country = String(body.country || "sa").trim();
    const offers = Array.isArray(body.offers) ? body.offers : [];

    if (!title || offers.length === 0) {
      return NextResponse.json(
        { ok: false, error: "title and offers are required" },
        { status: 400 }
      );
    }

    const slug = `${slugify(title)}-${country}`;

    const { data: product, error: productError } = await supabase
      .from("bps_products")
      .upsert(
        {
          title,
          slug,
          country,
          image_url: body.image_url || offers[0]?.image_url || null,
          description: body.description || null,
          brand: body.brand || null,
          category: body.category || "other",
          specs: body.specs || {},
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { ok: false, error: productError?.message || "product error" },
        { status: 500 }
      );
    }

    let saved = 0;

    for (const offer of offers) {
      const product_url = String(offer.product_url || "").trim();
      if (!product_url) continue;

      const { data: savedOffer, error: offerError } = await supabase
        .from("bps_product_offers")
        .upsert(
          {
            product_id: product.id,
            store_name: offer.store_name || null,
            product_title: offer.product_title || null,
            product_url,
            image_url: offer.image_url || null,
            price: offer.price || null,
            availability: offer.availability || "unknown",
            country,
            last_checked: new Date().toISOString(),
          },
          { onConflict: "product_id,product_url" }
        )
        .select("id")
        .single();

      if (offerError || !savedOffer) continue;

      await supabase.from("bps_price_history").insert({
        offer_id: savedOffer.id,
        price: offer.price || null,
        availability: offer.availability || "unknown",
      });

      saved++;
    }

    return NextResponse.json({
      ok: true,
      product_id: product.id,
      slug,
      saved,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "unexpected error" },
      { status: 500 }
    );
  }
}