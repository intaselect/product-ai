"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function getCountryFromUrl() {
  if (typeof window === "undefined") return "sa";

  const url = new URL(window.location.href);
  const queryCountry = url.searchParams.get("country");

  if (queryCountry) return queryCountry;

  const path = window.location.pathname;

  const match = path.match(/-(sa|ae|eg|kw|qa|bh)-\d+$/);
  if (match?.[1]) return match[1];

  const savedCountry =
    localStorage.getItem("country") ||
    localStorage.getItem("selectedCountry") ||
    "sa";

  return savedCountry;
}

export default function GlobalAdsSlider() {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    const country = getCountryFromUrl();

    fetch(`/api/global-ads?country=${encodeURIComponent(country)}`)
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