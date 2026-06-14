"use client";

import { useEffect, useState } from "react";

export default function BrandSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("bps_brand_splash_seen");

    if (seen) return;

    setShow(true);
    sessionStorage.setItem("bps_brand_splash_seen", "1");

    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="brandSplash">
      <div className="brandSplashGlow"></div>

      <div className="brandSplashLogoBox">
        <span className="splashWord word1">BPS</span>
        <span className="splashWord word2">Chat</span>
        <span className="splashWord word3">عالم</span>
        <span className="splashWord word4">المنتجات</span>

        <img
          src="/logo.png"
          alt="BPS Chat | عالم المنتجات"
          className="brandSplashLogo"
        />
      </div>

      <style jsx>{`
        .brandSplash {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at center, rgba(0, 212, 255, 0.20), transparent 35%),
            linear-gradient(135deg, #071a3d, #020617);
          overflow: hidden;
          animation: splashFadeOut 1s ease forwards;
        }

        .brandSplashGlow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 999px;
          background:
            radial-gradient(circle, rgba(255,138,0,.35), transparent 55%),
            radial-gradient(circle, rgba(0,212,255,.30), transparent 70%);
          filter: blur(18px);
          animation: glowPulse 1.2s ease-in-out infinite;
        }

        .brandSplashLogoBox {
          position: relative;
          width: min(520px, 86vw);
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brandSplashLogo {
          width: min(360px, 78vw);
          max-height: 180px;
          object-fit: contain;
          opacity: 0;
          transform: scale(.72);
          filter: drop-shadow(0 0 28px rgba(0,212,255,.45));
          animation: logoAssemble .65s ease .25s forwards;
        }

        .splashWord {
          position: absolute;
          color: white;
          font-weight: 950;
          font-size: clamp(22px, 5vw, 42px);
          text-shadow: 0 0 22px rgba(0,212,255,.65);
          opacity: 0;
          animation: wordFly 1s ease forwards;
        }

        .word1 { top: 0; left: 0; animation-delay: .05s; }
        .word2 { top: 0; right: 0; animation-delay: .12s; }
        .word3 { bottom: 0; right: 16%; animation-delay: .18s; }
        .word4 { bottom: 0; left: 12%; animation-delay: .24s; }

        @keyframes wordFly {
          0% {
            opacity: 0;
            transform: translateY(35px) scale(.8);
          }
          45% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(0) scale(1.15);
          }
        }

        @keyframes logoAssemble {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glowPulse {
          50% {
            transform: scale(1.12);
            opacity: .75;
          }
        }

        @keyframes splashFadeOut {
          0%, 72% {
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @media (max-width: 700px) {
          .brandSplashLogoBox {
            height: 210px;
          }

          .brandSplashLogo {
            width: 82vw;
          }
        }
      `}</style>
    </div>
  );
}