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
].filter((slide) => {
  return slide.video;
});
export default function HomeHeroSlider() {
  const [active, setActive] = useState(0);

 useEffect(() => {
  if (slides.length <= 1) return;

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
  loop={slides.length === 1}
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
    gap: 8px;
    z-index: 5;
  }

  .heroDots button {
    width: 10px;
    height: 10px;
    border: 0;
    border-radius: 999px;
    background: rgba(255,255,255,.65);
    cursor: pointer;
    transition: .25s;
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