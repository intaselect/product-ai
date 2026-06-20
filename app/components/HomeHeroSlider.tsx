"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    video: "/banners/sell-product.mp4",
    href: "/customer-offers/add",
  },

  {
    video: "/banners/advertise.mp4",
    href: "/advertise",
  },

  {
    video: "/banners/all-products.mp4",
    href: "/customer-offers",
  },

  {
    video: "/banners/daily-deals.mp4",
    href: "/daily-deals",
  },

  {
    video: "/banners/compare-prices.mp4",
    href: "/",
  },
];

export default function HomeHeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="homeHeroSlider">
      {slides.map((slide, index) => (
        <a
          key={index}
          href={slide.href}
          className={`heroSlide ${active === index ? "active" : ""}`}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        </a>
      ))}

      <div className="heroDots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={active === index ? "active" : ""}
          />
        ))}
      </div>

      <style jsx>{`
        .homeHeroSlider {
          position: relative;
          max-width: 1320px;
          margin: 22px auto;
          height: 420px;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(15,23,42,.12);
          background: #f8fafc;
        }

        .heroSlide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity .6s ease;
          pointer-events: none;
        }

        .heroSlide.active {
          opacity: 1;
          pointer-events: auto;
          z-index: 2;
        }

        .heroSlide video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .heroDots {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 5;
        }

        .heroDots button {
          width: 10px;
          height: 10px;
          border: 0;
          border-radius: 999px;
          background: rgba(255,255,255,.55);
          cursor: pointer;
        }

        .heroDots button.active {
          width: 28px;
          background: white;
        }

        @media (max-width: 768px) {
          .homeHeroSlider {
            margin: 14px 10px;
            height: 180px;
            border-radius: 22px;
          }
        }
      `}</style>
    </section>
  );
}