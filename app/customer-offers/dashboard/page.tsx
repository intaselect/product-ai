"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Offer = {
  id: number;
  product_name: string;
  price: string;
  image_url: string;
  product_url: string;
  store_name: string | null;
  country: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export default function SellerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [stats, setStats] = useState({
    maxOffers: 1,
    usedOffers: 0,
    remainingOffers: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token || "";

      if (!token) {
        setLoading(false);
        return;
      }

      setAccessToken(token);
      setEmail(data.session?.user.email || "");

      try {
        const res = await fetch("/api/customer-offers/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (!res.ok || !json.ok) {
          setError(json.error || "حدث خطأ أثناء تحميل الداشبورد");
          return;
        }

        setStats(json.stats);
        setOffers(json.offers || []);
      } catch {
        setError("حدث خطأ غير متوقع أثناء تحميل الداشبورد");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const approved = offers.filter((o) => o.status === "approved").length;
  const pending = offers.filter((o) => o.status === "pending").length;
  const rejected = offers.filter((o) => o.status === "rejected").length;

  if (loading) {
    return (
      <main className="dashboardPage" dir="rtl">
        <section className="centerCard">
          <div className="bigIcon">⏳</div>
          <h1>جاري تحميل لوحة التاجر...</h1>
        </section>
        <style>{styles}</style>
      </main>
    );
  }

  if (!accessToken) {
    return (
      <main className="dashboardPage" dir="rtl">
        <section className="centerCard">
          <div className="bigIcon">🔐</div>
          <h1>سجّل دخولك كتاجر</h1>
          <p>
            لازم تسجل دخول علشان تشوف عروضك، رصيدك، وحالة منتجاتك في متجر عملاء
            بي بي اس.
          </p>
          <div className="actions">
            <Link href="/login" className="primaryBtn">تسجيل الدخول</Link>
            <Link href="/customer-offers" className="secondaryBtn">متجر العملاء</Link>
          </div>
        </section>
        <style>{styles}</style>
      </main>
    );
  }

  return (
    <main className="dashboardPage" dir="rtl">
      <section className="hero">
        <div className="glow one" />
        <div className="glow two" />

        <span className="badge">🤖 لوحة تاجر BPS Chat الذكية</span>

        <h1>
          داشبورد متجر عملاء <span>بي بي اس</span>
        </h1>

        <p>
          تابع عروضك، رصيد المنتجات المتاح، حالة الموافقة، وعدد العروض المنشورة
          داخل متجر عملاء BPS Chat — بيع واشتري منتجاتك بسهولة.
        </p>

        <div className="sellerEmail">📧 {email}</div>

        <div className="heroActions">
          <Link href="/customer-offers/add" className="primaryBtn">
            + إضافة عرض جديد
          </Link>
          <Link href="/customer-offers" className="secondaryBtn">
            مشاهدة متجر العملاء
          </Link>
        </div>
      </section>

      {error && <div className="errorBox">{error}</div>}

      <section className="statsGrid">
        <div className="statCard">
          <strong>{stats.maxOffers}</strong>
          <span>إجمالي الرصيد</span>
        </div>
        <div className="statCard">
          <strong>{stats.usedOffers}</strong>
          <span>عروض مستخدمة</span>
        </div>
        <div className="statCard green">
          <strong>{stats.remainingOffers}</strong>
          <span>عروض متبقية</span>
        </div>
        <div className="statCard">
          <strong>{approved}</strong>
          <span>معتمدة</span>
        </div>
        <div className="statCard yellow">
          <strong>{pending}</strong>
          <span>قيد المراجعة</span>
        </div>
        <div className="statCard red">
          <strong>{rejected}</strong>
          <span>مرفوضة</span>
        </div>
      </section>

      <section className="upgradeBox">
  <div>
    <h2>باقات زيادة رصيد العروض</h2>
    <p>
      اختر الباقة المناسبة لك، وبعد الدفع تواصل معنا على واتساب لتفعيل الرصيد داخل حسابك.
    </p>
  </div>

  <div className="plansGrid">

    {/* باقة 5 منتجات */}
    <a
      href="https://www.paypal.com/ncp/payment/B4V5Q7B4CF5LE"
      target="_blank"
      rel="noopener noreferrer"
      className="planCard"
    >
      <strong>5 منتجات</strong>
      <span>5 دولار / شهر</span>
      <b>شراء الباقة</b>
    </a>

    {/* باقة 15 منتج */}
    <a
      href="https://www.paypal.com/ncp/payment/MNVA672HM8CKN"
      target="_blank"
      rel="noopener noreferrer"
      className="planCard featured"
    >
      <strong>15 منتج</strong>
      <span>10 دولار / شهر</span>
      <b>الأكثر طلبًا</b>
    </a>

    {/* باقة 50 منتج */}
    <a
      href="https://www.paypal.com/ncp/payment/JBH72Y65YU8D4"
      target="_blank"
      rel="noopener noreferrer"
      className="planCard"
    >
      <strong>50 منتج</strong>
      <span>20 دولار / شهر</span>
      <b>شراء الباقة</b>
    </a>

  </div>

  {/* واتساب */}
  <a
    href="https://wa.me/966549330606?text=دفعت%20باقة%20عروض%20BPS%20Chat%20وعايز%20تفعيل%20الرصيد"
    target="_blank"
    className="upgradeBtn"
  >
    📱 تواصل بعد الدفع
  </a>
</section>

      {offers.length === 0 ? (
        <section className="emptyBox">
          <div className="bigIcon">🛒</div>
          <h2>لسه مفيش عروض</h2>
          <p>ابدأ بإضافة أول منتج لك في متجر عملاء BPS Chat.</p>
          <Link href="/customer-offers/add" className="primaryBtn">
            أضف أول عرض
          </Link>
        </section>
      ) : (
        <section className="offersGrid">
          {offers.map((offer) => (
            <article key={offer.id} className={`offerCard ${offer.status}`}>
              <div className="imageWrap">
                <img src={offer.image_url} alt={offer.product_name} />
                <span className={`status ${offer.status}`}>
                  {offer.status === "approved"
                    ? "معتمد"
                    : offer.status === "pending"
                    ? "قيد المراجعة"
                    : "مرفوض"}
                </span>
              </div>

              <div className="cardContent">
                <p className="storeName">{offer.store_name || "متجر عميل BPS"}</p>
                <h3>{offer.product_name}</h3>
                <p className="price">{offer.price}</p>

                <div className="cardMeta">
                  <span>الدولة: {offer.country || "غير محدد"}</span>
                  <span>
                    {new Date(offer.created_at).toLocaleDateString("ar-EG")}
                  </span>
                </div>

                <a
                  href={offer.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="productBtn"
                >
                  فتح رابط المنتج
                </a>
                <Link
  href={`/customer-offers/add?edit=${offer.id}`}
  className="secondaryBtn"
>
  ✏️ تعديل العرض
</Link>
              </div>
            </article>
          ))}
        </section>
      )}

      <style>{styles}</style>
    </main>
  );
}

const styles = `
  .dashboardPage {
    min-height: 100vh;
    background:
      radial-gradient(circle at 18% 8%, rgba(34,197,94,0.16), transparent 28%),
      radial-gradient(circle at 84% 12%, rgba(37,99,235,0.15), transparent 26%),
      linear-gradient(180deg, #171717 0%, #212121 45%, #101010 100%);
    color: white;
    padding: 22px 16px 80px;
  }
.plansGrid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.planCard {
  padding: 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  text-decoration: none;
  color: white;
  display: grid;
  gap: 6px;
  transition: 0.25s;
  text-align: center;
}

.planCard strong {
  font-size: 20px;
  color: #bbf7d0;
}

.planCard span {
  font-weight: bold;
}

.planCard b {
  color: #22c55e;
}

.planCard:hover {
  transform: translateY(-5px);
  border-color: rgba(34,197,94,0.5);
  box-shadow: 0 0 25px rgba(34,197,94,0.25);
}

.planCard.featured {
  background: linear-gradient(135deg, rgba(34,197,94,0.2), rgba(37,99,235,0.15));
}
  .hero {
    position: relative;
    max-width: 1100px;
    margin: 0 auto 18px;
    text-align: center;
    padding: 30px 18px 24px;
    border-radius: 28px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 22px 70px rgba(0,0,0,0.38);
    overflow: hidden;
  }

  .glow {
    position: absolute;
    width: 240px;
    height: 240px;
    border-radius: 999px;
    filter: blur(60px);
    opacity: 0.34;
    animation: floatGlow 6s ease-in-out infinite alternate;
  }

  .one {
    background: #22c55e;
    top: -130px;
    right: -80px;
  }

  .two {
    background: #2563eb;
    bottom: -130px;
    left: -80px;
    animation-delay: 1.4s;
  }

  @keyframes floatGlow {
    from { transform: translateY(0) scale(1); }
    to { transform: translateY(18px) scale(1.12); }
  }

  .badge {
    position: relative;
    z-index: 2;
    display: inline-block;
    padding: 8px 15px;
    border-radius: 999px;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.35);
    color: #bbf7d0;
    font-size: 13px;
    font-weight: 900;
    margin-bottom: 10px;
  }

  .hero h1 {
    position: relative;
    z-index: 2;
    margin: 0;
    font-size: clamp(30px, 5vw, 54px);
    line-height: 1.2;
    font-weight: 950;
  }

  .hero h1 span {
    background: linear-gradient(135deg, #22c55e, #60a5fa, #fff);
    -webkit-background-clip: text;
    color: transparent;
  }

  .hero p {
    position: relative;
    z-index: 2;
    max-width: 780px;
    margin: 12px auto 0;
    color: #d6d6d6;
    line-height: 1.8;
    font-size: 15.5px;
  }

  .sellerEmail {
    position: relative;
    z-index: 2;
    display: inline-block;
    margin-top: 14px;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.1);
    color: #bbf7d0;
    font-weight: 800;
    font-size: 13px;
  }

  .heroActions,
  .actions {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 18px;
  }

  .primaryBtn,
  .secondaryBtn,
  .upgradeBtn,
  .productBtn {
    text-decoration: none;
    transition: all .25s ease;
  }

  .primaryBtn {
    display: inline-block;
    padding: 12px 23px;
    border-radius: 999px;
    background: linear-gradient(135deg, #16a34a, #22c55e);
    color: white;
    font-weight: 950;
    box-shadow: 0 0 28px rgba(34,197,94,0.36);
  }

  .primaryBtn:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 42px rgba(34,197,94,0.55);
  }

  .secondaryBtn {
    display: inline-block;
    padding: 12px 21px;
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    color: white;
    font-weight: 900;
  }

  .secondaryBtn:hover {
    background: rgba(255,255,255,0.14);
    transform: translateY(-3px);
  }

  .statsGrid {
    max-width: 1100px;
    margin: 0 auto 18px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
  }

  .statCard {
    padding: 16px 12px;
    border-radius: 20px;
    background: rgba(255,255,255,0.045);
    border: 1px solid rgba(255,255,255,0.08);
    text-align: center;
    box-shadow: 0 12px 35px rgba(0,0,0,0.22);
  }

  .statCard strong {
    display: block;
    font-size: 28px;
    color: #bfdbfe;
    font-weight: 950;
  }

  .statCard span {
    display: block;
    margin-top: 5px;
    color: #d1d5db;
    font-size: 12.5px;
    font-weight: 800;
  }

  .statCard.green strong { color: #86efac; }
  .statCard.yellow strong { color: #fde68a; }
  .statCard.red strong { color: #fecaca; }

  .upgradeBox {
    max-width: 1100px;
    margin: 0 auto 22px;
    padding: 20px;
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(34,197,94,0.12), rgba(37,99,235,0.10));
    border: 1px solid rgba(34,197,94,0.22);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
  }

  .upgradeBox h2 {
    margin: 0 0 7px;
    font-size: 22px;
  }

  .upgradeBox p {
    margin: 0;
    color: #d1d5db;
    line-height: 1.8;
    font-size: 14px;
  }

  .upgradeBtn {
    white-space: nowrap;
    padding: 12px 20px;
    border-radius: 999px;
    background: white;
    color: #111;
    font-weight: 950;
  }

  .sectionTitle {
    max-width: 1100px;
    margin: 0 auto 14px;
  }

  .sectionTitle h2 {
    margin: 0 0 6px;
    font-size: 26px;
  }

  .sectionTitle p {
    margin: 0;
    color: #cfcfcf;
    line-height: 1.7;
  }

  .offersGrid {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
    gap: 18px;
  }

  .offerCard {
    overflow: hidden;
    border-radius: 24px;
    background: linear-gradient(180deg, #202020, #121212);
    border: 1px solid rgba(255,255,255,0.09);
    box-shadow: 0 18px 45px rgba(0,0,0,0.34);
  }

  .offerCard.approved { border-color: rgba(34,197,94,0.35); }
  .offerCard.pending { border-color: rgba(234,179,8,0.35); }
  .offerCard.rejected { border-color: rgba(239,68,68,0.35); }

  .imageWrap {
    position: relative;
    height: 205px;
    background: #0e0e0e;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }

  .imageWrap img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .status {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 11px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 950;
  }

  .status.approved {
    background: rgba(34,197,94,0.18);
    color: #bbf7d0;
  }

  .status.pending {
    background: rgba(234,179,8,0.18);
    color: #fde68a;
  }

  .status.rejected {
    background: rgba(239,68,68,0.18);
    color: #fecaca;
  }

  .cardContent {
    padding: 15px;
  }

  .storeName {
    margin: 0 0 7px;
    color: #9ca3af;
    font-size: 12px;
    font-weight: 800;
  }

  .cardContent h3 {
    margin: 0 0 10px;
    font-size: 16px;
    line-height: 1.6;
  }

  .price {
    margin: 0 0 10px;
    color: #22c55e;
    font-size: 21px;
    font-weight: 950;
  }

  .cardMeta {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    color: #cfcfcf;
    font-size: 12px;
    margin-bottom: 12px;
  }

  .productBtn {
    display: block;
    text-align: center;
    padding: 11px;
    border-radius: 14px;
    background: white;
    color: #111;
    font-weight: 950;
  }

  .centerCard,
  .emptyBox,
  .errorBox {
    max-width: 760px;
    margin: 80px auto;
    text-align: center;
    padding: 38px 22px;
    border-radius: 28px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
  }

  .bigIcon {
    font-size: 58px;
    margin-bottom: 14px;
  }

  .centerCard h1,
  .emptyBox h2 {
    margin: 0 0 12px;
    font-size: 32px;
  }

  .centerCard p,
  .emptyBox p {
    color: #d1d5db;
    line-height: 1.8;
  }

  .errorBox {
    color: #fecaca;
    border-color: rgba(239,68,68,0.35);
    margin: 20px auto;
  }

  @media (max-width: 850px) {
    .statsGrid {
      grid-template-columns: repeat(3, 1fr);
    }

    .upgradeBox {
      flex-direction: column;
      text-align: center;
    }
  }

 @media (max-width: 700px) {
  .plansGrid {
    grid-template-columns: 1fr;
  }
}

    .hero {
      padding: 24px 12px 20px;
      border-radius: 24px;
    }

    .statsGrid {
      grid-template-columns: repeat(2, 1fr);
    }

    .offersGrid {
      grid-template-columns: 1fr;
    }
  }
`;