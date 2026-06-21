"use client";

import { useEffect, useState } from "react";

export default function BrandSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("bps_brand_splash_seen");

    if (seen) return;

    setShow(true);
    sessionStorage.setItem("bps_brand_splash_seen", "1");

    // زيادة الوقت قليلاً إلى 3 ثوانٍ ليعيش العميل تجربة الأنميشن الكاملة
    const timer = setTimeout(() => {
      setShow(false);
    }, 3200);

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

      {/* المنتجات والهدايا والفلوس المتطايرة والمندفعة نحو الشاشة (3D Space Explosion) */}
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

        {/* مركز الكون التسوقي: اللوجو الدائري المتوهج */}
        <div className="logoPortal">
          <div className="portalBorder"></div>
          <img
            src="/logo.png"
            alt="BPS Chat | عالم المنتجات"
            className="mainPortalLogo"
          />
        </div>
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
          animation: splashFadeOut 3.2s cubic-bezier(0.7, 0, 0.3, 1) forwards;
          perspective: 1000px;
        }

        /* دوامة الخلفية الحركية */
        .vortexGrid {
          position: absolute;
          inset: -50%;
          opacity: 0.15;
          background-image: 
            radial-gradient(circle, #f59e0b 2px, transparent 2px),
            radial-gradient(circle, #22c55e 2px, transparent 2px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
          animation: vortexRotate 20s linear infinite;
        }

        /* الهالات المتوهجة الدائرية كما في صورتك */
        .glowRing {
          position: absolute;
          border-radius: 50%;
          border: 2px dashed rgba(245, 158, 11, 0.2);
          animation: spinClockwise 15s linear infinite;
        }
        .ringOuter {
          width: min(580px, 90vw);
          height: min(580px, 90vw);
          background: radial-gradient(circle, rgba(254, 243, 199, 0.4) 0%, transparent 70%);
          border-color: rgba(34, 197, 94, 0.25);
        }
        .ringInner {
          width: min(400px, 70vw);
          height: min(400px, 70vw);
          background: radial-gradient(circle, rgba(220, 252, 231, 0.3) 0%, transparent 60%);
          border: 2px solid rgba(245, 158, 11, 0.15);
          animation: spinCounterClockwise 10s linear infinite;
        }

        /* حاوية الدوران واللوجو المركزية */
        .vortexContainer {
          position: relative;
          width: min(500px, 85vw);
          height: min(500px, 85vw);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* البوابة الدائرية الحاضنة للوجو */
        .logoPortal {
          position: relative;
          width: min(240px, 45vw);
          height: min(240px, 45vw);
          border-radius: 50%;
          background: #ffffff;
          padding: 10px;
          box-shadow: 
            0 25px 60px rgba(15, 23, 42, 0.15),
            0 0 50px rgba(245, 158, 11, 0.3),
            inset 0 0 20px rgba(34, 197, 94, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transform: scale(0);
          animation: portalPop 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
        }

        .portalBorder {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #22c55e, #facc15, #f59e0b, #22c55e);
          animation: spinClockwise 3s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 4px;
        }

        .mainPortalLogo {
          width: 85%;
          height: 85%;
          object-fit: contain;
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.08));
          animation: logoFloat 2s ease-in-out infinite alternate;
        }

        /* النبذات والبطاقات الدائرية حول اللوجو */
        .orbitBadge {
          position: absolute;
          padding: 8px 16px;
          border-radius: 30px;
          font-weight: 800;
          font-size: clamp(12px, 2.5vw, 15px);
          white-space: nowrap;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          border: 1px solid rgba(255,255,255,0.8);
          opacity: 0;
          transform: scale(0);
          animation: badgeEnter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* تحديد مواضع البطاقات بدقة دائرية وتناسق ألوان الصورة */
        .b1 { top: 12%; left: 50%; transform: translateX(-50%); background: #22c55e; color: #fff; animation-delay: 0.5s; }
        .b2 { top: 24%; left: 46%; background: #1e3a8a; color: #fff; animation-delay: 0.6s; font-size: 11px; }
        .b3 { top: 32%; right: -5%; background: #fef3c7; color: #b45309; border-color: #f59e0b; animation-delay: 0.7s; }
        .b4 { top: 42%; right: -12%; background: #2563eb; color: #fff; animation-delay: 0.8s; }
        .b5 { bottom: 22%; right: 2%; background: #f0fdf4; color: #16a34a; border-color: #22c55e; animation-delay: 0.9s; }
        .b6 { top: 40%; left: -10%; background: #0f172a; color: #fff; animation-delay: 1s; }
        .b7 { bottom: 32%; left: -4%; background: #f59e0b; color: #fff; animation-delay: 1.1s; }

        /* الأنميشن الانفجاري المتطاير للمنتجات والفلوس الفلوتنج */
        .flyItem {
          position: absolute;
          font-size: clamp(24px, 5vw, 42px);
          z-index: 5;
          opacity: 0;
          filter: drop-shadow(0 15px 20px rgba(0,0,0,0.12));
          pointer-events: none;
        }

        /* هندسة انطلاق المنتجات والفلوس من المركز إلى الخارج بقوة وتأثير الـ 3D */
        .p1 { top: 45%; left: 50%; animation: explodeTopLeft 1.8s cubic-bezier(0.1, 0.8, 0.25, 1) 0.4s infinite; }
        .p2 { top: 45%; left: 50%; animation: explodeTopRight 2s cubic-bezier(0.1, 0.8, 0.25, 1) 0.7s infinite; }
        .p3 { top: 45%; left: 50%; animation: explodeBottomLeft 2.2s cubic-bezier(0.1, 0.8, 0.25, 1) 0.5s infinite; }
        .p4 { top: 45%; left: 50%; animation: explodeBottomRight 1.9s cubic-bezier(0.1, 0.8, 0.25, 1) 0.9s infinite; }
        
        /* الفلوس والهدايا المندفعة */
        .p5 { top: 45%; left: 50%; animation: explodePureLeft 2.1s cubic-bezier(0.1, 0.8, 0.25, 1) 0.3s infinite; }
        .p6 { top: 45%; left: 50%; animation: explodePureRight 1.7s cubic-bezier(0.1, 0.8, 0.25, 1) 0.6s infinite; }
        .p7 { top: 45%; left: 50%; animation: explodePureTop 2.3s cubic-bezier(0.1, 0.8, 0.25, 1) 0.8s infinite; }
        .p8 { top: 45%; left: 50%; animation: explodePureBottom 2s cubic-bezier(0.1, 0.8, 0.25, 1) 1.1s infinite; }

        /* المنتجات الإضافية لملء المساحة الرائعة */
        .p9 { top: 45%; left: 50%; animation: explodeTopLeft 2.4s cubic-bezier(0.1, 0.8, 0.25, 1) 1.2s infinite; }
        .p10 { top: 45%; left: 50%; animation: explodeBottomRight 1.6s cubic-bezier(0.1, 0.8, 0.25, 1) 1.3s infinite; }
        .p11 { top: 45%; left: 50%; animation: explodeTopRight 2.1s cubic-bezier(0.1, 0.8, 0.25, 1) 0.2s infinite; }
        .p12 { top: 45%; left: 50%; animation: explodeBottomLeft 1.8s cubic-bezier(0.1, 0.8, 0.25, 1) 1s infinite; }


        /* قسم التحميل السفلي */
        .loadingSection {
          position: absolute;
          bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 20;
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
          animation: fillProgress 2.5s ease forwards;
        }

        .loadingText {
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 1px;
          margin: 0;
        }

        /* --- كل حركات الأنميشن الذكية والـ Keyframes --- */

        @keyframes portalPop {
          to { transform: scale(1); }
        }

        @keyframes logoFloat {
          to { transform: translateY(-8px) scale(1.03); }
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

        /* اتجاهات الانفجار والتطاير الثلاثي الأبعاد للأغراض والفلوس */
        @keyframes explodeTopLeft {
          0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translate(-220px, -220px) scale(1.4) rotate(-45deg); }
        }

        @keyframes explodeTopRight {
          0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translate(220px, -220px) scale(1.4) rotate(45deg); }
        }

        @keyframes explodeBottomLeft {
          0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translate(-220px, 220px) scale(1.4) rotate(35deg); }
        }

        @keyframes explodeBottomRight {
          0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translate(220px, 220px) scale(1.4) rotate(-35deg); }
        }

        @keyframes explodePureLeft {
          0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translate(-280px, 0px) scale(1.3) rotate(-90deg); }
        }

        @keyframes explodePureRight {
          0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translate(280px, 0px) scale(1.3) rotate(90deg); }
        }

        @keyframes explodePureTop {
          0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translate(0px, -260px) scale(1.3) rotate(15deg); }
        }

        @keyframes explodePureBottom {
          0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translate(0px, 260px) scale(1.3) rotate(-15deg); }
        }

        /* اختفاء الاسبلاش بالكامل بسلاسة ونعومة مذهلة */
        @keyframes splashFadeOut {
          0%, 88% { opacity: 1; visibility: visible; }
          100% { opacity: 0; transform: scale(1.05); visibility: hidden; }
        }

        /* التجاوب الممتاز مع شاشات الجوال */
        @media (max-width: 600px) {
          .vortexContainer {
            width: 90vw;
            height: 90vw;
          }
          .b3 { right: -2%; }
          .b4 { right: -4%; }
          .b6 { left: -4%; }
          .b7 { left: -2%; }
          
          @keyframes explodeTopLeft { 100% { transform: translate(-130px, -130px) scale(1.2); } }
          @keyframes explodeTopRight { 100% { transform: translate(130px, -130px) scale(1.2); } }
          @keyframes explodeBottomLeft { 100% { transform: translate(-130px, 130px) scale(1.2); } }
          @keyframes explodeBottomRight { 100% { transform: translate(130px, 130px) scale(1.2); } }
          @keyframes explodePureLeft { 100% { transform: translate(-160px, 0px) scale(1.2); } }
          @keyframes explodePureRight { 100% { transform: translate(160px, 0px) scale(1.2); } }
          @keyframes explodePureTop { 100% { transform: translate(0px, -160px) scale(1.2); } }
          @keyframes explodePureBottom { 100% { transform: translate(0px, 160px) scale(1.2); } }
        }
      `}</style>
    </div>
  );
}