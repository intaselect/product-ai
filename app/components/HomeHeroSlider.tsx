"use client";

import { useEffect, useRef, useState } from "react";

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
    href: "/smart-search",
  },
];

export default function HomeHeroSlider() {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentSlide = slides[active];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.load();

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [active]);

  function goNextSlide() {
    if (slides.length <= 1) {
      const video = videoRef.current;

      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }

      return;
    }

    setActive((prev) => (prev + 1) % slides.length);
  }

  function goToSlide(index: number) {
    setActive(index);
  }

  return (
    <section className="homeHeroSlider">
      <a href={currentSlide.href} className="heroSlide">
        <video
          key={currentSlide.video}
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="metadata"
          onEnded={goNextSlide}
        >
          <source src={currentSlide.video} type="video/mp4" />
        </video>
      </a>

      {slides.length > 1 && (
        <div className="heroDots">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={active === index ? "active" : ""}
              aria-label={`عرض البانر رقم ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .homeHeroSlider {
          position: relative;
          width: 100%;
          max-width: 1320px;
          margin: 22px auto;
          aspect-ratio: 1920 / 600;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(15,23,42,.12);
          background: #fff;
        }

        .heroSlide {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
        }

        .heroSlide video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: #fff;
        }

        .heroDots {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          z-index: 5;
          padding: 5px 8px;
          border-radius: 999px;
          background: rgba(255,255,255,.25);
          backdrop-filter: blur(8px);
        }

        .heroDots button {
          width: 10px;
          height: 10px;
          border: 0;
          border-radius: 999px;
          background: rgba(255,255,255,.75);
          cursor: pointer;
          transition: .25s ease;
          padding: 0;
        }

        .heroDots button.active {
          width: 28px;
          background: #22c55e;
        }

        @media (max-width: 768px) {
          .homeHeroSlider {
            width: calc(100vw - 16px);
            margin: 12px auto;
            border-radius: 18px;
            aspect-ratio: 1920 / 600;
          }

          .heroDots {
            bottom: 8px;
            gap: 6px;
            padding: 4px 7px;
          }

          .heroDots button {
            width: 8px;
            height: 8px;
          }

          .heroDots button.active {
            width: 22px;
          }
        }
      `}</style>
    </section>
  );
}