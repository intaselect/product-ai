import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

export default async function sitemap() {
  const { data } = await supabase
    .from("customer_offers")
    .select("id, product_name, country, updated_at")
    .eq("status", "approved")
    .order("updated_at", { ascending: false })
    .limit(50000);

  return (
    data?.map((item) => {
      const name = slugify(item.product_name || "product");
      const country = item.country || "sa";

      return {
        url: `https://www.bpschat.com/customer-offers/product/${name}-${country}-${item.id}`,
        lastModified: item.updated_at
          ? new Date(item.updated_at)
          : new Date(),
      };
    }) || []
  );
}