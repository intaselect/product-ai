import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";

export const metadata: Metadata = {
  title: "أفضل مواقع مقارنة الأسعار في السعودية 2026 | قبل الشراء أونلاين",
  description:
    "دليل مفيد عن أفضل طرق ومواقع مقارنة الأسعار في السعودية قبل الشراء أونلاين، مع نصائح لاختيار أفضل سعر من Amazon وNoon وJarir وExtra وCarrefour وBPS Chat.",
  keywords: [
    "أفضل مواقع مقارنة الأسعار في السعودية",
    "مقارنة الأسعار في السعودية",
    "أفضل سعر في السعودية",
    "أرخص سعر في السعودية",
    "مواقع مقارنة أسعار",
    "عروض السعودية",
    "عروض نون",
    "عروض أمازون السعودية",
    "عروض جرير",
    "عروض اكسترا",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

export default function BestPriceWebsitesSaudiPage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />

      <section className="hero" dir="rtl">
        <div className="badge">دليل شراء مفيد</div>

        <h1>
          أفضل مواقع مقارنة الأسعار في السعودية 2026
          <span>كيف تعرف أفضل سعر قبل الشراء أونلاين؟</span>
        </h1>

        <p>
          قبل شراء أي منتج من الإنترنت، من المهم أن تقارن السعر بين أكثر من متجر.
          في السعودية توجد متاجر قوية مثل Amazon.sa وNoon وJarir وExtra
          وCarrefour، لكن فتح كل متجر يدويًا قد يضيع وقتك. لذلك ظهرت أهمية مواقع
          وأدوات مقارنة الأسعار مثل <strong>BPS Chat</strong> أو{" "}
          <strong>بي بي اس شات</strong>.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            جرّب البحث في BPS Chat
          </Link>
          <Link href="/saudi-product-price-comparison" className="secondaryBtn">
            مقارنة أسعار السعودية
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تحتاج إلى مقارنة الأسعار في السعودية؟</h2>

        <p>
          السوق السعودي من أكبر أسواق التسوق الإلكتروني في المنطقة، وأسعار
          المنتجات تختلف باستمرار حسب المتجر، العرض، الشحن، التوفر، والضمان.
          أحيانًا تجد نفس المنتج بسعر مختلف في نون، أمازون السعودية، جرير،
          اكسترا أو كارفور. لذلك مقارنة الأسعار قبل الشراء أصبحت خطوة مهمة لأي
          شخص يريد توفير المال.
        </p>

        <p>
          المقارنة لا تعني فقط البحث عن أقل سعر، لكنها تعني معرفة القيمة الأفضل.
          قد يكون السعر أقل في متجر معين، لكن الشحن أغلى أو الضمان غير واضح. وفي
          أحيان أخرى يكون السعر أعلى قليلًا لكن التوصيل أسرع أو المتجر أوثق.
          لذلك من الأفضل دائمًا مراجعة أكثر من نتيجة قبل اتخاذ قرار الشراء.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>توفير المال</h3>
            <p>
              مقارنة الأسعار تساعدك على معرفة أرخص سعر حقيقي بدل الاعتماد على
              أول نتيجة تظهر لك.
            </p>
          </div>

          <div className="infoCard">
            <h3>توفير الوقت</h3>
            <p>
              بدل فتح أكثر من متجر يدويًا، يمكنك البحث عن المنتج مرة واحدة
              ومراجعة الخيارات المتاحة.
            </p>
          </div>

          <div className="infoCard">
            <h3>قرار شراء أفضل</h3>
            <p>
              قارن السعر، المتجر، الشحن، الضمان والتوفر قبل الضغط على زر الشراء.
            </p>
          </div>
        </div>

        <h2>أشهر المتاجر الإلكترونية في السعودية</h2>

        <p>
          توجد عدة متاجر يعتمد عليها المستخدمون في السعودية للبحث عن المنتجات
          والعروض. من أشهرها Amazon.sa، Noon، Jarir، Extra وCarrefour. كل متجر
          يتميز بنوع معين من المنتجات أو العروض، ولذلك لا يوجد متجر واحد هو
          الأفضل دائمًا في كل شيء.
        </p>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>المتجر</th>
                <th>مناسب للبحث عن</th>
                <th>أمثلة كلمات بحث</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Amazon.sa</td>
                <td>موبايلات، سماعات، أجهزة منزلية، منتجات يومية</td>
                <td>عروض أمازون السعودية، سعر ايفون في أمازون</td>
              </tr>
              <tr>
                <td>Noon</td>
                <td>جوالات، عطور، ملابس، إلكترونيات، منتجات منزلية</td>
                <td>عروض نون السعودية، خصومات نون، نون السعودية</td>
              </tr>
              <tr>
                <td>Jarir</td>
                <td>لابتوبات، ايفون، تابلت، كتب، أجهزة مكتبية</td>
                <td>عروض جرير، سعر لابتوب في جرير، ايفون جرير</td>
              </tr>
              <tr>
                <td>Extra</td>
                <td>شاشات، أجهزة منزلية، جوالات، لابتوبات</td>
                <td>عروض اكسترا، تخفيضات اكسترا، شاشة اكسترا</td>
              </tr>
              <tr>
                <td>Carrefour</td>
                <td>أجهزة منزلية، إلكترونيات، منتجات يومية</td>
                <td>عروض كارفور السعودية، خصومات كارفور</td>
              </tr>
              <tr>
                <td>BPS Chat</td>
                <td>البحث والمقارنة بين عدة متاجر حسب المنتج والدولة</td>
                <td>مقارنة أسعار، أفضل سعر، أرخص سعر، بي بي اس شات</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>كيف يساعدك BPS Chat في المقارنة؟</h2>

        <p>
          BPS Chat أو بي بي اس شات ليس متجرًا إلكترونيًا، لكنه يساعدك على البحث
          عن المنتج ومقارنة النتائج من أكثر من مصدر. الفكرة أن المستخدم يكتب اسم
          المنتج، يختار الدولة، ثم يشاهد نتائج تساعده على معرفة الأسعار والعروض
          بدل الاعتماد على متجر واحد فقط.
        </p>

        <p>
          هذا مفيد جدًا عند البحث عن منتجات مثل ايفون، سامسونج، لابتوب، سماعات،
          عطور، شاشات، بلايستيشن، ساعات ذكية، شواحن، باور بانك، ملابس، ألعاب
          أطفال وأجهزة منزلية. كل هذه المنتجات قد تختلف أسعارها بشكل كبير بين
          متجر وآخر.
        </p>

        <h2>أفضل طريقة لمعرفة أرخص سعر</h2>

        <p>
          لمعرفة أرخص سعر، لا تبحث باسم المنتج فقط، بل جرّب أكثر من صيغة بحث.
          مثلًا بدل كتابة “ايفون” فقط، اكتب “سعر ايفون في السعودية” أو “أرخص
          ايفون في السعودية” أو “عروض ايفون نون” أو “سعر ايفون في أمازون
          السعودية”. هذه الطريقة تساعدك على الوصول إلى نتائج أدق.
        </p>

        <div className="quickLinks">
          <Link href="/search/سعر-ايفون-في-السعودية-sa">
            سعر ايفون في السعودية
          </Link>
          <Link href="/search/عروض-نون-sa">عروض نون السعودية</Link>
          <Link href="/search/عروض-امازون-sa">عروض أمازون السعودية</Link>
          <Link href="/search/عروض-جرير-sa">عروض جرير</Link>
          <Link href="/search/عروض-اكسترا-sa">عروض اكسترا</Link>
          <Link href="/search/افضل-سعر-في-السعودية-sa">
            أفضل سعر في السعودية
          </Link>
        </div>

        <h2>منتجات يجب مقارنة أسعارها قبل الشراء</h2>

        <p>
          هناك منتجات فرق السعر فيها قد يكون كبيرًا جدًا، ولذلك المقارنة فيها
          مهمة. من أهم هذه المنتجات: الهواتف الذكية، اللابتوبات، الشاشات،
          السماعات، أجهزة الألعاب، الأجهزة المنزلية، العطور، والمنتجات الموسمية
          التي تظهر عليها عروض لفترة محدودة.
        </p>

        <ul>
          <li>قارن سعر ايفون وسامسونج قبل الشراء من أي متجر.</li>
          <li>راجع أسعار اللابتوبات بين جرير، اكسترا، أمازون ونون.</li>
          <li>قارن عروض العطور لأن الأسعار تختلف كثيرًا بين المتاجر.</li>
          <li>لا تشتري شاشة أو جهاز منزلي قبل مراجعة أكثر من عرض.</li>
          <li>راجع تكلفة الشحن والضمان وليس السعر فقط.</li>
        </ul>

        <h2>أخطاء يقع فيها المستخدم عند الشراء أونلاين</h2>

        <p>
          من أكثر الأخطاء الشائعة أن يشتري المستخدم من أول متجر يظهر له في نتائج
          البحث، أو يركز على السعر فقط بدون مراجعة الشحن والضمان والتقييمات. كما
          أن بعض العروض قد تبدو منخفضة، لكنها لا تكون الأفضل عند حساب التكلفة
          النهائية.
        </p>

        <p>
          لذلك من الأفضل دائمًا أن تسأل نفسك قبل الشراء: هل هذا أفضل سعر؟ هل
          الشحن مناسب؟ هل المتجر موثوق؟ هل يوجد ضمان؟ هل نفس المنتج متوفر بسعر
          أقل في متجر آخر؟ هذه الأسئلة البسيطة قد توفر عليك مبلغًا كبيرًا.
        </p>

        <h2>روابط مفيدة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/compare-prices-online">مقارنة الأسعار أونلاين</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
          <Link href="/iphone-price-comparison">مقارنة أسعار iPhone</Link>
          <Link href="/samsung-price-comparison">مقارنة أسعار Samsung</Link>
          <Link href="/laptop-price-comparison">مقارنة أسعار Laptop</Link>
          <Link href="/perfume-price-comparison">مقارنة أسعار العطور</Link>
          <Link href="/bps-chat">ما هو BPS Chat؟</Link>
        </div>

        <div className="finalCta">
          <h2>الخلاصة</h2>
          <p>
            أفضل طريقة للشراء أونلاين في السعودية هي ألا تعتمد على متجر واحد.
            قارن السعر، راجع الشحن والضمان، واستخدم أدوات مثل BPS Chat لتسهيل
            البحث والوصول إلى أفضل عرض ممكن.
          </p>

          <Link href="/" className="primaryBtn">
            ابدأ المقارنة الآن
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
          max-width: 820px;
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
          max-width: 760px;
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