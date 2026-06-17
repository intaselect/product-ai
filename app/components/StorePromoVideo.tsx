"use client";

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Product = {
  title?: string;
  name?: string;
  priceText?: string;
  price?: string | number;
  store?: string;
  source?: string;
  image?: string;
  thumbnail?: string;
};

function clean(v: any) {
  return String(v || "").trim().replace(/\s+/g, " ");
}

function short(v: any, max = 70) {
  const t = clean(v);
  return t.length > max ? t.slice(0, max - 3) + "..." : t;
}

function name(p?: Product) {
  return clean(p?.title || p?.name || "منتج مميز");
}

function price(p?: Product) {
  return clean(p?.priceText || p?.price || "شوف السعر");
}

function store(p?: Product) {
  return clean(p?.store || p?.source || "متجر موثوق");
}

function image(p?: Product) {
  return clean(p?.image || p?.thumbnail);
}
function getDailySeed(query: string, countryName: string, offset = 0) {
  const d = new Date();
  const key = `${query}-${countryName}-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}-${offset}`;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  return Math.abs(h);
}

function seededShuffle<T>(arr: T[], seed: number) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uniqueProducts(products: Product[]) {
  const seen = new Set<string>();
  return products.filter((p) => {
    const k = clean(
      `${p.title || p.name || ""}-${p.image || p.thumbnail || ""}`
    ).toLowerCase();

    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
const VIDEO_STYLES = [
  {
    badge: "{style.badge}",
    title: "{style.title} ",
    footer: "قارن السعر قبل الشراء",
    bg: "radial-gradient(circle at 50% 5%, rgba(34,197,94,.36), transparent 30%), linear-gradient(180deg,#020617,#07111f,#000)",
    badgeBg: "linear-gradient(135deg,#ef4444,#f97316)",
    priceBg: "linear-gradient(135deg,#16a34a,#22c55e)",
    glow: "rgba(34,197,94,.55)",
  },
  {
    badge: "⚡ صفقة سريعة",
    title: "منتجات تستحق تشوف سعرها اليوم",
    footer: "وفر وقتك وفلوسك مع BPS Chat",
    bg: "radial-gradient(circle at 15% 20%, rgba(59,130,246,.38), transparent 32%), linear-gradient(135deg,#020617,#0f172a,#000)",
    badgeBg: "linear-gradient(135deg,#2563eb,#06b6d4)",
    priceBg: "linear-gradient(135deg,#0ea5e9,#22d3ee)",
    glow: "rgba(14,165,233,.55)",
  },
  {
    badge: "💰 وفر أكثر",
    title: "قبل الشراء شوف الفرق في الأسعار",
    footer: "أرخص سعر يبدأ من هنا",
    bg: "radial-gradient(circle at 80% 15%, rgba(250,204,21,.32), transparent 30%), linear-gradient(135deg,#1c1917,#020617,#000)",
    badgeBg: "linear-gradient(135deg,#eab308,#f97316)",
    priceBg: "linear-gradient(135deg,#ca8a04,#facc15)",
    glow: "rgba(250,204,21,.55)",
  },
  {
    badge: "🛒 اختيار المتسوقين",
    title: "منتجات عليها بحث ومقارنة",
    footer: "شوف المنتج من المتاجر الموثوقة",
    bg: "radial-gradient(circle at 20% 80%, rgba(168,85,247,.35), transparent 34%), linear-gradient(135deg,#12051f,#020617,#000)",
    badgeBg: "linear-gradient(135deg,#7c3aed,#ec4899)",
    priceBg: "linear-gradient(135deg,#9333ea,#d946ef)",
    glow: "rgba(168,85,247,.55)",
  },
  {
    badge: "🚀 ترشيحات اليوم",
    title: "شوف أفضل منتجات قبل ما تدفع",
    footer: "بحث ذكي ومقارنة أسرع",
    bg: "radial-gradient(circle at 50% 50%, rgba(20,184,166,.34), transparent 35%), linear-gradient(135deg,#042f2e,#020617,#000)",
    badgeBg: "linear-gradient(135deg,#0f766e,#14b8a6)",
    priceBg: "linear-gradient(135deg,#059669,#2dd4bf)",
    glow: "rgba(45,212,191,.55)",
  },
  {
    badge: "🏆 أفضل مقارنة",
    title: "نفس المنتج ممكن تلاقيه بسعر أقل",
    footer: "قارن بين الأسعار والمتاجر",
    bg: "radial-gradient(circle at 15% 15%, rgba(244,63,94,.32), transparent 32%), linear-gradient(135deg,#190b12,#020617,#000)",
    badgeBg: "linear-gradient(135deg,#be123c,#fb7185)",
    priceBg: "linear-gradient(135deg,#e11d48,#fb7185)",
    glow: "rgba(244,63,94,.55)",
  },
  {
    badge: "✨ منتجات مميزة",
    title: "اكتشف اختيارات جديدة كل يوم",
    footer: "bpschat.com",
    bg: "radial-gradient(circle at 90% 80%, rgba(99,102,241,.36), transparent 32%), linear-gradient(135deg,#111827,#020617,#000)",
    badgeBg: "linear-gradient(135deg,#4f46e5,#8b5cf6)",
    priceBg: "linear-gradient(135deg,#6366f1,#a78bfa)",
    glow: "rgba(129,140,248,.55)",
  },
];

export default function StorePromoVideo({
  query,
  countryName,
  products,
}: {
  query: string;
  countryName: string;
  products: Product[];
}) {
  const frame = useCurrentFrame();

  const dayStyle = getDailySeed(query, countryName) % 7;
  const style = VIDEO_STYLES[dayStyle];

const shown = seededShuffle(
  uniqueProducts(products),
  getDailySeed(query, countryName, dayStyle)
).slice(0, 6);
  const activeIndex = Math.min(Math.floor(frame / 240), Math.max(shown.length - 1, 0));
  const active = shown[activeIndex] || shown[0];

  const activeName = name(active);
  const activePrice = price(active);
  const activeStore = store(active);
  const activeImage = image(active);

  const heroOpacity = interpolate(frame % 240, [0, 30, 210, 239], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroScale = interpolate(frame % 240, [0, 55, 210], [0.94, 1.02, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = interpolate(Math.sin(frame / 12), [-1, 1], [0.65, 1]);
  const shine = interpolate(frame, [0, 1800], [-1000, 1000], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
       background: style.bg,
        color: "white",
        fontFamily: "Arial",
        direction: "rtl",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -220,
          background:
            "linear-gradient(120deg, transparent, rgba(255,255,255,.14), transparent)",
          transform: `translateX(${shine}px) rotate(10deg)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 46,
          left: 70,
          right: 70,
          zIndex: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              padding: "12px 28px",
              borderRadius: 999,
              background: style.badgeBg,
              fontSize: 30,
              fontWeight: 950,
              boxShadow: "0 0 35px rgba(249,115,22,.45)",
            }}
          >
            🔥 عروض اليوم
          </div>

          <h1
            style={{
              margin: "22px 0 0",
              fontSize: 58,
              lineHeight: 1.12,
              maxWidth: 980,
              textShadow: "0 0 35px rgba(37,99,235,.45)",
            }}
          >
            قارن أفضل أسعار {query}
          </h1>

          <div
            style={{
              marginTop: 14,
              fontSize: 30,
              color: "#dbeafe",
              fontWeight: 850,
            }}
          >
            منتجات مختارة في {countryName} قبل الشراء
          </div>
        </div>

        <div
          style={{
            width: 320,
            padding: 24,
            borderRadius: 32,
            background: "rgba(0,0,0,.55)",
            border: "1px solid rgba(255,255,255,.18)",
            textAlign: "center",
            boxShadow: "0 0 42px rgba(37,99,235,.24)",
          }}
        >
          <div style={{ fontSize: 38, fontWeight: 950 }}>BPS Chat</div>
          <div style={{ fontSize: 28, color: "#93c5fd", marginTop: 8 }}>
            ابحث • قارن • وفر
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 250,
          left: 70,
          right: 70,
          bottom: 130,
          display: "grid",
          gridTemplateColumns: "1.15fr .85fr",
          gap: 30,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: heroOpacity,
            transform: `scale(${heroScale})`,
            borderRadius: 42,
            padding: 28,
            background:
              "linear-gradient(145deg, rgba(255,255,255,.16), rgba(255,255,255,.07))",
            border: "2px solid rgba(34,197,94,.48)",
            boxShadow: "0 0 70px rgba(34,197,94,.22)",
            display: "grid",
            gridTemplateColumns: "0.95fr 1.05fr",
            gap: 26,
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100%",
              minHeight: 510,
              background: "white",
              borderRadius: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 28,
              boxShadow: "0 24px 60px rgba(0,0,0,.35)",
            }}
          >
            {activeImage && (
              <img
                src={activeImage}
                alt={activeName}
                style={{
                  maxWidth: "100%",
                  maxHeight: 500,
                  objectFit: "contain",
                }}
              />
            )}
          </div>

          <div>
            <div
              style={{
                display: "inline-block",
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(250,204,21,.16)",
                border: "1px solid rgba(250,204,21,.38)",
                color: "#fde68a",
                fontSize: 28,
                fontWeight: 950,
              }}
            >
              المنتج رقم {activeIndex + 1}
            </div>

            <div
              style={{
                marginTop: 22,
                fontSize: 46,
                lineHeight: 1.25,
                fontWeight: 950,
              }}
            >
              {short(activeName, 72)}
            </div>

            <div
              style={{
                marginTop: 24,
                display: "inline-block",
                padding: "16px 34px",
                borderRadius: 999,
                background: style.priceBg,
                fontSize: 48,
                fontWeight: 950,
                boxShadow: `0 0 ${35 + pulse * 35}px ${style.glow}`,
              }}
            >
              {activePrice}
            </div>

            <div
              style={{
                marginTop: 22,
                fontSize: 32,
                color: "#bfdbfe",
                fontWeight: 900,
              }}
            >
              المتجر: {activeStore}
            </div>

            <div
              style={{
                marginTop: 24,
                fontSize: 28,
                color: "#e5e7eb",
                lineHeight: 1.5,
              }}
            >
              شوف السعر وقارن قبل ما تشتري من BPS Chat
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {shown.slice(0, 3).map((p, i) => {
            const img = image(p);
            const isActive = i === activeIndex;

            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px 1fr",
                  gap: 16,
                  alignItems: "center",
                  padding: 16,
                  borderRadius: 28,
                  background: isActive
                    ? "linear-gradient(135deg, rgba(34,197,94,.22), rgba(37,99,235,.16))"
                    : "rgba(255,255,255,.08)",
                  border: isActive
                    ? "2px solid rgba(34,197,94,.55)"
                    : "1px solid rgba(255,255,255,.14)",
                  boxShadow: isActive
                    ? "0 0 38px rgba(34,197,94,.26)"
                    : "0 0 20px rgba(0,0,0,.22)",
                }}
              >
                {img && (
                  <img
                    src={img}
                    alt={name(p)}
                    style={{
                      width: 150,
                      height: 150,
                      objectFit: "contain",
                      background: "white",
                      borderRadius: 22,
                      padding: 8,
                    }}
                  />
                )}

                <div>
                  <div style={{ fontSize: 25, fontWeight: 950 }}>
                    {short(name(p), 46)}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      color: "#86efac",
                      fontSize: 28,
                      fontWeight: 950,
                    }}
                  >
                    {String(price(p)).slice(0, 24)}
                  </div>
                </div>
              </div>
            );
          })}

          {shown.slice(3, 6).map((p, i) => {
            const img = image(p);
            const realIndex = i + 3;
            const isActive = realIndex === activeIndex;

            return (
              <div
                key={realIndex}
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px 1fr",
                  gap: 16,
                  alignItems: "center",
                  padding: 16,
                  borderRadius: 28,
                  background: isActive
                    ? "linear-gradient(135deg, rgba(34,197,94,.22), rgba(37,99,235,.16))"
                    : "rgba(255,255,255,.08)",
                  border: isActive
                    ? "2px solid rgba(34,197,94,.55)"
                    : "1px solid rgba(255,255,255,.14)",
                  boxShadow: isActive
                    ? "0 0 38px rgba(34,197,94,.26)"
                    : "0 0 20px rgba(0,0,0,.22)",
                }}
              >
                {img && (
                  <img
                    src={img}
                    alt={name(p)}
                    style={{
                      width: 150,
                      height: 150,
                      objectFit: "contain",
                      background: "white",
                      borderRadius: 22,
                      padding: 8,
                    }}
                  />
                )}

                <div>
                  <div style={{ fontSize: 25, fontWeight: 950 }}>
                    {short(name(p), 46)}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      color: "#86efac",
                      fontSize: 28,
                      fontWeight: 950,
                    }}
                  >
                    {String(price(p)).slice(0, 24)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: 70,
          right: 70,
          height: 78,
          borderRadius: 999,
          background: "rgba(0,0,0,.72)",
          border: "1px solid rgba(255,255,255,.18)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 42px",
          boxShadow: "0 0 45px rgba(37,99,235,.22)",
          zIndex: 30,
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 950 }}>
          bpschat.com
        </div>

        <div style={{ fontSize: 29, color: "#dbeafe", fontWeight: 850 }}>
         {style.footer}
        </div>

        <div style={{ fontSize: 30, fontWeight: 950, color: "#86efac" }}>
          BPS Chat
        </div>
      </div>
    </AbsoluteFill>
  );
}