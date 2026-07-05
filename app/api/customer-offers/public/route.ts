import { NextResponse } from "next/server";
import { getApprovedOffers } from "@/lib/local-db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const countries = ["sa", "ae", "kw", "qa", "bh", "eg"];

export async function GET() {
  try {
    const offers = getApprovedOffers()
      .filter((offer: any) => countries.includes(offer.country))
      .sort(
        (a: any, b: any) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      )
      .slice(0, 3600)
      .map((offer: any) => ({
        id: offer.id,
        product_name: offer.product_name,
        price: offer.price,
        image_url: offer.image_url,
        product_url: offer.product_url,
        country: offer.country,
        store_name: offer.store_name,
        created_at: offer.created_at,
        best_offer: offer.best_offer || false,
      }));

    return NextResponse.json({ ok: true, offers });
  } catch (error) {
    console.error("LOCAL_PUBLIC_OFFERS_ERROR:", error);
    return NextResponse.json({ ok: false, offers: [] }, { status: 500 });
  }
}