import Link from "next/link";

export const metadata = {
  title: "أضف منتجك مجانًا | BPS Chat للتجار",
  description:
    "أضف منتجك مجانًا على BPS Chat واحصل على ظهور إضافي وزيارات مباشرة إلى متجرك. أول 100 متجر يحصلون على ظهور مجاني لمدة 6 أشهر.",
};

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

          <div className="heroActions">
            <Link href="/customer-offers/add" className="primaryBtn">
              🚀 أضف منتجك الآن
            </Link>

            <a
              href="https://wa.me/966549330606?text=مرحبًا، أريد إضافة منتجي مجانًا على BPS Chat"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsappBtn"
            >
              أرسل رابط المنتج على واتساب
            </a>
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
        <h2>أول 100 متجر يحصلون على ظهور مجاني لمدة 6 أشهر</h2>
        <p>بدون رسوم، بدون عمولات، وبدون عقود. أرسل رابط منتجك فقط.</p>
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
        <p>ابدأ الآن مجانًا قبل انتهاء فرصة أول 100 متجر.</p>

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
          padding: 90px 20px 70px;
          background:
            radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.25), transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.25), transparent 30%),
            linear-gradient(135deg, #020617, #0f172a);
          color: white;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 30px;
          align-items: center;
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