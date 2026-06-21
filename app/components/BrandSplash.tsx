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
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="brandSplash" dir="rtl">
      <div className="goldOrb orb1"></div>
      <div className="goldOrb orb2"></div>
      <div className="goldGrid"></div>

      <div className="brandSplashCard">
        <div className="brandSplashLogoRing">
          <img
            src="/logo.png"
            alt="BPS Chat | عالم المنتجات"
            className="brandSplashLogo"
          />
        </div>

        <div className="brandSplashText">
          <span>✨ عالم المنتجات</span>
          <h2>BPS Chat</h2>
          <p>تسوق ذكي • وفر أكثر</p>
        </div>

        <div className="splashLoader">
          <i></i>
        </div>
      </div>

      <style jsx>{`
        .brandSplash {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 15%, rgba(245, 158, 11, 0.22), transparent 32%),
            radial-gradient(circle at 15% 80%, rgba(34, 197, 94, 0.12), transparent 28%),
            linear-gradient(135deg, #ffffff, #fffaf0 48%, #f8fafc);
          animation: splashFadeOut 1.7s ease forwards;
        }

        .goldGrid {
          position: absolute;
          inset: 0;
          opacity: 0.28;
          background-image:
            linear-gradient(rgba(245, 158, 11, .12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, .12) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at center, black, transparent 68%);
        }

        .goldOrb {
          position: absolute;
          border-radius: 999px;
          filter: blur(18px);
          opacity: .9;
          animation: orbFloat 1.5s ease-in-out infinite;
        }

        .orb1 {
          width: 280px;
          height: 280px;
          top: 12%;
          right: 14%;
          background: radial-gradient(circle, rgba(245,158,11,.45), transparent 65%);
        }

        .orb2 {
          width: 340px;
          height: 340px;
          left: 10%;
          bottom: 10%;
          background: radial-gradient(circle, rgba(34,197,94,.22), transparent 65%);
          animation-delay: .25s;
        }

        .brandSplashCard {
          position: relative;
          z-index: 2;
          width: min(520px, 88vw);
          min-height: 360px;
          border-radius: 42px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 34px 24px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.94), rgba(255,250,240,.88));
          border: 1px solid rgba(245,158,11,.32);
          box-shadow:
            0 30px 90px rgba(15,23,42,.14),
            0 0 0 8px rgba(245,158,11,.06),
            inset 0 1px 0 rgba(255,255,255,.9);
          overflow: hidden;
          transform: translateY(18px) scale(.94);
          opacity: 0;
          animation: cardEnter .7s cubic-bezier(.2,.9,.2,1) forwards;
        }

        .brandSplashCard::before {
          content: "";
          position: absolute;
          inset: -40%;
          background: linear-gradient(
            120deg,
            transparent 35%,
            rgba(255,255,255,.85) 48%,
            rgba(245,158,11,.28) 52%,
            transparent 66%
          );
          transform: translateX(70%) rotate(12deg);
          animation: shineMove 1.25s ease .25s forwards;
        }

        .brandSplashLogoRing {
          position: relative;
          width: 148px;
          height: 148px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            conic-gradient(from 140deg, #f59e0b, #facc15, #22c55e, #f59e0b);
          box-shadow:
            0 20px 45px rgba(245,158,11,.25),
            0 0 45px rgba(34,197,94,.16);
          animation: ringPulse 1.2s ease-in-out infinite;
        }

        .brandSplashLogoRing::after {
          content: "";
          position: absolute;
          inset: 7px;
          border-radius: inherit;
          background: #ffffff;
          box-shadow: inset 0 0 0 1px rgba(245,158,11,.20);
        }

        .brandSplashLogo {
          position: relative;
          z-index: 2;
          width: 96px;
          height: 96px;
          object-fit: contain;
          filter: drop-shadow(0 12px 20px rgba(15,23,42,.16));
          transform: scale(.75) rotate(-8deg);
          opacity: 0;
          animation: logoPop .6s ease .35s forwards;
        }

        .brandSplashText {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-top: 18px;
        }

        .brandSplashText span {
          display: inline-flex;
          padding: 8px 14px;
          border-radius: 999px;
          background: #fff7ed;
          border: 1px solid rgba(245,158,11,.32);
          color: #b45309;
          font-size: 13px;
          font-weight: 950;
          margin-bottom: 8px;
        }

        .brandSplashText h2 {
          margin: 0;
          color: #111827;
          font-size: clamp(38px, 7vw, 58px);
          line-height: 1;
          font-weight: 950;
          letter-spacing: -1px;
        }

        .brandSplashText p {
          margin: 10px 0 0;
          color: #166534;
          font-size: 17px;
          font-weight: 950;
        }

        .splashLoader {
          position: relative;
          z-index: 2;
          width: min(310px, 70vw);
          height: 9px;
          margin-top: 26px;
          border-radius: 999px;
          overflow: hidden;
          background: #f1f5f9;
          box-shadow: inset 0 0 0 1px rgba(148,163,184,.24);
        }

        .splashLoader i {
          display: block;
          height: 100%;
          width: 0%;
          border-radius: inherit;
          background: linear-gradient(90deg, #22c55e, #facc15, #f59e0b);
          animation: loadBar 1.25s ease forwards;
        }

        @keyframes cardEnter {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes logoPop {
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes loadBar {
          to {
            width: 100%;
          }
        }

        @keyframes ringPulse {
          50% {
            transform: scale(1.035);
            filter: brightness(1.08);
          }
        }

        @keyframes shineMove {
          to {
            transform: translateX(-70%) rotate(12deg);
          }
        }

        @keyframes orbFloat {
          50% {
            transform: translateY(-14px) scale(1.05);
          }
        }

        @keyframes splashFadeOut {
          0%, 78% {
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @media (max-width: 700px) {
          .brandSplashCard {
            width: 86vw;
            min-height: 320px;
            border-radius: 32px;
            padding: 28px 18px;
          }

          .brandSplashLogoRing {
            width: 126px;
            height: 126px;
          }

          .brandSplashLogo {
            width: 82px;
            height: 82px;
          }

          .brandSplashText p {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}