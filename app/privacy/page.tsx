import Link from "next/link";

export default function PrivacyPage() {
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
          سياسة الخصوصية | BPS Chat
        </h1>

        <p>
          نحن في BPS Chat نحترم خصوصيتك ونلتزم بحماية بياناتك.
        </p>

        <h2>جمع المعلومات</h2>
        <p>
          نحن لا نقوم بجمع معلومات شخصية حساسة. قد يتم جمع بيانات بسيطة
          لتحسين تجربة المستخدم.
        </p>

        <h2>ملفات تعريف الارتباط (Cookies)</h2>
        <p>
          يستخدم موقعنا ملفات تعريف الارتباط لتحسين الأداء وتحليل الاستخدام.
        </p>

        <h2>Google AdSense</h2>
        <p>
          قد يستخدم موقعنا Google AdSense لعرض الإعلانات والتي قد تعتمد على
          الكوكيز.
        </p>

        <h2>روابط خارجية</h2>
        <p>
          يحتوي الموقع على روابط لمتاجر خارجية ونحن غير مسؤولين عن سياساتهم.
        </p>

        <h2>التواصل</h2>
        <p>يمكنك التواصل معنا من خلال صفحة التواصل.</p>

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