import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "مقارنة أسعار العطور | أفضل عروض عطور في السعودية والخليج ومصر",
  description:
    "قارن أسعار العطور الرجالي والنسائي في السعودية والإمارات والكويت وقطر والبحرين ومصر عبر BPS Chat وشاهد عروض العطور الأصلية من Amazon وNoon وJumia وCarrefour.",
  keywords: [
    "عروض عطور",
    "سعر عطر",
    "مقارنة أسعار العطور",
    "أفضل سعر عطر",
    "عطور رجالي",
    "عطور نسائي",
    "عطور أصلية",
    "عطور تقسيط",
    "Perfume price comparison",
    "Perfume offers",
    "Perfume deals",
    "سعر عطر في السعودية",
    "سعر عطر في الإمارات",
    "سعر عطر في مصر",
    "عطور نون",
    "عطور أمازون",
    "عطور جوميا",
    "عطور درعه",
    "العربية للعود",
    "BPS Chat",
    "بي بي اس شات",
    "Amazon",
    "Noon",
    "Jumia",
    "Carrefour",
  ],
};

export default function PerfumePriceComparisonPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">BPS Chat | بي بي اس شات</div>

        <h1>
          مقارنة أسعار العطور
          <span>اعرف أفضل عروض العطور في السعودية والخليج ومصر قبل الشراء</span>
        </h1>

        <p>
          لو بتبحث عن <strong>عطور رجالي</strong> أو <strong>عطور نسائي</strong>{" "}
          أو <strong>Perfume offers</strong> في السعودية أو الإمارات أو الكويت أو قطر
          أو البحرين أو مصر، يمكنك استخدام <strong>BPS Chat</strong> لمقارنة أسعار
          العطور بين المتاجر بدل فتح كل متجر لوحده.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث عن سعر عطر الآن
          </Link>
          <Link href="/bps-chat" className="secondaryBtn">
            ما هو BPS Chat؟
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تبحث عن عروض العطور من خلال BPS Chat؟</h2>

        <p>
          أسعار العطور تختلف جدًا من متجر لمتجر ومن دولة لدولة. ممكن تلاقي نفس
          العطر في Amazon بسعر مختلف عن Noon أو Jumia أو Carrefour أو متاجر العطور
          المحلية. لذلك المقارنة قبل الشراء مهمة جدًا، خصوصًا مع العطور الأصلية،
          العطور الرجالي، العطور النسائي، عطور الهدايا، وعروض العطور الموسمية.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>قارن بين المتاجر</h3>
            <p>
              شاهد عروض العطور من متاجر مختلفة مثل Amazon، Noon، Jumia، Carrefour،
              ومتاجر العطور حسب الدولة والمنتج.
            </p>
          </div>

          <div className="infoCard">
            <h3>اختار الدولة</h3>
            <p>
              ابحث عن سعر العطر في السعودية، الإمارات، الكويت، قطر، البحرين أو مصر
              وشاهد النتائج المناسبة لكل سوق.
            </p>
          </div>

          <div className="infoCard">
            <h3>وفّر وقت البحث</h3>
            <p>
              بدل ما تفتح أكثر من موقع يدويًا، اكتب اسم العطر مرة واحدة وقارن
              الأسعار والعروض بسرعة.
            </p>
          </div>
        </div>

        <h2>أنواع العطور التي يبحث عنها الناس</h2>

        <div className="quickLinks">
          <Link href="/search/عطور-رجالي-sa">عطور رجالي في السعودية</Link>
          <Link href="/search/عطور-نسائي-sa">عطور نسائي</Link>
          <Link href="/search/عطور-اصلية-ae">عطور أصلية في الإمارات</Link>
          <Link href="/search/عطور-نون-sa">عطور نون</Link>
          <Link href="/search/عطور-امازون-sa">عطور أمازون</Link>
          <Link href="/search/عطور-جوميا-eg">عطور جوميا في مصر</Link>
          <Link href="/search/عطور-هدايا-sa">عطور هدايا</Link>
          <Link href="/search/perfume-offers-sa">Perfume offers Saudi</Link>
        </div>

        <h2>كلمات بحث قوية عن عروض العطور</h2>

        <p>
          كثير من المستخدمين يبحثون عن: عروض عطور، أرخص عطر، سعر عطر اليوم،
          عطور أصلية، عطور رجالي فخمة، عطور نسائي، عطور تقسيط، Perfume deals،
          Perfume offers، عطور نون، عطور أمازون، عطور جوميا، عطور درعه،
          العربية للعود، عطور Sephora، أفضل عطر رجالي، وأفضل عطر نسائي.
        </p>

        <div className="quickLinks">
          <Link href="/search/عروض-عطور-sa">عروض عطور في السعودية</Link>
          <Link href="/search/ارخص-عطور-ae">أرخص عطور في الإمارات</Link>
          <Link href="/search/عطور-تقسيط-sa">عطور تقسيط</Link>
          <Link href="/search/عروض-عطور-نون-sa">عروض عطور نون</Link>
          <Link href="/search/عروض-عطور-امازون-sa">عروض عطور أمازون</Link>
          <Link href="/search/عطور-درعه-sa">عطور درعه</Link>
          <Link href="/search/العربية-للعود-sa">العربية للعود</Link>
        </div>

        <h2>مقارنة أسعار العطور حسب الدولة</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>الدولة</th>
                <th>أمثلة بحث</th>
                <th>متاجر قد تظهر</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>السعودية</td>
                <td>عطور رجالي، عطور نسائي، عروض عطور، عطور نون</td>
                <td>Amazon.sa، Noon، Carrefour، متاجر عطور محلية</td>
              </tr>
              <tr>
                <td>الإمارات</td>
                <td>Perfume price UAE، عطور أصلية، عروض Sephora</td>
                <td>Amazon.ae، Noon، Carrefour، Sharaf DG</td>
              </tr>
              <tr>
                <td>مصر</td>
                <td>سعر عطر في مصر، عطور جوميا، عطور أمازون مصر</td>
                <td>Jumia، Amazon.eg، Noon Egypt، متاجر محلية</td>
              </tr>
              <tr>
                <td>الكويت</td>
                <td>Perfume Kuwait، عطور رجالي ونسائي</td>
                <td>Lulu، Xcite، متاجر إلكترونية محلية</td>
              </tr>
              <tr>
                <td>قطر</td>
                <td>Perfume Qatar، عروض عطور قطر</td>
                <td>Lulu، Carrefour، متاجر قطرية</td>
              </tr>
              <tr>
                <td>البحرين</td>
                <td>Perfume Bahrain، عطور أصلية في البحرين</td>
                <td>متاجر البحرين الإلكترونية والمتاجر الكبرى</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>هل BPS Chat يبيع العطور مباشرة؟</h2>

        <p>
          لا. BPS Chat ليس متجرًا، لكنه يساعدك على البحث والمقارنة. بعد ما تجد
          نتيجة مناسبة، يمكنك الانتقال إلى المتجر الأصلي لمراجعة السعر النهائي،
          الشحن، التوفر، حجم العبوة، تقييمات المستخدمين، وهل العطر أصلي قبل الشراء.
        </p>

        <h2>نصائح قبل شراء العطور أونلاين</h2>

        <ul>
          <li>قارن السعر بين أكثر من متجر قبل الشراء.</li>
          <li>راجع حجم العبوة: 50ml أو 75ml أو 100ml أو 200ml.</li>
          <li>تأكد هل العطر Eau de Parfum أو Eau de Toilette.</li>
          <li>راجع تقييمات المستخدمين والمتجر.</li>
          <li>تأكد من سياسة الاسترجاع والشحن.</li>
          <li>قارن بين العطور الأصلية والعروض المخفضة بعناية.</li>
        </ul>

        <h2>روابط مهمة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
          <Link href="/bps-vs-amazon">BPS vs Amazon</Link>
          <Link href="/bps-vs-noon">BPS vs Noon</Link>
        </div>

        <div className="finalCta">
          <h2>ابدأ مقارنة أسعار العطور الآن</h2>
          <p>
            اكتب اسم العطر أو نوعه واختر الدولة، وشاهد النتائج بدل الاعتماد على
            متجر واحد فقط.
          </p>

          <Link href="/" className="primaryBtn">
            ابحث في BPS Chat
          </Link>
        </div>
      </section>

      <PopularSearches />

      <style>{`
        .seoPage {
          color: white;
          min-height: 100vh;
          background:
            radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%),
            radial-gradient(circle at right, rgba(0,180,255,0.07), transparent 25%),
            #0b0f14;
        }

        .hero {
          max-width: 980px;
          margin: 0 auto;
          padding: 54px 18px 30px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          background: rgba(16, 163, 127, 0.14);
          border: 1px solid rgba(16, 163, 127, 0.35);
          color: #7fffe0;
          padding: 8px 16px;
          border-radius: 999px;
          margin-bottom: 18px;
          font-weight: 700;
        }

        h1 {
          font-size: 42px;
          line-height: 1.35;
          margin: 0 0 18px;
        }

        h1 span {
          display: block;
          font-size: 24px;
          color: #cfcfcf;
          margin-top: 8px;
        }

        .hero p {
          max-width: 800px;
          margin: 0 auto;
          color: #e8e8e8;
          font-size: 18px;
          line-height: 2;
        }

        .ctaBox {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .primaryBtn,
        .secondaryBtn {
          display: inline-block;
          padding: 12px 18px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 800;
        }

        .primaryBtn {
          background: #10a37f;
          color: #fff;
        }

        .secondaryBtn {
          background: #2f2f2f;
          color: #fff;
          border: 1px solid #444;
        }

        .content {
          max-width: 980px;
          margin: 0 auto;
          padding: 25px 18px 50px;
          line-height: 2;
        }

        h2 {
          margin-top: 38px;
          font-size: 26px;
          color: #10a37f;
        }

        h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        p,
        li {
          font-size: 17px;
          color: #e8e8e8;
        }

        ul {
          padding-right: 22px;
        }

        .cardsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .infoCard {
          background: rgba(40,40,40,0.72);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 0 25px rgba(16,163,127,0.08);
        }

        .quickLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .quickLinks a {
          background: #2f2f2f;
          border: 1px solid #444;
          color: #fff;
          padding: 10px 14px;
          border-radius: 999px;
          text-decoration: none;
        }

        .quickLinks a:hover {
          border-color: #10a37f;
          color: #10a37f;
        }

        .tableWrap {
          overflow-x: auto;
          margin-top: 18px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        table {
          width: 100%;
          min-width: 760px;
          border-collapse: collapse;
          background: rgba(40,40,40,0.55);
        }

        th,
        td {
          padding: 15px;
          text-align: right;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: #e8e8e8;
        }

        th {
          color: #7fffe0;
          background: rgba(16, 163, 127, 0.1);
        }

        .finalCta {
          margin-top: 38px;
          text-align: center;
          background: rgba(40,40,40,0.55);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 0 30px rgba(16,163,127,0.12);
        }

        .finalCta p {
          max-width: 720px;
          margin: 0 auto 22px;
        }

        @media (max-width: 800px) {
          .cardsGrid {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 32px;
          }

          h1 span {
            font-size: 19px;
          }
        }
      `}</style>
    </main>
  );
}