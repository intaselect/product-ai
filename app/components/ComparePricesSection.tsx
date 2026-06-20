import Link from "next/link";

const countries = [
  { code: "sa", name: "السعودية", flag: "🇸🇦" },
  { code: "eg", name: "مصر", flag: "🇪🇬" },
  { code: "ae", name: "الإمارات", flag: "🇦🇪" },
  { code: "kw", name: "الكويت", flag: "🇰🇼" },
  { code: "qa", name: "قطر", flag: "🇶🇦" },
  { code: "bh", name: "البحرين", flag: "🇧🇭" },
];

const products = [
  { slug: "samsung", name: "سامسونج", icon: "📱" },
  { slug: "xiaomi", name: "شاومي", icon: "📱" },
  { slug: "iphone-16", name: "ايفون", icon: "📱" },
  { slug: "laptop", name: "لابتوب", icon: "💻" },
  { slug: "airpods", name: "ايربودز", icon: "🎧" },
  { slug: "ps5", name: "بلايستيشن 5", icon: "🎮" },
];

export default function ComparePricesSection() {
  return (
    <section className="comparePricesSection" dir="rtl">
      <div className="compareHeader">
        <span>⚔️ عالم المنتجات | Product Comparisons</span>
        <h2>قارن أسعار المنتجات في عالم المنتجات حسب الدولة</h2>
        <p>
          صفحات مقارنة تجمع نتائج بحث BPS Chat مع عروض BPS Market في صفحة واحدة.
        </p>
      </div>

      <div className="compareCountryGrid">
        {countries.map((country) => (
          <div className="compareCountryCard" key={country.code}>
            <h3>
              <span>{country.flag}</span>
              {country.name}
            </h3>

            <div className="compareLinks">
              {products.map((product) => (
                <Link
                  key={`${country.code}-${product.slug}`}
                  href={`/compare/${country.code}/${product.slug}`}
                >
                  {product.icon} {product.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link href="/compare" className="compareMainBtn">
        مشاهدة كل صفحات المقارنة
      </Link>

      <style>{`
        .comparePricesSection {
          max-width: 1180px;
          margin: 28px auto;
          padding: 26px;
          border-radius: 30px;
          background: linear-gradient(135deg,#ffffff,#f8fafc);
          border: 1px solid #dbeafe;
          box-shadow: 0 16px 40px rgba(15,23,42,.08);
        }

        .compareHeader {
          text-align: center;
          margin-bottom: 22px;
        }

        .compareHeader span {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          background: #fff7ed;
color: #b45309;
border:1px solid rgba(245,158,11,.2);
          font-weight: 950;
          margin-bottom: 10px;
        }

        .compareHeader h2 {
          margin: 0;
          color: #111827;
          font-size: 28px;
          font-weight: 950;
        }

        .compareHeader p {
          margin: 8px auto 0;
          max-width: 720px;
          color: #64748b;
          line-height: 1.9;
          font-weight: 800;
        }

        .compareCountryGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .compareCountryCard {
          padding: 18px;
          border-radius: 24px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
        }

        .compareCountryCard h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 14px;
          color: #111827;
          font-size: 20px;
          font-weight: 950;
        }

        .compareCountryCard h3 span {
          font-size: 28px;
        }

        .compareLinks {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .compareLinks a {
          text-decoration: none;
          color: #111827;
          background: white;
          border: 1px solid #e5e7eb;
          padding: 11px;
          border-radius: 14px;
          font-weight: 900;
          text-align: center;
          transition: .25s;
        }

        .compareLinks a:hover {
          transform: translateY(-3px);
          border-color: #f59e0b;
box-shadow: 0 12px 25px rgba(245,158,11,.18);
        }

        .compareMainBtn {
          display: block;
          width: fit-content;
          margin: 22px auto 0;
          text-decoration: none;
          color: white;
          background: linear-gradient(
  135deg,
  #f59e0b,
  #d97706
);

          padding: 14px 22px;
          border-radius: 16px;
          font-weight: 950;
        }
.compareMainBtn:hover{
  transform:translateY(-3px);
  box-shadow:0 18px 35px rgba(245,158,11,.28);
}
        @media (max-width: 900px) {
          .compareCountryGrid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .comparePricesSection {
            margin: 18px 12px;
            padding: 18px;
          }

          .compareCountryGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}