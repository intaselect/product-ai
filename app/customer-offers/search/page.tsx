import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { cookies, headers } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function offerSeoUrl(offer: any) {
  return `/customer-offers/product/bps-chat-${slugify(
    offer.product_name
  )}-${offer.country || "sa"}-${offer.id}`;
}

const countryNames: Record<string, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  kw: "الكويت",
  qa: "قطر",
  bh: "البحرين",
  eg: "مصر",
};
async function detectCountry() {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieCountry =
    cookieStore.get("bps_country")?.value ||
    cookieStore.get("country")?.value;

  if (cookieCountry) return cookieCountry;

  const vercelCountry =
    headerStore.get("x-vercel-ip-country")?.toLowerCase();

  const map: Record<string, string> = {
    sa: "sa",
    ae: "ae",
    kw: "kw",
    qa: "qa",
    bh: "bh",
    eg: "eg",
  };

  return map[vercelCountry || ""] || "sa";
}
export default async function CustomerOffersSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = String(q || "").trim();
const detectedCountry = await detectCountry();
  let offers: any[] = [];

  if (query) {
    const { data } = await supabase
  .from("customer_offers")
  .select("id, product_name, price, image_url, store_name, country")
  .eq("status", "approved")
  .eq("country", detectedCountry)
  .or(
    `product_name.ilike.%${query}%,store_name.ilike.%${query}%`
  )
  .order("created_at", { ascending: false })
  .limit(100);

    offers = data || [];
  }

  return (
    <main className="offersSearchPage" dir="rtl">
      <section className="offersSearchHero">
        <h1>نتائج البحث في عالم المنتجات</h1>
        <p>
          {query
            ? `نتائج البحث عن: ${query}`
            : "اكتب اسم المنتج في البحث أعلى الصفحة"}
        </p>
      </section>

      {query && offers.length === 0 && (
        <div className="offersSearchEmpty">
          لا توجد منتجات مطابقة حاليًا.
        </div>
      )}

      <section className="offersSearchGrid">
        {offers.map((offer) => (
          <Link
            key={offer.id}
            href={offerSeoUrl(offer)}
            className="offersSearchCard"
          >
            <div className="offersSearchImage">
              <img src={offer.image_url} alt={offer.product_name} />
            </div>

            <div className="offersSearchInfo">
              <small>{countryNames[offer.country] || offer.country}</small>
              <h2>{offer.product_name}</h2>
              <strong>{offer.price}</strong>
              <span>{offer.store_name || "متجر موثوق"}</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}