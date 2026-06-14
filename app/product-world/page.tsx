import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "عالم المنتجات من BPS Chat | متجر وعروض ومقارنة أسعار",
  description:
    "عالم المنتجات من BPS Chat هو دليلك لاكتشاف المنتجات، عروض اليوم، متجر عالم المنتجات، ومقارنة الأسعار في السعودية ومصر والخليج.",
};

export default function ProductWorldPage() {
  return (
    <main dir="rtl" style={{ padding: "50px 16px", maxWidth: 1100, margin: "0 auto" }}>
      <section style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 900, color: "#f97316" }}>
          🌍 عالم المنتجات من BPS Chat
        </div>

        <h1>عالم المنتجات من بي بي اس شات</h1>

        <p style={{ fontSize: 18, lineHeight: 1.9 }}>
          اكتشف المنتجات، قارن الأسعار، تابع عروض اليوم، وتصفح متجر عالم المنتجات
          في السعودية ومصر والإمارات والكويت وقطر والبحرين.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
          <Link href="/customer-offers">🛍️ متجر عالم المنتجات</Link>
          <Link href="/daily-deals">🔥 عروض عالم المنتجات اليومية</Link>
          <Link href="/">🔎 قارن الأسعار الآن</Link>
        </div>
      </section>

      <section style={{ marginTop: 40, lineHeight: 1.9 }}>
        <h2>ما هو عالم المنتجات؟</h2>
        <p>
          عالم المنتجات من BPS Chat هو قسم يجمع بين البحث عن المنتجات، مقارنة الأسعار،
          عروض اليوم، ومتجر المنتجات في مكان واحد، ليساعد المستخدم على الوصول لأفضل
          سعر قبل الشراء.
        </p>

        <h2>متجر عالم المنتجات</h2>
        <p>
          متجر عالم المنتجات يعرض منتجات وعروض من العملاء والمتاجر، مع روابط مباشرة
          للشراء وصفحات SEO لكل منتج.
        </p>

        <h2>عروض عالم المنتجات اليومية</h2>
        <p>
          عروض عالم المنتجات اليومية تعرض خصومات مختارة من المتاجر الكبيرة لمساعدة
          المستخدم على اكتشاف العروض بسرعة.
        </p>
      </section>
    </main>
  );
}