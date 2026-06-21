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
    }, 4000); // زدنا الوقت لـ 4 ثوانٍ ليعطي انطباع فخم ومستقر

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="brandSplash" dir="rtl">
      {/* شبكة نفقية متحركة لإعطاء إحساس الدخول إلى العالم */}
      <div className="vortexGrid"></div>
      
      {/* الهالات الضوئية الدائرية الملونة الخلفية المتوهجة من الصورة */}
      <div className="glowRing ringOuter"></div>
      <div className="glowRing ringInner"></div>

      {/* حلقة العروض الدائرية المحيطة باللوجو */}
      <div className="vortexContainer">
        
        {/* الكلمات والتاغات العائمة حول الدائرة */}
        <span className="orbitBadge b1">BPS Chat</span>
        <span className="orbitBadge b2">Smart Shopping</span>
        <span className="orbitBadge b3">عروض يومية</span>
        <span className="orbitBadge b4">تسوّق بذكاء</span>
        <span className="orbitBadge b5">هدايا وتخفيضات</span>
        <span className="orbitBadge b6">Compare Prices</span>
        <span className="orbitBadge b7">عالم المنتجات</span>

        {/* مركز الكون التسوقي: اللوجو الدائري المتوهج والمثبت بدون اهتزاز */}
        <div className="logoPortal">
          <div className="portalBorder"></div>
          <div className="logoWrapper">
            <img
              src="/logo.png"
              alt="BPS Chat | عالم المنتجات"
              className="mainPortalLogo"
            />
          </div>
        </div>
      </div>

      {/* المنتجات والهدايا والفلوس المتطايرة والمندفعة بشكل انسيابي بدون أي ريفلو أو هزّة */}
      <div className="explosionUniverse">
        <span className="flyItem p1">📱</span>
        <span className="flyItem p2">🎧</span>
        <span className="flyItem p3">⌚</span>
        <span className="flyItem p4">💻</span>
        <span className="flyItem p5">🛍️</span>
        <span className="flyItem p6">🎁</span>
        <span className="flyItem p7">💵</span>
        <span className="flyItem p8">💰</span>
        <span className="flyItem p9">🔥</span>
        <span className="flyItem p10">🏷️</span>
        <span className="flyItem p11">💸</span>
        <span className="flyItem p12">✨</span>
      </div>

      {/* شريط التحميل المودرن الذكي بأسفل الشاشة */}
      <div className="loadingSection">
        <div className="splashLoader">
          <i></i>
        </div>
        <p className="loadingText">...Loading a World of Deals...</p>
      </div>

      <style jsx>{`
        .brandSplash {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(circle at center, #ffffff 20%, #f0fdf4 60%, #fffbeb 100%);
          animation: splashFadeOut 4s cubic-bezier(0.7, 0, 0.3, 1) forwards;
          perspective: 1200px;
        }

        .vortexGrid {
          position: absolute;
          inset: -50%;
          opacity: 0.12;
          background-image: 
            radial-gradient(circle, #f59e0b 2px, transparent 2px),
            radial-gradient(circle, #22c55e 2px, transparent 2px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
          animation: vortexRotate 25s linear infinite;
        }

        .glowRing {
          position: absolute;
          border-radius: 50%;
          border: 2px dashed rgba(245, 158, 11, 0.2);
          animation: spinClockwise 20s linear infinite;
          pointer-events: none;
        }
        .ringOuter {
          width: min(580px, 92vw);
          height: min(580px, 92vw);
          background: radial-gradient(circle, rgba(254, 243, 199, 0.35) 0%, transparent 70%);
          border-color: rgba(34, 197, 94, 0.2);
        }
        .ringInner {
          width: min(400px, 75vw);
          height: min(400px, 75vw);
          background: radial-gradient(circle, rgba(220, 252, 231, 0.25) 0%, transparent 60%);
          border: 2px solid rgba(245, 158, 11, 0.12);
          animation: spinCounterClockwise 14s linear infinite;
        }

        .vortexContainer {
          position: relative;
          width: min(500px, 85vw);
          height: min(500px, 85vw);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }

        /* حاوية اللوجو مع زيادة مساحة العرض لضمان عدم اختفائه */
        .logoPortal {
          position: relative;
          width: min(260px, 50vw);
          height: min(260px, 50vw);
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 
            0 30px 70px rgba(15, 23, 42, 0.18),
            0 0 60px rgba(245, 158, 11, 0.25),
            inset 0 0 20px rgba(34, 197, 94, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0);
          animation: portalPop 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
        }

        .portalBorder {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #22c55e, #facc15, #f59e0b, #22c55e);
          animation: spinClockwise 4s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 4px;
        }

        .logoWrapper {
          width: 80%;
          height: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .mainPortalLogo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
          animation: logoFloat 2.5s ease-in-out infinite alternate;
        }

        .orbitBadge {
          position: absolute;
          padding: 8px 16px;
          border-radius: 30px;
          font-weight: 800;
          font-size: clamp(11px, 2.5vw, 14px);
          white-space: nowrap;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          border: 1px solid rgba(255,255,255,0.8);
          opacity: 0;
          transform: scale(0);
          animation: badgeEnter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .b1 { top: 10%; left: 50%; transform: translateX(-50%); background: #22c55e; color: #fff; animation-delay: 0.4s; }
        .b2 { top: 22%; left: 44%; background: #1e3a8a; color: #fff; animation-delay: 0.5s; font-size: 11px; }
        .b3 { top: 32%; right: -5%; background: #fef3c7; color: #b45309; border-color: #f59e0b; animation-delay: 0.6s; }
        .b4 { top: 44%; right: -10%; background: #2563eb; color: #fff; animation-delay: 0.7s; }
        .b5 { bottom: 20%; right: 2%; background: #f0fdf4; color: #16a34a; border-color: #22c55e; animation-delay: 0.8s; }
        .b6 { top: 38%; left: -10%; background: #0f172a; color: #fff; animation-delay: 0.9s; }
        .b7 { bottom: 30%; left: -4%; background: #f59e0b; color: #fff; animation-delay: 1s; }

        /* حاوية ثابتة لعناصر الانفجار تمنع اهتزاز الشاشة بالكامل */
        .explosionUniverse {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }

        .flyItem {
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: clamp(24px, 5vw, 38px);
          opacity: 0;
          filter: drop-shadow(0 12px 18px rgba(0,0,0,0.1));
          will-change: transform, opacity;
        }

        /* هندسة انطلاق المنتجات والفلوس من المركز إلى الخارج بانسيابية تامة */
        .p1 { animation: explodeTopLeft 2s cubic-bezier(0.12, 0.85, 0.3, 1) 0.3s infinite; }
        .p2 { animation: explodeTopRight 2.2s cubic-bezier(0.12, 0.85, 0.3, 1) 0.6s infinite; }
        .p3 { animation: explodeBottomLeft 2.4s cubic-bezier(0.12, 0.85, 0.3, 1) 0.4s infinite; }
        .p4 { animation: explodeBottomRight 2.1s cubic-bezier(0.12, 0.85, 0.3, 1) 0.8s infinite; }
        .p5 { animation: explodePureLeft 2.3s cubic-bezier(0.12, 0.85, 0.3, 1) 0.2s infinite; }
        .p6 { animation: explodePureRight 1.9s cubic-bezier(0.12, 0.85, 0.3, 1) 0.5s infinite; }
        .p7 { animation: explodePureTop 2.5s cubic-bezier(0.12, 0.85, 0.3, 1) 0.7s infinite; }
        .p8 { animation: explodePureBottom 2.2s cubic-bezier(0.12, 0.85, 0.3, 1) 0.9s infinite; }
        .p9 { animation: explodeTopLeft 2.6s cubic-bezier(0.12, 0.85, 0.3, 1) 1.1s infinite; }
        .p10 { animation: explodeBottomRight 1.8s cubic-bezier(0.12, 0.85, 0.3, 1) 1.2s infinite; }
        .p11 { animation: explodeTopRight 2.3s cubic-bezier(0.12, 0.85, 0.3, 1) 0.1s infinite; }
        .p12 { animation: explodeBottomLeft 2s cubic-bezier(0.12, 0.85, 0.3, 1) 0.9s infinite; }

        .loadingSection {
          position: absolute;
          bottom: 55px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 30;
        }

        .splashLoader {
          width: min(300px, 70vw);
          height: 6px;
          border-radius: 10px;
          background: #e2e8f0;
          overflow: hidden;
        }

        .splashLoader i {
          display: block;
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #22c55e, #facc15, #f59e0b);
          border-radius: 10px;
          animation: fillProgress 3.2s ease forwards;
        }

        .loadingText {
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 1px;
          margin: 0;
        }

        /* ضبط الـ Keyframes لتبدأ من مركز الصفر الحقيقي للحاوية لتفادي الهزّة */
        @keyframes portalPop {
          to { transform: scale(1); }
        }

        @keyframes logoFloat {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-6px) scale(1.02); }
        }

        @keyframes badgeEnter {
          to { opacity: 1; transform: scale(1) translateX(0); }
        }

        @keyframes vortexRotate {
          to { transform: rotate(360deg); }
        }

        @keyframes spinClockwise {
          to { transform: rotate(360deg); }
        }

        @keyframes spinCounterClockwise {
          to { transform: rotate(-360deg); }
        }

        @keyframes fillProgress {
          to { width: 100%; }
        }

        @keyframes explodeTopLeft {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
          12% { opacity: 1; }
          100% { opacity: 0; transform: translate(-240px, -240px) scale(1.3) rotate(-45deg); }
        }

        @keyframes explodeTopRight {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
          12% { opacity: 1; }
          100% { opacity: 0; transform: translate(240px, -240px) scale(1.3) rotate(45deg); }
        }

        @keyframes explodeBottomLeft {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
          12% { opacity: 1; }
          100% { opacity: 0; transform: translate(-240px, 240px) scale(1.3) rotate(35deg); }
        }

        @keyframes explodeBottomRight {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
          12% { opacity: 1; }
          100% { opacity: 0; transform: translate(240px, 240px) scale(1.3) rotate(-35deg); }
        }

        @keyframes explodePureLeft {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
          12% { opacity: 1; }
          100% { opacity: 0; transform: translate(-290px, 0px) scale(1.2) rotate(-90deg); }
        }

        @keyframes explodePureRight {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
          12% { opacity: 1; }
          100% { opacity: 0; transform: translate(290px, 0px) scale(1.2) rotate(90deg); }
        }

        @keyframes explodePureTop {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
          12% { opacity: 1; }
          100% { opacity: 0; transform: translate(0px, -270px) scale(1.2) rotate(15deg); }
        }

        @keyframes explodePureBottom {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
          12% { opacity: 1; }
          100% { opacity: 0; transform: translate(0px, 270px) scale(1.2) rotate(-15deg); }
        }

        @keyframes splashFadeOut {
          0%, 90% { opacity: 1; visibility: visible; }
          100% { opacity: 0; transform: scale(1.03); visibility: hidden; }
        }

        @media (max-width: 600px) {
          .vortexContainer {
            width: 88vw;
            height: 88vw;
          }
          .logoPortal {
            width: min(200px, 46vw);
            height: min(200px, 46vw);
          }
          .b3 { right: -1%; }
          .b4 { right: -3%; }
          .b6 { left: -3%; }
          .b7 { left: -1%; }
          
          @keyframes explodeTopLeft { 100% { transform: translate(-140px, -140px) scale(1.1); } }
          @keyframes explodeTopRight { 100% { transform: translate(140px, -140px) scale(1.1); } }
          @keyframes explodeBottomLeft { 100% { transform: translate(-140px, 140px) scale(1.1); } }
          @keyframes explodeBottomRight { 100% { transform: translate(140px, 140px) scale(1.1); } }
          @keyframes explodePureLeft { 100% { transform: translate(-160px, 0px) scale(1.1); } }
          @keyframes explodePureRight { 100% { transform: translate(160px, 0px) scale(1.1); } }
          @keyframes explodePureTop { 100% { transform: translate(0px, -160px) scale(1.1); } }
          @keyframes explodePureBottom { 100% { transform: translate(0px, 160px) scale(1.1); } }
        }
      `}</style>
    </div>
  );
}