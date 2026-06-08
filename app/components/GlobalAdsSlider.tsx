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
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    padding: 8px 0 10px;
    overflow: hidden;
  }

  .globalAdsTitle {
    display: none;
  }

  .globalAdsScroll {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    gap: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 4px 12px 12px;
    scroll-snap-type: x mandatory;
  }

  .globalAdsScroll::-webkit-scrollbar {
    height: 7px;
  }

  .globalAdsScroll::-webkit-scrollbar-track {
    background: #e5e7eb;
    border-radius: 999px;
  }

  .globalAdsScroll::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #16a34a, #2563eb);
    border-radius: 999px;
  }

  .globalAdMiniCard {
    width: 96px;
    min-width: 96px;
    height: 126px;
    background: #ffffff;
    border: 1px solid #dbeafe;
    border-radius: 16px;
    text-decoration: none;
    color: #111827;
    display: grid;
    grid-template-rows: 72px 1fr;
    align-items: center;
    overflow: hidden;
    flex-shrink: 0;
    scroll-snap-align: start;
    box-shadow: 0 8px 20px rgba(15,23,42,.08);
  }

  .globalAdMiniCard img {
    width: 100%;
    height: 72px;
    object-fit: contain;
    padding: 8px;
    background: #f8fafc;
    border-bottom: 1px solid #eef2f7;
    display: block;
  }

  .globalAdMiniCard div {
    width: 100%;
    text-align: center;
    padding: 4px 5px 6px;
    line-height: 1.2;
  }

  .globalAdMiniCard span {
    display: block;
    font-size: 9px;
    color: #f59e0b;
    font-weight: 950;
    margin-bottom: 2px;
  }

  .globalAdMiniCard strong {
    display: block;
    font-size: 11px;
    color: #16a34a;
    font-weight: 950;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 700px) {
    .globalAdsBox {
      padding: 6px 0 9px;
    }

    .globalAdsScroll {
      max-width: 100%;
      gap: 8px;
      padding: 3px 10px 11px;
    }

    .globalAdMiniCard {
      width: 86px;
      min-width: 86px;
      height: 116px;
      border-radius: 14px;
      grid-template-rows: 66px 1fr;
    }

    .globalAdMiniCard img {
      height: 66px;
      padding: 7px;
    }

    .globalAdMiniCard strong {
      font-size: 10px;
    }
  }
`}</style>
    </section>
  );
}