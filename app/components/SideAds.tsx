import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function SideAds() {
  const { data } = await supabase
    .from("customer_offers")
    .select("*")
    .eq("status", "approved")
    .eq("side_ad", true)
    .limit(12);

  if (!data?.length) return null;

  const left = data.slice(0, 6);
  const right = data.slice(6, 12);

  return (
    <>
      <div className="sideAds sideAdsLeft">
        {left.map((item) => (
          <Link
            key={item.id}
            href={`/customer-offers/product/bps-chat-${item.id}`}
            className="sideAdCard"
          >
            <img
              src={item.image_url}
              alt={item.product_name}
            />

            <div className="sideAdName">
              {item.product_name}
            </div>

            <div className="sideAdPrice">
              {item.price}
            </div>
          </Link>
        ))}
      </div>

      <div className="sideAds sideAdsRight">
        {right.map((item) => (
          <Link
            key={item.id}
            href={`/customer-offers/product/bps-chat-${item.id}`}
            className="sideAdCard"
          >
            <img
              src={item.image_url}
              alt={item.product_name}
            />

            <div className="sideAdName">
              {item.product_name}
            </div>

            <div className="sideAdPrice">
              {item.price}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}