"use client";

import { useEffect, useState } from "react";

// ملاحظة: قم بتغيير /logo.png إلى مسار اللوجو الدائري الخاص بك (اللوجو الذي يوجد في مركز التصميم)
const logoSrc = "/logo.png"; 

// مجموعة من الأغراض (المنتجات والفلوس والهدايا) للتطاير في الخلفية لإعطاء شعور "عالم العروض"
const flyingDebris = [
  "📱", "💻", "🎧", "⌚", "🛍️", "🎁", "💵", "💰", "🏷️", "%", "✨",
];

// مجموعة الكلمات الرئيسية للـ "Word Cloud" المحيط باللوجو كما في التصميم المطور
const dealWords = [
  { text: "BPS Chat", color: "#16a34a", pos: { top: "4%", left: "4%" } }, // أخضر
  { text: "عالم المنتجات", color: "#b45309", pos: { bottom: "8%", right: "7%" } }, // ذهبي
  { text: "تسوّق بذكاء", color: "#16a34a", pos: { bottom: "34%", right: "4%" } }, // أخضر
  { text: "وفر أكثر", color: "#d97706", pos: { bottom: "34%", left: "6%" } }, // ذهبي
  { text: "قارن الأسعار", color: "#2563eb", pos: { top: "35%", right: "-1%" } }, // أزرق
  { text: "عروض يومية", color: "#ef4444", pos: { top: "35%", left: "-1%" } }, // أحمر
];

export default function EnhancedBrandSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // التأكد من أن المستخدم لم يرَ الـ Splash Screen في هذه الجلسة
    const seen = sessionStorage.getItem("bps_brand_splash_seen");
    if (seen) return;

    setShow(true);
    // تسجيل المشاهدة في الجلسة لمنع تكراره عند تحديث الصفحة
    sessionStorage.setItem("bps_brand_splash_seen", "1");

    // الوقت الإجمالي للـ Splash Screen قبل الاختفاء (5 ثوانٍ لتجربة غامرة)
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="immersiveSplash" dir="rtl">
      {/* 1. الخلفية الشبكية المتحركة لإعطاء شعور بالعمق التقني */}
      <div className="gridBackground"></div>

      {/* 2. هالات الضوء العائمة (الأورب) - ذهبية وخضراء */}
      <div className="floatingOrb orbGold"></div>
      <div className="floatingOrb orbGreen"></div>

      {/* 3. عناصر الخلفية الطائرة (المنتجات، الفلوس، الرموز) */}
      <div className="flyingDebrisContainer">
        {flyingDebris.map((item, index) => (
          <span key={index} className={`flyItem fly${index % 6}`}>{item}</span>
        ))}
      </div>

      {/* 4. التصميم المركزي (Cloud) وحلقة الكواكب واللوجو - القلب النابض للتجربة */}
      <div className="cloudUniverseContainer">
        
        {/* حلقة كواكب متحركة في الخلفية مع منتجات حقيقية (أو رموز) */}
        <div className="vortexOrbitRing">
          <div className="orbitContent">
            <span className="orbitProd p1">📱</span>
            <span className="orbitProd p2">🛍️</span>
            <span className="orbitProd p3">🎁</span>
            <span className="orbitProd p4">💵</span>
            <span className="orbitProd p5">🎧</span>
            <span className="orbitProd p6">⌚</span>
          </div>
        </div>

        {/* سحابة الكلمات والعروض المحيطة - تجربة Word Cloud */}
        <div className="wordCloud">
          {dealWords.map((word, index) => (
            <span 
              key={index} 
              className={`splashWord word${index + 1}`}
              style={{ color: word.color, ...word.pos }}
            >
              {word.text}
            </span>
          ))}

          {/* اللوجو المركزي والدائري المتوهج */}
          <div className="logoUniverseCore">
            <div className="glowingRing">
              <img
                src={logoSrc}
                alt="BPS Chat Logo"
                className="centralLogo"
              />
            </div>
            
            {/* النص التحتي داخل التصميم السحابي */}
            <div className="coreUniverseText">
              <strong>BPS Chat</strong>
              <span>عالم المنتجات والمقارنة</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. قسم التحميل السفلي (Loader) والنص التحتي */}
      <div className="splashFooter">
        <div className="loadingText">...Loading a World of Deals...</div>
        <div className="loadingBarContainer">
          <i className="loadingBarFill"></i>
        </div>
        <div className="miniFeatureBanner">
          <div className="miniFeature">🛒 كل المنتجات</div>
          <div className="miniFeature">⚡ مقارنة ذكية</div>
          <div className="miniFeature">🔥 عروض اليوم</div>
        </div>
      </div>

      {/* 6. استايلات CSS مدمجة لتنفيذ الأنميشن والتصميم الغامر */}
      <style jsx>{`
        /* الحاوية الرئيسية - غامرة ومثبتة فوق كل شيء */
        .immersiveSplash {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 15%, rgba(245, 158, 11, 0.28), transparent 35%),
            radial-gradient(circle at 15% 85%, rgba(34, 197, 94, 0.16), transparent 30%),
            radial-gradient(circle at 85% 75%, rgba(14, 165, 233, 0.12), transparent 28%),
            linear-gradient(135deg, #ffffff, #fffdf8 50%, #f9fafb);
          animation: splashFadeOut 5s ease forwards;
        }

        /* الخلفية الشبكية المتحركة */
        .gridBackground {
          position: absolute;
          inset: -20%;
          opacity: 0.25;
          background-image:
            linear-gradient(rgba(245,158,11,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,.15) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at center, black, transparent 80%);
          animation: gridPan 15s linear infinite;
        }

        /* الهالات العائمة */
        .floatingOrb {
          position: absolute;
          border-radius: 999px;
          filter: blur(25px);
          opacity: .9;
          animation: orbFloat 2s ease-in-out infinite;
        }
        .orbGold {
          width: 350px; height: 350px;
          top: 5%; right: 10%;
          background: radial-gradient(circle, rgba(245,158,11,.4), transparent 70%);
        }
        .orbGreen {
          width: 400px; height: 400px;
          left: 5%; bottom: 10%;
          background: radial-gradient(circle, rgba(34,197,94,.18), transparent 70%);
          animation-delay: .3s;
        }

        /* عناصر الخلفية المتطايرة */
        .flyingDebrisContainer {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        .flyItem {
          position: absolute;
          font-size: clamp(20px, 3.5vw, 36px);
          opacity: 0;
          animation: debrisFly 3.5s ease-out forwards;
        }
        .fly0 { top: 15%; left: 15%; animation-delay: .2s; }
        .fly1 { top: 20%; right: 15%; animation-delay: .4s; }
        .fly2 { bottom: 25%; left: 20%; animation-delay: .6s; }
        .fly3 { bottom: 20%; right: 20%; animation-delay: .8s; }
        .fly4 { top: 50%; left: 10%; animation-delay: 1.0s; }
        .fly5 { top: 52%; right: 10%; animation-delay: 1.2s; }

        /* الحاوية الرئيسية للتصميم السحابي وحلقة الكواكب */
        .cloudUniverseContainer {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 70vh;
        }

        /* حلقة كواكب متحركة */
        .vortexOrbitRing {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          border: 1px dashed rgba(245,158,11,.2);
          animation: vortexRotate 10s linear infinite;
        }
        .orbitContent {
          position: relative;
          width: 100%; height: 100%;
        }
        .orbitProd {
          position: absolute;
          font-size: 28px;
          width: 50px; height: 50px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          border: 1px solid rgba(245,158,11,.2);
          box-shadow: 0 10px 20px rgba(0,0,0,0.06);
        }
        .p1 { top: 50%; right: -25px; transform: translateY(-50%); }
        .p2 { bottom: -25px; left: 50%; transform: translateX(-50%); }
        .p3 { top: 50%; left: -25px; transform: translateY(-50%); }
        .p4 { top: -25px; left: 50%; transform: translateX(-50%); }
        .p5 { top: 10%; right: 10%; }
        .p6 { bottom: 10%; left: 10%; }

        /* سحابة الكلمات والعروض */
        .wordCloud {
          position: relative;
          width: min(750px, 94vw);
          height: min(450px, 75vh);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* تصميم الكلمة المحيطة */
        .splashWord {
          position: absolute;
          padding: 10px 18px;
          border-radius: 999px;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(245,158,11,.2);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          font-size: clamp(16px, 3vw, 30px);
          font-weight: 950;
          white-space: nowrap;
          opacity: 0;
          animation: wordEntrance 1.5s ease-out forwards;
        }
        .word1 { animation-delay: .2s; } .word2 { animation-delay: .4s; }
        .word3 { animation-delay: .6s; } .word4 { animation-delay: .8s; }
        .word5 { animation-delay: 1.0s; } .word6 { animation-delay: 1.2s; }

        /* التصميم السحابي المركزي وحلقة الكواكب */
        .logoUniverseCore {
          position: relative;
          z-index: 15;
          width: min(350px, 75vw);
          min-height: 280px;
          border-radius: 45px;
          background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,252,245,0.92));
          border: 1px solid rgba(245,158,11,.3);
          box-shadow: 0 35px 100px rgba(15,23,42,0.15), 0 0 0 10px rgba(245,158,11,.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          opacity: 0;
          transform: scale(0.7) translateY(30px);
          animation: coreEntrance .8s cubic-bezier(.2,.9,.2,1.1) .8s forwards;
        }

        /* حلقة الكواكب المركزية (توهج) */
        .glowingRing {
          position: relative;
          width: 150px; height: 150px;
          border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          background: conic-gradient(from 120deg, #f59e0b, #facc15, #22c55e, #f59e0b);
          box-shadow: 0 25px 50px rgba(245,158,11,.25), 0 0 50px rgba(34,197,94,.18);
          animation: ringPulse 1.2s ease-in-out infinite;
        }
        .glowingRing::after {
          content: "";
          position: absolute; inset: 8px;
          border-radius: inherit;
          background: #ffffff;
        }

        /* اللوجو المركزي */
        .centralLogo {
          position: relative; z-index: 5;
          width: 95px; height: 95px;
          object-fit: contain;
          filter: drop-shadow(0 15px 20px rgba(15,23,42,0.15));
          animation: logoEnter .7s ease 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
          opacity: 0;
          transform: scale(0.6);
        }

        /* النص التحتي داخل التصميم السحابي */
        .coreUniverseText {
          text-align: center;
          margin-top: 18px;
          z-index: 5;
        }
        .coreUniverseText strong {
          display: block; color: #111827;
          font-size: clamp(36px, 6.5vw, 50px);
          line-height: 1; font-weight: 950;
          letter-spacing: -1px;
        }
        .coreUniverseText span {
          display: inline-flex; margin-top: 12px;
          padding: 9px 16px; border-radius: 999px;
          background: #fff8f0;
          border: 1px solid rgba(245,158,11,.3);
          color: #b45309; font-size: 15px; font-weight: 950;
        }

        /* تذييل الـ Splash Screen (التحميل والمعلومات) */
        .splashFooter {
          position: absolute;
          z-index: 20;
          bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          width: 90vw;
          opacity: 0;
          animation: bottomEntrance .6s ease 1.6s forwards;
        }
        .loadingText {
          font-size: 14px; font-weight: 900;
          color: #64748b;
          letter-spacing: 0.5px;
        }
        .loadingBarContainer {
          width: min(380px, 80vw);
          height: 10px;
          border-radius: 999px;
          background: #f1f5f9;
          overflow: hidden;
          box-shadow: inset 0 0 0 1px rgba(148,163,184,.2);
        }
        .loadingBarFill {
          display: block; width: 0%; height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #22c55e, #facc15, #f59e0b);
          animation: loadProgress 3.8s ease 1s forwards;
        }
        .miniFeatureBanner {
          display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
        }
        .miniFeature {
          padding: 11px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(245,158,11,.22);
          color: #111827; font-size: 14px; font-weight: 950;
          box-shadow: 0 10px 20px rgba(0,0,0,0.06);
        }

        /* Keyframes - الرسوم المتحركة */
        
        @keyframes debrisFly {
          0% { opacity: 0; transform: scale(0.3) translateY(50px); }
          30% { opacity: 0.8; }
          100% { opacity: 0.2; transform: scale(1.2) translateY(-100px); }
        }

        @keyframes wordEntrance {
          0% { opacity: 0; transform: translateY(50px) scale(0.8); }
          60% { opacity: 1; transform: translateY(0) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes coreEntrance {
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes logoEnter {
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes loadProgress {
          to { width: 100%; }
        }

        @keyframes orbFloat {
          50% { transform: translateY(-15px) scale(1.04); }
        }

        @keyframes ringPulse {
          50% { transform: scale(1.05); filter: brightness(1.1); }
        }

        @keyframes gridPan {
          to { background-position: 50px 50px; }
        }

        @keyframes vortexRotate {
          to { transform: rotate(360deg); }
        }

        @keyframes bottomEntrance {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes splashFadeOut {
          0%, 85% { opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; transform: scale(1.05); }
        }

        /* استايلات التجاوب لشاشات الجوال */
        @media (max-width: 650px) {
          .cloudUniverseContainer {
            height: 60vh;
          }
          .vortexOrbitRing {
            width: 450px; height: 450px;
          }
          .orbitProd {
            font-size: 20px; width: 40px; height: 40px;
          }
          .logoUniverseCore {
            width: min(280px, 80vw);
            min-height: 240px;
            border-radius: 35px;
          }
          .glowingRing {
            width: 120px; height: 120px;
          }
          .centralLogo {
            width: 80px; height: 80px;
          }
          .splashWord {
            font-size: 14px;
            padding: 8px 14px;
          }
          /* إخفاء الكلمات الثانوية في الجوال لمنع الازدحام */
          .word3, .word4, .word5, .word6 {
            display: none;
          }
          .splashFooter {
            bottom: 40px;
          }
          .miniFeatureBanner {
            gap: 10px;
          }
          .miniFeature {
            font-size: 12px;
            padding: 9px 12px;
          }
        }
      `}</style>
    </div>
  );
}