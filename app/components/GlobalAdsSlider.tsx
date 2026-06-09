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

  return (
    localStorage.getItem("country") ||
    localStorage.getItem("selectedCountry") ||
    "sa"
  );
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
      <div className="globalAdsInner">
        <div className="globalAdsHeader">
          <span>🔥 إعلانات مميزة</span>
          <small>اسحب لمشاهدة المزيد</small>
        </div>

        <div className="globalAdsScroll">
          {ads.map((item) => (
            <Link
              key={item.id}
              href={`/customer-offers/product/bps-chat-${item.slug}`}
              className="globalAdCard"
            >
              <div className="globalAdImageBox">
                <img src={item.image_url} alt={item.product_name} />
                <span>إعلان</span>
              </div>

              <div className="globalAdInfo">
                <strong>{item.price}</strong>
                <small>{item.store_name || "BPS Chat"}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .globalAdsBox {
          width: 100%;
          background:
            radial-gradient(circle at 20% 20%, rgba(34,197,94,.10), transparent 30%),
            linear-gradient(135deg, #ffffff, #f8fafc);
          border-bottom: 1px solid #dbeafe;
          padding: 10px 0 12px;
          overflow: hidden;
        }

        .globalAdsInner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 12px;
        }

        .globalAdsHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }

        .globalAdsHeader span {
          color: #111827;
          font-size: 14px;
          font-weight: 950;
        }

        .globalAdsHeader small {
          color: #64748b;
          font-size: 11px;
          font-weight: 800;
        }

        .globalAdsScroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 4px 2px 14px;
          scroll-snap-type: x mandatory;
        }

        .globalAdsScroll::-webkit-scrollbar {
          height: 8px;
        }

        .globalAdsScroll::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 999px;
        }

        .globalAdsScroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #16a34a, #2563eb);
          border-radius: 999px;
        }

        .globalAdCard {
          width: 118px;
          min-width: 118px;
          height: 158px;
          flex: 0 0 118px;
          background: #ffffff;
          border: 1px solid #dbeafe;
          border-radius: 20px;
          text-decoration: none;
          color: #111827;
          overflow: hidden;
          scroll-snap-align: start;
          box-shadow:
            0 10px 24px rgba(15,23,42,.10),
            0 0 0 4px rgba(34,197,94,.035);
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .globalAdCard:hover {
          transform: translateY(-4px);
          box-shadow:
            0 18px 34px rgba(15,23,42,.16),
            0 0 0 4px rgba(37,99,235,.07);
        }

        .globalAdImageBox {
          position: relative;
          width: 100%;
          height: 100px;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #eef2f7;
        }

        .globalAdImageBox img {
          width: 72px;
          height: 72px;
          object-fit: cover;
          object-position: center;
          border-radius: 14px;
          background: #ffffff;
          display: block;
        }

        .globalAdImageBox span {
          position: absolute;
          top: 6px;
          right: 6px;
          background: linear-gradient(135deg, #f59e0b, #16a34a);
          color: #ffffff;
          font-size: 9px;
          font-weight: 950;
          padding: 3px 7px;
          border-radius: 999px;
        }

        .globalAdInfo {
          height: 58px;
          padding: 7px 8px;
          text-align: center;
        }

        .globalAdInfo strong {
          display: block;
          color: #16a34a;
          font-size: 14px;
          font-weight: 950;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 4px;
        }

        .globalAdInfo small {
          display: block;
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 700px) {
          .globalAdsBox {
            padding: 8px 0 10px;
          }

          .globalAdsHeader span {
            font-size: 13px;
          }

          .globalAdsHeader small {
            font-size: 10px;
          }

          .globalAdsScroll {
            gap: 10px;
          }

          .globalAdCard {
            width: 104px;
            min-width: 104px;
            height: 146px;
            flex-basis: 104px;
            border-radius: 18px;
          }

          .globalAdImageBox {
            height: 92px;
          }

          .globalAdImageBox img {
            width: 66px;
            height: 66px;
            border-radius: 13px;
          }

          .globalAdInfo {
            height: 54px;
            padding: 6px;
          }

          .globalAdInfo strong {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}