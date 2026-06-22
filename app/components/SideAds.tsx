import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function detectCountry() {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieCountry =
    cookieStore.get("bps_country")?.value ||
    cookieStore.get("country")?.value;

  const vercelCountry =
    headerStore.get("x-vercel-ip-country");

  const country = String(cookieCountry || vercelCountry || "")
    .toLowerCase()
    .trim();

  const map: Record<string, string> = {
    sa: "sa",
    eg: "eg",
    ae: "ae",
    kw: "kw",
    qa: "qa",
    bh: "bh",
  };

  return map[country] || "";
}

export default async function SideAds() {
  const country = await detectCountry();

  if (!country) return null;

  const { data } = await supabase
    .from("customer_offers")
    .select("*")
    .eq("status", "approved")
    .eq("side_ad", true)
    .eq("country", country)
    .limit(12);

  if (!data?.length) return null;

  const left = data.slice(0, 6);
  const right = data.slice(6, 12);

  const makeSlug = (item: any) =>
    `/customer-offers/product/bps-chat-${String(item.product_name || "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")}-${item.country || country}-${
      item.id
    }`;

  return (
    <>
      <div className="sideAds sideAdsLeft">
        {left.map((item) => (
          <Link key={item.id} href={makeSlug(item)} className="sideAdCard">
            <img src={item.image_url} alt={item.product_name} />
            <div className="sideAdName">{item.product_name}</div>
            <div className="sideAdPrice">{item.price}</div>
          </Link>
        ))}
      </div>

      <div className="sideAds sideAdsRight">
        {right.map((item) => (
          <Link key={item.id} href={makeSlug(item)} className="sideAdCard">
            <img src={item.image_url} alt={item.product_name} />
            <div className="sideAdName">{item.product_name}</div>
            <div className="sideAdPrice">{item.price}</div>
          </Link>
        ))}
      </div>
    </>
  );
}