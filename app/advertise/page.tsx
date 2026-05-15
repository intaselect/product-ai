"use client";

import { useState } from "react";

const plans = [
  { country: "السعودية", flag: "🇸🇦", slider: "299 ريال", search: "499 ريال", full: "799 ريال" },
  { country: "الإمارات", flag: "🇦🇪", slider: "299 درهم", search: "499 درهم", full: "799 درهم" },
  { country: "الكويت", flag: "🇰🇼", slider: "25 دينار", search: "45 دينار", full: "70 دينار" },
  { country: "قطر", flag: "🇶🇦", slider: "299 ريال", search: "499 ريال", full: "799 ريال" },
  { country: "البحرين", flag: "🇧🇭", slider: "25 دينار", search: "45 دينار", full: "70 دينار" },
  { country: "مصر", flag: "🇪🇬", slider: "1500 جنيه", search: "2500 جنيه", full: "4000 جنيه" },
];

export default function AdvertisePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("السعودية");
  const [packageType, setPackageType] = useState("أعلى الصفحة Ads Slider");
  const [message, setMessage] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();

    const text = `طلب إعلان جديد من BPS Chat (بي بي اس شات):
الاسم: ${name}
رقم الهاتف: ${phone}
الدولة المستهدفة: ${country}
نوع الباقة: ${packageType}
تفاصيل الإعلان: ${message}`;

    const whatsappNumber = "966549330606";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <main style={styles.page}>
      <div style={styles.aiBackground}>
  <div style={styles.brainCore}></div>
  <div style={styles.aiGrid}></div>

  <div style={styles.particles}>
    {Array.from({ length: 35 }).map((_, i) => (
      <span
        key={i}
        style={{
          ...styles.particle,
          top: `${(i * 23) % 100}%`,
          left: `${(i * 37) % 100}%`,
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </div>
</div>
      <section style={styles.container}>
        <h1 style={styles.title}>
  اعلن معنا في BPS Chat (بي بي اس شات)
</h1>

        <p style={styles.desc}>
  اعرض منتجاتك أمام مستخدمين يبحثون عن الشراء عبر
  <strong> BPS Chat (بي بي اس شات) </strong>
  في السعودية والإمارات والكويت وقطر والبحرين ومصر.
  الإعلان يظهر حسب الدولة المناسبة لعملائك ويصل لعملاء جاهزين للشراء.
</p>

        <div style={styles.box}>
          <h2 style={styles.h2}>
  لماذا الإعلان في BPS Chat (بي بي اس شات)؟
</h2>
          <ul style={styles.list}>
            <li>🚀 وصول لعملاء جاهزين للشراء</li>
            <li>🌍 استهداف حسب الدولة</li>
            <li>📈 ظهور داخل صفحات المنتجات والبحث</li>
            <li>🔥 مناسب للمتاجر، البراندات، والعروض الموسمية</li>
          </ul>
        </div>

        <div style={styles.box}>
          <h2 style={styles.h2}>أماكن ظهور إعلانك</h2>
          <ul style={styles.list}>
            <li>🔥 أعلى الصفحة في Ads Slider</li>
            <li>🔎 أثناء البحث عن المنتجات</li>
            <li>📄 صفحات المنتجات SEO Pages</li>
          </ul>
        </div>

        <div style={styles.pricingBox}>
          <h2 style={styles.h2}>أسعار الإعلانات حسب الدولة</h2>

          <div style={styles.cards}>
            {plans.map((plan) => (
              <div key={plan.country} style={styles.card}>
                <h3 style={styles.country}>
                  {plan.flag} {plan.country}
                </h3>

                <p style={styles.priceLine}>
                  أعلى الصفحة: <strong>{plan.slider}</strong> / شهر
                </p>
                <p style={styles.priceLine}>
                  أثناء البحث: <strong>{plan.search}</strong> / شهر
                </p>
                <p style={styles.priceLine}>
                  باقة كاملة: <strong>{plan.full}</strong> / شهر
                </p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.h2}>اطلب الإعلان الآن</h2>

          <input
            required
            placeholder="اسمك"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            required
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={styles.input}
          >
            {plans.map((plan) => (
              <option key={plan.country} value={plan.country}>
                {plan.flag} {plan.country}
              </option>
            ))}
          </select>

          <select
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            style={styles.input}
          >
            <option>أعلى الصفحة Ads Slider</option>
            <option>أثناء البحث</option>
            <option>صفحات المنتجات SEO Pages</option>
            <option>باقة كاملة</option>
          </select>

          <textarea
            placeholder="اكتب تفاصيل الإعلان أو رابط المتجر أو المنتج"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
          />

          <button style={styles.button}>إرسال الطلب عبر واتساب</button>
        </form>

        <a
          href="https://wa.me/966549330606"
          target="_blank"
          style={styles.whatsapp}
        >
          تواصل واتساب مباشرة
        </a>

        <a href="/" style={styles.home}>
          الرجوع للرئيسية
        </a>
      </section>
      <style>{`
  @keyframes brainPulse {
    0%,100% {
      transform: translateX(-50%) scale(1);
      opacity: 0.22;
    }

    50% {
      transform: translateX(-50%) scale(1.06);
      opacity: 0.42;
    }
  }

  @keyframes gridMove {
    from {
      background-position: 0 0;
    }

    to {
      background-position: 120px 120px;
    }
  }

  @keyframes floatParticle {
    0%,100% {
      transform: translateY(0px) scale(1);
      opacity: 0.3;
    }

    50% {
      transform: translateY(-25px) scale(1.8);
      opacity: 1;
    }
  }
`}</style>
    </main>
  );
}

const styles: any = {
  page: {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%), radial-gradient(circle at right, rgba(0,180,255,0.07), transparent 25%), #0b0f14",
  color: "#fff",
  padding: "40px 16px",
  direction: "rtl",
  overflowX: "hidden",
  position: "relative",
  zIndex: 1,
},
  container: {
    maxWidth: "950px",
    margin: "auto",
    position: "relative",
zIndex: 2,
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "10px",
  },
  desc: {
    textAlign: "center",
    color: "#bbb",
    marginBottom: "30px",
    lineHeight: "1.8",
  },
 box: {
  background: "rgba(40,40,40,0.72)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.06)",

  padding: "18px",

  borderRadius: "18px",

  marginBottom: "20px",

  transition: "all 0.25s ease",

  position: "relative",

  overflow: "hidden",
},
  h2: {
    marginBottom: "12px",
    fontSize: "20px",
  },
  list: {
    lineHeight: "2",
    paddingRight: "20px",
  },
  pricingBox: {
  background: "rgba(40,40,40,0.72)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.06)",

  padding: "20px",

  borderRadius: "18px",

  marginBottom: "20px",

  transition: "all 0.25s ease",

  position: "relative",

  overflow: "hidden",
},
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "14px",
  },
  card: {
  background: "rgba(20,20,20,0.75)",

  backdropFilter: "blur(8px)",

  padding: "16px",

  borderRadius: "18px",

  border: "1px solid rgba(255,255,255,0.06)",

  transition: "all 0.25s ease",

  cursor: "pointer",

  position: "relative",

  overflow: "hidden",
},
  country: {
    marginBottom: "12px",
    color: "#10a37f",
    fontSize: "19px",
  },
  priceLine: {
    color: "#ddd",
    marginBottom: "8px",
  },
  form: {
  background: "rgba(40,40,40,0.72)",

  backdropFilter: "blur(8px)",

  padding: "20px",

  borderRadius: "18px",

  border: "1px solid rgba(255,255,255,0.06)",

  position: "relative",

  overflow: "hidden",
},
  input: {
    width: "100%",
    padding: "13px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #444",
    background: "#1f1f1f",
    color: "#fff",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "13px",
    height: "110px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #444",
    background: "#1f1f1f",
    color: "#fff",
    outline: "none",
    resize: "vertical",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#10a37f",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
  whatsapp: {
    display: "block",
    marginTop: "22px",
    textAlign: "center",
    color: "#25D366",
    fontWeight: "bold",
  },
  home: {
    display: "block",
    marginTop: "15px",
    textAlign: "center",
    color: "#10a37f",
  },
  aiBackground: {
  position: "fixed",
  inset: 0,
  zIndex: 0,
  overflow: "hidden",
  pointerEvents: "none",
},

brainCore: {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  width: "700px",
  height: "450px",
  borderRadius: "50%",
  background: `
    radial-gradient(circle at 30% 40%, rgba(0,255,200,1), transparent 10%),
    radial-gradient(circle at 50% 50%, rgba(0,180,255,0.9), transparent 12%),
    radial-gradient(circle at 70% 45%, rgba(16,163,127,1), transparent 10%),
    radial-gradient(circle at 45% 70%, rgba(0,220,255,0.9), transparent 8%)
  `,
  filter: "blur(35px)",
  opacity: 0.22,
  animation: "brainPulse 6s ease-in-out infinite",
},

aiGrid: {
  position: "absolute",
  inset: 0,
  backgroundImage: `
    linear-gradient(rgba(0,255,200,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,200,0.08) 1px, transparent 1px)
  `,
  backgroundSize: "50px 50px",
  opacity: 0.22,
  animation: "gridMove 20s linear infinite",
},

particles: {
  position: "absolute",
  inset: 0,
},

particle: {
  position: "absolute",
  width: "5px",
  height: "5px",
  borderRadius: "50%",
  background: "#00f7ff",

  boxShadow:
    "0 0 8px #00f7ff, 0 0 18px #00f7ff, 0 0 35px rgba(0,247,255,0.8)",

  animation: "floatParticle 8s ease-in-out infinite",
},
};