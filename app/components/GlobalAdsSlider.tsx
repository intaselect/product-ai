"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function GlobalAdsSlider() {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/global-ads")
      .then((r) => r.json())
      .then((data) => {
        setAds(data || []);
      })
      .catch(() => {});
  }, []);

  if (!ads.length) return null;

  return (
    <div className="globalAdsSlider">
      <div className="globalAdsTrack">
        {ads.concat(ads).map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href={`/customer-offers/product/bps-chat-${item.slug}`}
            className="globalAdCard"
          >
            <img src={item.image_url} alt={item.product_name} />

            <div className="globalAdInfo">
              <span className="adBadge">إعلان</span>

              <strong>{item.product_name}</strong>

              <small>{item.price}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}