import type { Metadata } from "next";
import Link from "next/link";
import SeoSearchBar from "@/app/components/SeoSearchBar";
import PopularSearches from "@/app/components/PopularSearches";
import MarketPromoSection from "@/app/components/MarketPromoSection";

export const metadata: Metadata = {
  title: "دليل الشراء الآمن أونلاين | السعودية ومصر والإمارات والخليج",
  description:
    "دليل يساعدك تشتري أونلاين بأمان في السعودية ومصر والإمارات والكويت وقطر والبحرين، وتتجنب المتاجر غير الموثوقة وتراجع الضمان والاسترجاع والدفع.",
  keywords: [
    "الشراء الآمن أونلاين",
    "التسوق الآمن",
    "هل المتجر موثوق",
    "كيف تتجنب النصب أونلاين",
    "الدفع عند الاستلام",
    "سياسة الاسترجاع",
    "ضمان المنتج",
    "مقارنة أسعار",
    "أفضل متجر موثوق",
    "التسوق الإلكتروني في السعودية",
    "التسوق الإلكتروني في مصر",
    "التسوق الإلكتروني في الإمارات",
    "BPS Chat",
    "بي بي اس شات",
  ],
};

export default function OnlineShoppingSafetyGuidePage() {
  return (
    <main className="seoPage">
      <SeoSearchBar />
      <MarketPromoSection />

      <section className="hero" dir="rtl">
        <div className="badge">دليل الشراء الآمن</div>

        <h1>
          دليل الشراء الآمن أونلاين
          <span>كيف تشتري بثقة في السعودية ومصر والإمارات والخليج؟</span>
        </h1>

        <p>
          الشراء أونلاين يوفر وقت ومجهود، لكنه يحتاج حذر. قبل شراء أي منتج من
          Amazon أو Noon أو Jumia أو Jarir أو Extra أو Carrefour أو أي متجر آخر،
          لازم تراجع السعر، الضمان، الاسترجاع، الشحن، وتقييمات المتجر. وهنا
          يساعدك <strong>BPS Chat</strong> أو <strong>بي بي اس شات</strong> على
          المقارنة قبل اتخاذ قرار الشراء.
        </p>

        <div className="ctaBox">
          <Link href="/" className="primaryBtn">
            ابحث وقارن قبل الشراء
          </Link>
          <Link href="/compare-prices-online" className="secondaryBtn">
            مقارنة الأسعار أونلاين
          </Link>
        </div>
      </section>

      <section className="content" dir="rtl">
        <h2>لماذا تحتاج إلى دليل للشراء الآمن؟</h2>

        <p>
          مع زيادة التسوق الإلكتروني في السعودية ومصر والإمارات والكويت وقطر
          والبحرين، ظهرت متاجر كثيرة وعروض كثيرة. بعض العروض حقيقية ومفيدة، وبعضها
          قد يكون غير واضح أو لا يشمل الشحن والضمان. لذلك لا يكفي أن ترى سعرًا
          منخفضًا فقط، بل يجب أن تتأكد من المتجر والتفاصيل.
        </p>

        <p>
          الشراء الآمن يعني أنك لا تختار المنتج بناءً على السعر فقط، بل تراجع
          معلومات مهمة مثل سياسة الاسترجاع، مدة التوصيل، الضمان، تقييمات
          المستخدمين، وطرق الدفع المتاحة.
        </p>

        <div className="cardsGrid">
          <div className="infoCard">
            <h3>راجع المتجر</h3>
            <p>
              تأكد أن المتجر معروف أو له تقييمات واضحة قبل إدخال بياناتك أو الدفع.
            </p>
          </div>

          <div className="infoCard">
            <h3>قارن السعر</h3>
            <p>
              السعر الرخيص ليس دائمًا الأفضل. قارن السعر النهائي بعد الشحن والرسوم.
            </p>
          </div>

          <div className="infoCard">
            <h3>تأكد من الضمان</h3>
            <p>
              خصوصًا في الموبايلات واللابتوبات والأجهزة المنزلية والإلكترونيات.
            </p>
          </div>
        </div>

        <h2>علامات المتجر الموثوق</h2>

        <p>
          المتجر الموثوق غالبًا يكون واضحًا في بيانات المنتج، طرق الدفع، سياسة
          الاسترجاع، معلومات الشحن، وخدمة العملاء. كما أن وجود تقييمات حقيقية
          للمنتج والمتجر يساعدك على اتخاذ قرار أفضل.
        </p>

        <ul>
          <li>يوضح السعر النهائي قبل الدفع.</li>
          <li>يعرض سياسة الاسترجاع والاستبدال بوضوح.</li>
          <li>يوفر معلومات عن الضمان.</li>
          <li>له تقييمات ومراجعات من مستخدمين.</li>
          <li>يدعم طرق دفع معروفة وآمنة.</li>
          <li>يوضح مدة الشحن والتوصيل.</li>
        </ul>

        <h2>كيف تتجنب العروض الوهمية؟</h2>

        <p>
          بعض العروض تبدو قوية جدًا، لكن عند المراجعة تجد أن السعر النهائي بعد
          الشحن أو الرسوم ليس الأفضل. أحيانًا يكون المنتج غير متوفر، أو الضمان
          غير واضح، أو تفاصيل المنتج مختلفة عن المتوقع. لذلك لا تعتمد على كلمة
          “خصم” فقط.
        </p>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>قبل الشراء</th>
                <th>لماذا مهم؟</th>
                <th>ماذا تفعل؟</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>راجع السعر النهائي</td>
                <td>قد يضاف شحن أو رسوم عند الدفع</td>
                <td>قارن السعر بعد الشحن وليس السعر المعروض فقط</td>
              </tr>
              <tr>
                <td>اقرأ وصف المنتج</td>
                <td>قد تختلف النسخة أو المواصفات</td>
                <td>راجع اللون، الحجم، السعة، الضمان والموديل</td>
              </tr>
              <tr>
                <td>راجع التقييمات</td>
                <td>توضح تجربة المستخدمين السابقين</td>
                <td>اقرأ التقييمات السلبية قبل الإيجابية</td>
              </tr>
              <tr>
                <td>تأكد من الاسترجاع</td>
                <td>مهم لو المنتج وصل مختلف أو به مشكلة</td>
                <td>راجع سياسة الاسترجاع قبل الدفع</td>
              </tr>
              <tr>
                <td>قارن بين المتاجر</td>
                <td>قد تجد نفس المنتج بسعر أفضل</td>
                <td>استخدم BPS Chat للمقارنة حسب الدولة</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>الشراء الآمن في السعودية</h2>

        <p>
          في السعودية، عند الشراء من Amazon.sa أو Noon أو Jarir أو Extra أو
          Carrefour، راجع الضمان ومدة التوصيل والسعر النهائي. المنتجات مثل iPhone
          وSamsung وLaptop والشاشات والأجهزة المنزلية تحتاج مراجعة دقيقة قبل
          الشراء.
        </p>

        <div className="quickLinks">
          <Link href="/saudi-product-price-comparison">مقارنة أسعار السعودية</Link>
          <Link href="/search/عروض-نون-sa">عروض نون السعودية</Link>
          <Link href="/search/عروض-امازون-sa">عروض أمازون السعودية</Link>
          <Link href="/search/عروض-جرير-sa">عروض جرير</Link>
          <Link href="/search/عروض-اكسترا-sa">عروض اكسترا</Link>
        </div>

        <h2>الشراء الآمن في الإمارات</h2>

        <p>
          في الإمارات، قارن بين Amazon.ae وNoon وCarrefour وSharaf DG، خصوصًا في
          الإلكترونيات واللابتوبات والعطور. تأكد من الشحن داخل الإمارات وسياسة
          الاسترجاع والضمان قبل الشراء.
        </p>

        <div className="quickLinks">
          <Link href="/uae-product-price-comparison">مقارنة أسعار الإمارات</Link>
          <Link href="/search/عروض-نون-ae">عروض نون الإمارات</Link>
          <Link href="/search/عروض-امازون-ae">عروض أمازون الإمارات</Link>
          <Link href="/search/عروض-carrefour-ae">عروض Carrefour الإمارات</Link>
          <Link href="/search/عروض-sharaf-dg-ae">عروض Sharaf DG</Link>
        </div>

        <h2>الشراء الآمن في مصر</h2>

        <p>
          في مصر، راجع المتاجر مثل Amazon.eg وJumia وNoon Egypt وCarrefour وB.TECH
          وRaya و2B. الأسعار قد تتغير بسرعة، وخصوصًا في الموبايلات واللابتوبات
          والأجهزة الكهربائية، لذلك راجع الضمان المحلي ومدة التوصيل لمحافظتك.
        </p>

        <div className="quickLinks">
          <Link href="/egypt-product-price-comparison">مقارنة أسعار مصر</Link>
          <Link href="/search/عروض-جوميا-eg">عروض جوميا</Link>
          <Link href="/search/عروض-امازون-مصر-eg">عروض أمازون مصر</Link>
          <Link href="/search/عروض-بي-تك-eg">عروض بي تك</Link>
          <Link href="/search/عروض-راية-eg">عروض راية</Link>
        </div>

        <h2>الشراء الآمن في الكويت وقطر والبحرين</h2>

        <p>
          في الكويت، راجع عروض Xcite وBest Al-Yousifi وLulu وCarrefour. في قطر،
          تابع Carrefour Qatar وLulu Qatar والمتاجر المحلية. في البحرين، قارن بين
          Sharaf DG Bahrain وeXtra Bahrain وLulu Bahrain. في كل الحالات، لا تعتمد
          على السعر فقط، بل راجع الضمان والتوصيل والاسترجاع.
        </p>

        <div className="quickLinks">
          <Link href="/kuwait-product-price-comparison">مقارنة أسعار الكويت</Link>
          <Link href="/qatar-product-price-comparison">مقارنة أسعار قطر</Link>
          <Link href="/bahrain-product-price-comparison">مقارنة أسعار البحرين</Link>
          <Link href="/search/عروض-xcite-kw">عروض Xcite الكويت</Link>
          <Link href="/search/qatar-deals-qa">Qatar deals</Link>
          <Link href="/search/bahrain-deals-bh">Bahrain deals</Link>
        </div>

        <h2>الدفع عند الاستلام أم الدفع الإلكتروني؟</h2>

        <p>
          الدفع عند الاستلام قد يكون مناسبًا لبعض المستخدمين لأنه يمنحهم راحة أكبر،
          لكنه ليس متاحًا دائمًا. أما الدفع الإلكتروني فقد يكون أسرع وأسهل، لكن
          يجب استخدام طرق دفع آمنة ومعروفة وتجنب إدخال بيانات البطاقة في مواقع غير
          موثوقة.
        </p>

        <p>
          إذا كنت تشتري من متجر جديد بالنسبة لك، راجع تقييمات المتجر وسياسة
          الاسترجاع أولًا. وإذا كان السعر منخفضًا جدًا بشكل غير منطقي، فالأفضل
          أن تقارن مع متاجر أخرى قبل اتخاذ القرار.
        </p>

        <h2>منتجات تحتاج حذر أكبر قبل شرائها</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>المنتج</th>
                <th>ما الذي تراجعه؟</th>
                <th>صفحة مفيدة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>iPhone و Samsung</td>
                <td>الضمان، السعة، النسخة، حالة المنتج، السعر النهائي</td>
                <td>مقارنة أسعار الجوالات</td>
              </tr>
              <tr>
                <td>Laptop</td>
                <td>المعالج، الرام، التخزين، كارت الشاشة، الضمان</td>
                <td>مقارنة أسعار Laptop</td>
              </tr>
              <tr>
                <td>Perfume</td>
                <td>الحجم، نوع العطر، تقييمات البائع، سياسة الاسترجاع</td>
                <td>مقارنة أسعار العطور</td>
              </tr>
              <tr>
                <td>أجهزة منزلية</td>
                <td>الشحن، التركيب، الضمان، خدمة ما بعد البيع</td>
                <td>أفضل سعر أونلاين</td>
              </tr>
              <tr>
                <td>إلكترونيات واكسسوارات</td>
                <td>التوافق، الماركة، التقييمات، جودة المنتج</td>
                <td>مقارنة الأسعار أونلاين</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>كيف يساعدك BPS Chat على الشراء الآمن؟</h2>

        <p>
          BPS Chat يساعدك في مرحلة البحث والمقارنة. بدل ما تفتح كل متجر يدويًا،
          يمكنك البحث عن المنتج واختيار الدولة، ثم مراجعة النتائج والعروض. وبعد
          ذلك تنتقل للمتجر الأصلي لتتأكد من السعر النهائي والضمان والشحن.
        </p>

        <ul>
          <li>يساعدك على مقارنة الأسعار بدل الاعتماد على متجر واحد.</li>
          <li>يدعم البحث حسب الدولة: السعودية، الإمارات، مصر، الكويت، قطر والبحرين.</li>
          <li>يربطك بصفحات مفيدة عن أفضل سعر وأرخص المنتجات والمتاجر.</li>
          <li>يساعدك على اتخاذ قرار أذكى قبل الشراء.</li>
        </ul>

        <h2>روابط مفيدة داخل BPS Chat</h2>

        <div className="quickLinks">
          <Link href="/save-money-online-shopping">وفر فلوسك عند الشراء أونلاين</Link>
          <Link href="/best-online-stores-egypt-gulf">أفضل المتاجر الإلكترونية</Link>
          <Link href="/best-time-to-buy-online">أفضل وقت للشراء أونلاين</Link>
          <Link href="/compare-prices-online">مقارنة الأسعار أونلاين</Link>
          <Link href="/best-price-online">أفضل سعر أونلاين</Link>
          <Link href="/cheapest-products">أرخص المنتجات</Link>
          <Link href="/bps-chat">ما هو BPS Chat؟</Link>
        </div>

        <div className="finalCta">
          <h2>الخلاصة</h2>
          <p>
            الشراء الآمن أونلاين يبدأ من المقارنة والمراجعة. لا تعتمد على السعر
            وحده، وراجع المتجر، الضمان، الشحن، الاسترجاع والتقييمات. استخدم BPS
            Chat لتسهيل البحث والوصول إلى أفضل قرار قبل الشراء.
          </p>

          <Link href="/" className="primaryBtn">
            ابحث وقارن الآن
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
          max-width: 840px;
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
          max-width: 780px;
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