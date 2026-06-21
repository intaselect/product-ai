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
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="brandSplash" dir="rtl">
      <div className="splashGrid"></div>
      <div className="splashOrb orbGold"></div>
      <div className="splashOrb orbGreen"></div>

      <span className="flyProduct p1">📱</span>
      <span className="flyProduct p2">🎧</span>
      <span className="flyProduct p3">⌚</span>
      <span className="flyProduct p4">💻</span>
      <span className="flyProduct p5">🛍️</span>
      <span className="flyProduct p6">🎁</span>
      <span className="flyProduct p7">🔥</span>
      <span className="flyProduct p8">💳</span>

      <div className="wordCloud">
        <span className="splashWord word1">BPS</span>
        <span className="splashWord word2">Chat</span>
        <span className="splashWord word3">عالم</span>
        <span className="splashWord word4">المنتجات</span>
        <span className="splashWord word5">قارن الأسعار</span>
        <span className="splashWord word6">عروض يومية</span>
        <span className="splashWord word7">تسوّق بذكاء</span>
        <span className="splashWord word8">وفر أكثر</span>

        <div className="logoCore">
          <div className="logoRing">
            <img
              src="/logo.png"
              alt="BPS Chat | عالم المنتجات"
              className="brandSplashLogo"
            />
          </div>

          <div className="coreText">
            <strong>BPS Chat</strong>
            <span>عالم المنتجات</span>
          </div>
        </div>
      </div>

      <div className="splashBottom">
        <div className="miniFeature">🛒 كل المنتجات</div>
        <div className="miniFeature">⚡ مقارنة ذكية</div>
        <div className="miniFeature">🔥 عروض اليوم</div>
      </div>

      <div className="splashLoader">
        <i></i>
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
            radial-gradient(circle at 50% 18%, rgba(245, 158, 11, 0.26), transparent 32%),
            radial-gradient(circle at 18% 80%, rgba(34, 197, 94, 0.14), transparent 28%),
            radial-gradient(circle at 85% 75%, rgba(14, 165, 233, 0.10), transparent 26%),
            linear-gradient(135deg, #ffffff, #fffaf0 52%, #f8fafc);
          animation: splashFadeOut 2.2s ease forwards;
        }

        .splashGrid {
          position: absolute;
          inset: 0;
          opacity: 0.28;
          background-image:
            linear-gradient(rgba(245,158,11,.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,.13) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: radial-gradient(circle at center, black, transparent 72%);
          animation: gridMove 2.2s linear infinite;
        }

        .splashOrb {
          position: absolute;
          border-radius: 999px;
          filter: blur(20px);
          opacity: .95;
          animation: orbFloat 1.5s ease-in-out infinite;
        }

        .orbGold {
          width: 320px;
          height: 320px;
          top: 8%;
          right: 10%;
          background: radial-gradient(circle, rgba(245,158,11,.45), transparent 68%);
        }

        .orbGreen {
          width: 360px;
          height: 360px;
          left: 8%;
          bottom: 8%;
          background: radial-gradient(circle, rgba(34,197,94,.20), transparent 68%);
          animation-delay: .25s;
        }

        .wordCloud {
          position: relative;
          width: min(720px, 92vw);
          height: min(430px, 72vh);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logoCore {
          position: relative;
          z-index: 4;
          width: min(330px, 72vw);
          min-height: 250px;
          border-radius: 42px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.95), rgba(255,250,240,.9));
          border: 1px solid rgba(245,158,11,.34);
          box-shadow:
            0 30px 90px rgba(15,23,42,.14),
            0 0 0 8px rgba(245,158,11,.06),
            inset 0 1px 0 rgba(255,255,255,.95);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(.72) translateY(28px);
          animation: coreEnter .75s cubic-bezier(.2,.9,.2,1) .65s forwards;
          overflow: hidden;
        }

        .logoCore::before {
          content: "";
          position: absolute;
          inset: -55%;
          background: linear-gradient(
            120deg,
            transparent 36%,
            rgba(255,255,255,.9) 48%,
            rgba(245,158,11,.34) 52%,
            transparent 66%
          );
          transform: translateX(80%) rotate(12deg);
          animation: shineMove 1.25s ease .85s forwards;
        }

        .logoRing {
          position: relative;
          width: 138px;
          height: 138px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            conic-gradient(from 120deg, #f59e0b, #facc15, #22c55e, #f59e0b);
          box-shadow:
            0 20px 45px rgba(245,158,11,.24),
            0 0 45px rgba(34,197,94,.16);
          animation: ringPulse 1.15s ease-in-out infinite;
        }

        .logoRing::after {
          content: "";
          position: absolute;
          inset: 7px;
          border-radius: inherit;
          background: #ffffff;
        }

        .brandSplashLogo {
          position: relative;
          z-index: 2;
          width: 90px;
          height: 90px;
          object-fit: contain;
          filter: drop-shadow(0 12px 18px rgba(15,23,42,.16));
          animation: logoPop .65s ease .95s both;
        }

        .coreText {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-top: 15px;
        }

        .coreText strong {
          display: block;
          color: #111827;
          font-size: clamp(34px, 6vw, 48px);
          line-height: 1;
          font-weight: 950;
          letter-spacing: -1px;
        }

        .coreText span {
          display: inline-flex;
          margin-top: 10px;
          padding: 8px 14px;
          border-radius: 999px;
          background: #fff7ed;
          border: 1px solid rgba(245,158,11,.32);
          color: #b45309;
          font-size: 14px;
          font-weight: 950;
        }

        .splashWord {
          position: absolute;
          z-index: 3;
          padding: 9px 15px;
          border-radius: 999px;
          color: #111827;
          background: rgba(255,255,255,.88);
          border: 1px solid rgba(245,158,11,.26);
          box-shadow: 0 12px 28px rgba(15,23,42,.08);
          font-size: clamp(14px, 3vw, 28px);
          font-weight: 950;
          white-space: nowrap;
          opacity: 0;
          animation: wordAssemble 1.4s ease forwards;
        }

        .word1 { top: 4%; left: 4%; color: #16a34a; animation-delay: .05s; }
        .word2 { top: 4%; right: 5%; color: #d97706; animation-delay: .12s; }
        .word3 { bottom: 8%; right: 7%; animation-delay: .18s; }
        .word4 { bottom: 8%; left: 7%; color: #b45309; animation-delay: .24s; }
        .word5 { top: 35%; right: -1%; color: #2563eb; animation-delay: .32s; }
        .word6 { top: 35%; left: -1%; color: #ef4444; animation-delay: .40s; }
        .word7 { bottom: 34%; right: 4%; color: #16a34a; animation-delay: .48s; }
        .word8 { bottom: 34%; left: 6%; color: #d97706; animation-delay: .56s; }

        .flyProduct {
          position: absolute;
          z-index: 2;
          width: 58px;
          height: 58px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,.9);
          border: 1px solid rgba(245,158,11,.24);
          box-shadow: 0 18px 32px rgba(15,23,42,.10);
          font-size: 28px;
          opacity: 0;
          animation: productFly 1.65s ease forwards;
        }

        .p1 { top: 14%; left: 18%; animation-delay: .15s; }
        .p2 { top: 18%; right: 18%; animation-delay: .25s; }
        .p3 { bottom: 22%; left: 16%; animation-delay: .35s; }
        .p4 { bottom: 18%; right: 16%; animation-delay: .45s; }
        .p5 { top: 48%; left: 8%; animation-delay: .55s; }
        .p6 { top: 50%; right: 8%; animation-delay: .65s; }
        .p7 { top: 8%; left: 48%; animation-delay: .75s; }
        .p8 { bottom: 8%; left: 48%; animation-delay: .85s; }

        .splashBottom {
          position: absolute;
          z-index: 5;
          bottom: 70px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          animation: bottomEnter .5s ease 1.05s forwards;
        }

        .miniFeature {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,.88);
          border: 1px solid rgba(245,158,11,.24);
          color: #111827;
          font-size: 13px;
          font-weight: 950;
          box-shadow: 0 12px 24px rgba(15,23,42,.07);
        }

        .splashLoader {
          position: absolute;
          z-index: 5;
          bottom: 42px;
          width: min(360px, 72vw);
          height: 8px;
          border-radius: 999px;
          overflow: hidden;
          background: #f1f5f9;
          box-shadow: inset 0 0 0 1px rgba(148,163,184,.22);
        }

        .splashLoader i {
          display: block;
          width: 0%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #22c55e, #facc15, #f59e0b);
          animation: loadBar 1.65s ease .25s forwards;
        }

        @keyframes wordAssemble {
          0% {
            opacity: 0;
            transform: translateY(45px) scale(.75) rotate(-6deg);
          }
          45% {
            opacity: 1;
            transform: translateY(0) scale(1.05) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }

        @keyframes productFly {
          0% {
            opacity: 0;
            transform: translate3d(0, 80px, 0) scale(.5) rotate(-18deg);
          }
          55% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.08) rotate(8deg);
          }
          100% {
            opacity: .95;
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
        }

        @keyframes coreEnter {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes logoPop {
          0% {
            opacity: 0;
            transform: scale(.7) rotate(-12deg);
          }
          100% {
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
            transform: scale(1.04);
            filter: brightness(1.08);
          }
        }

        @keyframes shineMove {
          to {
            transform: translateX(-78%) rotate(12deg);
          }
        }

        @keyframes orbFloat {
          50% {
            transform: translateY(-14px) scale(1.05);
          }
        }

        @keyframes bottomEnter {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gridMove {
          to {
            background-position: 46px 46px;
          }
        }

        @keyframes splashFadeOut {
          0%, 82% {
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @media (max-width: 700px) {
          .wordCloud {
            width: 94vw;
            height: 420px;
          }

          .logoCore {
            width: 250px;
            min-height: 220px;
            border-radius: 34px;
          }

          .logoRing {
            width: 118px;
            height: 118px;
          }

          .brandSplashLogo {
            width: 78px;
            height: 78px;
          }

          .splashWord {
            font-size: 13px;
            padding: 7px 11px;
          }

          .word5,
          .word6,
          .word7,
          .word8 {
            display: none;
          }

          .flyProduct {
            width: 46px;
            height: 46px;
            border-radius: 16px;
            font-size: 22px;
          }

          .splashBottom {
            bottom: 66px;
            width: 90vw;
          }

          .miniFeature {
            font-size: 11px;
            padding: 8px 10px;
          }
        }
      `}</style>
    </div>
  );
}