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

  return localStorage.getItem("country") || localStorage.getItem("selectedCountry") || "sa";
}

export default function GlobalAdsSlider() {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    const country = getCountryFromUrl();

    fetch(`/api/global-ads?country=${encodeURIComponent(country)}`)
      .then((r) => r.json())
      .then((data) => setAds(data || []))
      .catch(() => {});
  }, []);

  if (!ads.length) return null;

  return (
    <section className="globalAdsBox" dir="rtl">
      <div className="globalAdsTitle">🔥 إعلانات مميزة</div>

      <div className="globalAdsScroll">
        {ads.map((item) => (
          <Link
            key={item.id}
            href={`/customer-offers/product/bps-chat-${item.slug}`}
            className="globalAdMiniCard"
          >
            <img src={item.image_url} alt={item.product_name} />

            <div>
              <span>إعلان</span>
              <strong>{item.price}</strong>
            </div>
          </Link>
        ))}
      </div>

    <style jsx>{`
  .globalAdsBox {
    width: 100%;
    background: rgba(255,255,255,.96);
    border-bottom: 1px solid #e5e7eb;
    padding: 4px 0;
    overflow: hidden;
  }

  .globalAdsTitle {
    display: none;
  }

  .globalAdsScroll {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    gap: 7px;
    overflow-x: auto;
    padding: 2px 8px 4px;
    scrollbar-width: none;
  }

  .globalAdsScroll::-webkit-scrollbar {
    display: none;
  }

  .globalAdMiniCard {
    min-width: 70px;
    max-width: 70px;
    height: 86px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    text-decoration: none;
    color: #111827;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(15,23,42,.06);
  }

  .globalAdMiniCard img {
    width: 52px;
    height: 42px;
    object-fit: contain;
    display: block;
  }

  .globalAdMiniCard div {
    width: 100%;
    text-align: center;
    line-height: 1.1;
  }

  .globalAdMiniCard span {
    display: inline-block;
    font-size: 8px;
    color: #f59e0b;
    font-weight: 950;
    margin-bottom: 1px;
  }

  .globalAdMiniCard strong {
    display: block;
    font-size: 10px;
    color: #16a34a;
    font-weight: 950;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 700px) {
    .globalAdsBox {
      padding: 3px 0;
    }

    .globalAdsScroll {
      gap: 6px;
      padding: 2px 7px 3px;
    }

    .globalAdMiniCard {
      min-width: 64px;
      max-width: 64px;
      height: 80px;
      border-radius: 11px;
      padding: 4px;
    }

    .globalAdMiniCard img {
      width: 48px;
      height: 38px;
    }

    .globalAdMiniCard strong {
      font-size: 9px;
    }
  }
`}</style>
    </section>
  );
}