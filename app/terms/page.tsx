import Link from "next/link";

export default function TermsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0f14",
        color: "#fff",
        padding: "60px 20px",
        direction: "rtl",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
          الشروط والأحكام | BPS Chat
        </h1>

        <p>
          باستخدامك لموقع BPS Chat فإنك توافق على الشروط التالية:
        </p>

        <h2>طبيعة الخدمة</h2>
        <p>
          الموقع هو محرك بحث ذكي لمقارنة المنتجات والأسعار ولا يقوم بالبيع.
        </p>

        <h2>الأسعار</h2>
        <p>
          الأسعار قد تختلف حسب المتاجر ونحن لا نضمن دقتها بنسبة 100%.
        </p>

        <h2>الروابط الخارجية</h2>
        <p>
          يتم تحويلك إلى مواقع خارجية ونحن غير مسؤولين عن أي تعاملات هناك.
        </p>

        <h2>المسؤولية</h2>
        <p>
          استخدامك للموقع يكون على مسؤوليتك الشخصية.
        </p>

        <h2>التعديلات</h2>
        <p>
          نحتفظ بحق تعديل الشروط في أي وقت.
        </p>

        {/* زرار الرجوع */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link href="/">
            <button
              style={{
                background: "#10a37f",
                border: "none",
                padding: "12px 24px",
                borderRadius: "10px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              الرجوع إلى الصفحة الرئيسية
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}