import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

export default async function sitemap() {
  const [{ data: offers }, { data: cachedProducts }] = await Promise.all([
    supabase
      .from("customer_offers")
      .select("id, product_name, country, updated_at")
      .eq("status", "approved")
      .order("updated_at", { ascending: false })
      .limit(50000),

    supabase
      .from("product_cache")
      .select("query, country, updated_at, results")
      .order("updated_at", { ascending: false })
      .limit(50000),
  ]);

  const offerUrls =
    offers?.flatMap((item) => {
      const name = slugify(item.product_name || "product");
      const country = item.country || "sa";

      return [
        {
          url: `${SITE_URL}/customer-offers/product/${name}-${country}-${item.id}`,
          lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
        },
        {
          url: `${SITE_URL}/customer-offers/card/${name}-${country}-${item.id}`,
          lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
        },
      ];
    }) || [];

  const productHubUrls =
    cachedProducts
      ?.filter((item: any) => {
        return (
          item?.query &&
          item?.country &&
          Array.isArray(item?.results) &&
          item.results.length > 0
        );
      })
      .map((item: any) => {
        const query = slugify(item.query || "product");
        const country = item.country || "sa";

        return {
          url: `${SITE_URL}/product/${query}-${country}`,
          lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
        };
      }) || [];

  return [...offerUrls, ...productHubUrls];
}