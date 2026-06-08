"use client";

import Link from "next/link";

export default function BpsForStoresPage() {
  return (
    <main className="storesLanding" dir="rtl">
      <section className="hero">
        <div className="heroText">
          <div className="badge">🎁 فرصة مجانية محدودة للتجار</div>

          <h1>
            أضف منتجك مجانًا على <span>BPS Chat</span>
          </h1>

          <p>
            أرسل رابط منتج واحد من متجرك، وسنضيفه مجانًا داخل BPS Chat.
            عند ضغط الزائر على صورة المنتج ينتقل مباشرة إلى متجرك لإتمام الشراء.
          </p>

          <div className="heroCtaBox">
 <div className="limitedBadge">
  🚀 أول منتج مجاني بالكامل
</div>

  <Link href="/customer-offers/add" className="heroAddBtn">
    🚀 أضف منتجك مجاناً الآن
  </Link>

  <div className="ctaBenefits">
    <span>✅ إضافة مجانية</span>
    <span>✅ ظهور لمدة 6 أشهر</span>
    <span>✅ تحويل الزوار مباشرة إلى متجرك</span>
  </div>

  <a
    href="https://wa.me/966549330606?text=مرحبًا، أريد إضافة منتجي مجانًا على BPS Chat"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsappBtn bigWhatsapp"
  >
    أرسل رابط المنتج على واتساب
  </a>
</div>
        </div>

        <div className="heroMiddleCard">
          <div className="middleBadge">🚀 بدون رسوم أو عمولات</div>

          <h2>
            أضف أول منتج
            <span> مجاناً بالكامل</span>
          </h2>

          <p>
            أرسل رابط منتج واحد من متجرك، وسنضيفه داخل BPS Chat ليصل الزوار
            مباشرة إلى متجرك.
          </p>

          <Link href="/customer-offers/add" className="middleAddBtn">
            🚀 أضف أول منتج مجاناً الآن
          </Link>

          <div className="middleMiniBenefits">
            <span>✅ إضافة مجانية</span>
            <span>✅ بدون عمولات</span>
            <span>✅ تحويل مباشر لمتجرك</span>
          </div>
        </div>
        

        <div className="flowBox">
          <div className="flowItem">📦 منتجك</div>
          <div className="arrow">←</div>
          <div className="flowItem active">🤖 BPS Chat</div>
          <div className="arrow">←</div>
          <div className="flowItem">👥 الزوار</div>
          <div className="arrow">←</div>
          <div className="flowItem">🛒 متجرك</div>
        </div>
      </section>

      <section className="offerBanner">
       <h2>
  أضف أول منتج مجاناً بالكامل
</h2>

<p>
  بدون رسوم أو عمولات. أرسل رابط منتجك وسيظهر داخل BPS Chat ويقود الزوار مباشرة إلى متجرك.
</p>
      </section>

      <section className="features">
        <div>
          <span>🚀</span>
          <h3>ظهور إضافي</h3>
          <p>منتجك يظهر أمام زوار يبحثون عن منتجات وعروض.</p>
        </div>

        <div>
          <span>🎯</span>
          <h3>زيارات مباشرة</h3>
          <p>الزائر ينتقل من صفحة المنتج مباشرة إلى رابط متجرك.</p>
        </div>

        <div>
          <span>💰</span>
          <h3>بدون عمولات</h3>
          <p>لا نأخذ أي نسبة من مبيعاتك. العميل يشتري من متجرك مباشرة.</p>
        </div>
      </section>

      <section className="steps">
        <h2>كيف تعمل الخدمة؟</h2>

        <div className="stepsGrid">
          <div>
            <b>1</b>
            <h3>أرسل رابط المنتج</h3>
            <p>أرسل لنا رابط أي منتج من متجرك.</p>
          </div>

          <div>
            <b>2</b>
            <h3>نضيفه مجانًا</h3>
            <p>نقوم بإضافة المنتج داخل BPS Chat بعد المراجعة.</p>
          </div>

          <div>
            <b>3</b>
            <h3>الزوار يصلون لمتجرك</h3>
            <p>عند الضغط على المنتج ينتقل الزائر مباشرة إلى متجرك.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>جاهز لزيادة ظهور منتجاتك؟</h2>
        <Link
  href="/customer-offers/add"
  className="miniAddBtn"
>
  🚀 أضف أول منتج مجاناً الآن
</Link>

        <div className="heroActions center">
          <Link href="/customer-offers/add" className="primaryBtn">
            أضف منتجك مجانًا
          </Link>

          <Link href="/customer-offers" className="secondaryBtn">
            شاهد متجر العملاء
          </Link>
        </div>
      </section>

      <section className="faq">
        <h2>الأسئلة الشائعة</h2>

        <details>
          <summary>هل إضافة المنتج مجانية؟</summary>
          <p>نعم، حاليًا نضيف منتجات المتاجر مجانًا لفترة محدودة.</p>
        </details>

        <details>
          <summary>هل تأخذون عمولة على البيع؟</summary>
          <p>لا. العميل ينتقل إلى متجرك مباشرة والشراء يتم عندك.</p>
        </details>

        <details>
          <summary>هل أحتاج أسجل؟</summary>
          <p>يمكنك التسجيل وإضافة المنتج بنفسك، أو إرسال رابط المنتج لنا على واتساب.</p>
        </details>
      </section>

      <style jsx>{`
        .storesLanding {
          min-height: 100vh;
          background: #f8fafc;
          color: #0f172a;
        }

        .hero {
  position: relative;
  padding: 90px 20px 70px;
  background:
    radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.25), transparent 30%),
    radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.25), transparent 30%),
    linear-gradient(135deg, #020617, #0f172a);
  color: white;
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  gap: 28px;
  align-items: center;
}
  .miniAddBtn{
  display:inline-flex;
  align-items:center;
  justify-content:center;

  padding:12px 22px;
  margin-top:10px;

  border-radius:999px;

  background:linear-gradient(
    135deg,
    #ff6b35,
    #ff8c42
  );

  color:#fff;
  text-decoration:none;

  font-weight:900;
  font-size:16px;

  box-shadow:
    0 0 20px rgba(255,107,53,.45);

  transition:.25s ease;
}

.miniAddBtn:hover{
  transform:translateY(-2px) scale(1.05);
}
  .heroMiddleCard {
  position: relative;
  z-index: 4;
  padding: 34px 28px;
  border-radius: 36px;
  text-align: center;
  overflow: hidden;

  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.13),
    rgba(255,255,255,0.045)
  );

  border: 1px solid rgba(255,255,255,0.18);

  backdrop-filter: blur(22px);

  box-shadow:
    0 0 45px rgba(34,197,94,0.28),
    0 0 90px rgba(37,99,235,0.22),
    inset 0 0 30px rgba(255,255,255,0.06);

  animation: middleFloat 3.2s ease-in-out infinite;
}

.heroMiddleCard::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 36px;
  padding: 2px;
  background: linear-gradient(135deg, #22c55e, #60a5fa, #a78bfa);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.heroMiddleCard::after {
  content: "";
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 999px;
  background: rgba(34,197,94,0.22);
  filter: blur(55px);
  right: -70px;
  top: -80px;
  z-index: -1;
}

.middleBadge {
  display: inline-flex;
  padding: 9px 18px;
  border-radius: 999px;
  background: rgba(15,23,42,0.55);
  border: 1px solid rgba(255,255,255,0.16);
  color: #bbf7d0;
  font-size: 14px;
  font-weight: 950;
  margin-bottom: 16px;
}

.heroMiddleCard h2 {
  margin: 0;
  color: white;
  font-size: clamp(32px, 4vw, 54px);
  line-height: 1.25;
  font-weight: 950;
}

.heroMiddleCard h2 span {
  display: block;
  background: linear-gradient(135deg, #22c55e, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  color: transparent;
}

.heroMiddleCard p {
  color: #dbeafe;
  line-height: 1.9;
  font-size: 16px;
  margin: 18px auto 0;
  max-width: 520px;
}

.middleAddBtn {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 460px;

  margin: 30px auto 18px;
  padding: 24px 30px;

  border-radius: 24px;

  background: linear-gradient(135deg, #22c55e, #16a34a, #2563eb);

  color: #fff;
  font-size: 28px;
  font-weight: 950;
  text-decoration: none;

  box-shadow:
    0 0 30px rgba(34,197,94,.65),
    0 0 80px rgba(37,99,235,.35);

  animation: pulseBtn 1.7s infinite;
  transition: .25s ease;
}

.middleAddBtn:hover {
  transform: translateY(-5px) scale(1.05);
}


.middleMiniBenefits {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
}

.middleMiniBenefits span {
  padding: 8px 11px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  color: #dbeafe;
  font-size: 13px;
  font-weight: 900;
}

@keyframes middleFloat {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

        .heroText {
          max-width: 720px;
        }

        .badge {
          display: inline-block;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          margin-bottom: 20px;
          font-weight: 900;
        }

        h1 {
          font-size: clamp(38px, 7vw, 72px);
          line-height: 1.15;
          margin: 0;
          font-weight: 950;
        }

        h1 span {
          background: linear-gradient(135deg, #22c55e, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          color: transparent;
        }

        .hero p {
          font-size: 20px;
          line-height: 1.9;
          color: #dbeafe;
          max-width: 650px;
        }

        .heroActions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 28px;
        }
.heroCtaBox {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.limitedBadge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 9px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ef4444, #f97316);
  color: #fff;
  font-size: 16px;
  font-weight: 950;
  box-shadow: 0 0 25px rgba(239, 68, 68, 0.35);
}

.heroAddBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 19px 46px;
  border-radius: 999px;
  background: linear-gradient(135deg, #22c55e, #16a34a, #2563eb);
  color: #fff;
  font-size: 24px;
  font-weight: 950;
  text-decoration: none;
  box-shadow:
    0 0 0 0 rgba(34, 197, 94, 0.65),
    0 14px 42px rgba(34, 197, 94, 0.35);
  animation: pulseBtn 1.7s infinite;
  transition: 0.25s ease;
}

.heroAddBtn:hover {
  transform: translateY(-4px) scale(1.04);
}

@keyframes pulseBtn {
  0% {
    box-shadow:
      0 0 0 0 rgba(34, 197, 94, 0.65),
      0 14px 42px rgba(34, 197, 94, 0.35);
  }

  70% {
    box-shadow:
      0 0 0 18px rgba(34, 197, 94, 0),
      0 14px 42px rgba(34, 197, 94, 0.35);
  }

  100% {
    box-shadow:
      0 0 0 0 rgba(34, 197, 94, 0),
      0 14px 42px rgba(34, 197, 94, 0.35);
  }
}

.ctaBenefits {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: #dbeafe;
  font-weight: 900;
  font-size: 15px;
}

.ctaBenefits span {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.bigWhatsapp {
  padding: 14px 26px;
  font-size: 17px;
}
        .heroActions.center {
          justify-content: center;
        }

        .primaryBtn,
        .whatsappBtn,
        .secondaryBtn {
          padding: 15px 24px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 950;
          transition: 0.25s;
        }

        .primaryBtn {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.35);
        }

        .whatsappBtn {
          background: white;
          color: #111827;
        }

        .secondaryBtn {
          background: #0f172a;
          color: white;
        }

        .primaryBtn:hover,
        .whatsappBtn:hover,
        .secondaryBtn:hover {
          transform: translateY(-3px);
        }

        .flowBox {
          display: grid;
          gap: 16px;
          justify-items: center;
        }

        .flowItem {
          width: 230px;
          padding: 24px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          text-align: center;
          font-size: 24px;
          font-weight: 950;
          animation: float 3s ease-in-out infinite;
        }

        .flowItem.active {
          background: linear-gradient(135deg, #22c55e, #2563eb);
        }

        .arrow {
          font-size: 30px;
          color: #93c5fd;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .offerBanner {
          max-width: 1100px;
          margin: -35px auto 40px;
          padding: 32px 22px;
          border-radius: 30px;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          text-align: center;
          box-shadow: 0 25px 70px rgba(15, 23, 42, 0.15);
          position: relative;
          z-index: 3;
        }

        .offerBanner h2 {
          font-size: clamp(26px, 4vw, 42px);
          margin: 0 0 10px;
        }

        .features,
        .stepsGrid {
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .features div,
        .stepsGrid div {
          background: white;
          padding: 30px;
          border-radius: 28px;
          box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .features span {
          font-size: 46px;
        }

        .features h3,
        .stepsGrid h3 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .features p,
        .stepsGrid p {
          color: #64748b;
          line-height: 1.8;
        }

        .steps {
          padding: 30px 0;
        }

        .steps h2,
        .cta h2,
        .faq h2 {
          text-align: center;
          font-size: 38px;
        }

        .stepsGrid b {
          display: inline-flex;
          width: 48px;
          height: 48px;
          border-radius: 999px;
          align-items: center;
          justify-content: center;
          background: #22c55e;
          color: white;
          font-size: 24px;
        }

        .cta {
          max-width: 1100px;
          margin: 50px auto;
          padding: 45px 20px;
          border-radius: 34px;
          background: linear-gradient(135deg, #2563eb, #22c55e);
          color: white;
          text-align: center;
        }

        .cta p {
          font-size: 20px;
        }

        .faq {
          max-width: 900px;
          margin: 50px auto 80px;
          padding: 0 20px;
        }

        details {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 18px 22px;
          margin-bottom: 12px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }

        summary {
          cursor: pointer;
          font-weight: 900;
          font-size: 18px;
        }

        details p {
          color: #64748b;
          line-height: 1.8;
        }

        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
          }
            .heroMiddleCard {
  order: 1;
}

.heroText {
  order: 2;
}

.flowBox {
  order: 3;
}

.middleAddBtn {
  width: 100%;
  max-width: 360px;
  font-size: 19px;
  padding: 17px 20px;
}
.heroCtaBox {
  align-items: center;
}

.heroAddBtn {
  width: 100%;
  max-width: 360px;
  font-size: 21px;
  padding: 18px 24px;
}

.ctaBenefits {
  justify-content: center;
}
          .heroActions {
            justify-content: center;
          }

          .features,
          .stepsGrid {
            grid-template-columns: 1fr;
          }

          .offerBanner {
            margin: 20px;
          }
        }
      `}</style>
    </main>
  );
}