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
          padding: 8px 10px;
          overflow: hidden;
        }

        .globalAdsTitle {
          max-width: 1200px;
          margin: 0 auto 6px;
          font-size: 13px;
          font-weight: 950;
          color: #111827;
        }

        .globalAdsScroll {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .globalAdMiniCard {
          min-width: 92px;
          max-width: 92px;
          height: 118px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          text-decoration: none;
          color: #111827;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 7px;
          flex-shrink: 0;
        }

        .globalAdMiniCard img {
          width: 72px;
          height: 62px;
          object-fit: contain;
          display: block;
        }

        .globalAdMiniCard div {
          width: 100%;
          text-align: center;
        }

        .globalAdMiniCard span {
          display: block;
          font-size: 10px;
          color: #f59e0b;
          font-weight: 950;
          margin-bottom: 2px;
        }

        .globalAdMiniCard strong {
          display: block;
          font-size: 12px;
          color: #16a34a;
          font-weight: 950;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 700px) {
          .globalAdsBox {
            padding: 7px 8px;
          }

          .globalAdMiniCard {
            min-width: 82px;
            max-width: 82px;
            height: 108px;
          }

          .globalAdMiniCard img {
            width: 64px;
            height: 55px;
          }
        }
      `}</style>
    </section>
  );
}