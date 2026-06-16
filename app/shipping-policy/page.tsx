import Link from "next/link";

export const metadata = {
  title: "سياسة الشحن | BPS Chat",
  description: "سياسة الشحن في BPS Chat باعتباره منصة بحث ومقارنة أسعار وليس متجراً يشحن المنتجات مباشرة.",
};

export default function ShippingPolicyPage() {
  return (
    <main style={styles.page} dir="rtl">
      <section style={styles.card}>
        <h1 style={styles.title}>سياسة الشحن</h1>

        <p>
          BPS Chat منصة للبحث عن المنتجات ومقارنة الأسعار، ولا يقوم بشحن
          المنتجات مباشرة.
        </p>

        <h2>من يقوم بالشحن؟</h2>
        <p>
          الشحن يتم بواسطة المتجر أو البائع الذي يشتري منه المستخدم المنتج،
          وليس بواسطة BPS Chat.
        </p>

        <h2>مدة الشحن</h2>
        <p>
          مدة الشحن تختلف حسب الدولة، المتجر، شركة الشحن، ونوع المنتج.
        </p>

        <h2>تكلفة الشحن</h2>
        <p>
          تكلفة الشحن تظهر عادة داخل صفحة المتجر أو أثناء إتمام الطلب، وقد
          تختلف حسب العنوان وطريقة التوصيل.
        </p>

        <h2>تتبع الطلبات</h2>
        <p>
          أي رقم تتبع أو تحديثات خاصة بالطلب يتم توفيرها من المتجر أو البائع
          الذي تمت عملية الشراء من خلاله.
        </p>

        <h2>دور BPS Chat</h2>
        <p>
          نحن نساعد المستخدم في الوصول إلى المنتجات والعروض، لكن لا ندير
          الشحن أو التوصيل أو متابعة الطلبات.
        </p>

        <Link href="/" style={styles.button}>الرجوع للرئيسية</Link>
      </section>
    </main>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#0b0f14",
    color: "#fff",
    padding: "60px 16px",
  },
  card: {
    maxWidth: "900px",
    margin: "auto",
    background: "rgba(31,41,55,.9)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "22px",
    padding: "28px",
    lineHeight: "2",
  },
  title: {
    fontSize: "32px",
    marginBottom: "18px",
    color: "#10a37f",
  },
  button: {
    display: "inline-block",
    marginTop: "24px",
    background: "#10a37f",
    color: "#fff",
    padding: "12px 22px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};