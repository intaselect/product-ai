"use client";

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

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

function short(v: any, max = 58) {
  const t = clean(v);
  return t.length > max ? t.slice(0, max - 3) + "..." : t;
}

function getProductName(p?: Product) {
  return clean(p?.title || p?.name || "منتج مميز");
}

function getPrice(p?: Product) {
  return clean(p?.priceText || p?.price || "شوف السعر");
}

function getStore(p?: Product) {
  return clean(p?.store || p?.source || "متجر موثوق");
}

function getImage(p?: Product) {
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
    badge: "🔥 الأرخص اليوم",
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
export default function MarketingVideo({
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
).slice(0, 5);
  const hero = shown[0] || products[0];

  const heroImage = getImage(hero);
  const heroTitle = getProductName(hero);
  const heroPrice = getPrice(hero);
  const heroStore = getStore(hero);

  const introScale = interpolate(frame, [0, 25, 90], [0.92, 1.04, 1], {
    extrapolateRight: "clamp",
  });

  const introOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const listOpacity = interpolate(frame, [105, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroMoveUp = interpolate(frame, [0, 120], [0, -110], {
    extrapolateRight: "clamp",
  });

  const shineX = interpolate(frame, [0, 600], [-700, 700], {
    extrapolateRight: "clamp",
  });

  const pulse = interpolate(Math.sin(frame / 8), [-1, 1], [0.75, 1]);

  return (
    <AbsoluteFill
      style={{
        background: style.bg,
        color: "white",
        fontFamily: "Arial",
        direction: "rtl",
        overflow: "hidden",
        padding: 46,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -140,
          background:
            "linear-gradient(115deg, transparent, rgba(255,255,255,0.18), transparent)",
          transform: `translateX(${shineX}px) rotate(12deg)`,
          opacity: 0.9,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 34,
          left: 46,
          right: 46,
          zIndex: 9,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg,#ef4444,#f97316)",
            color: "#fff",
            borderRadius: 999,
            padding: "12px 24px",
            fontSize: 28,
            fontWeight: 900,
            boxShadow: "0 0 35px rgba(249,115,22,.55)",
          }}
        >
         {style.badge}
        </div>

        <div
          style={{
            background: "rgba(0,0,0,.55)",
            border: "1px solid rgba(255,255,255,.2)",
            borderRadius: 999,
            padding: "10px 18px",
            fontSize: 24,
            fontWeight: 900,
          }}
        >
          BPS Chat
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 125 + heroMoveUp,
          left: 46,
          right: 46,
          zIndex: 5,
          opacity: introOpacity,
          transform: `scale(${introScale})`,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 950,
              color: "#bbf7d0",
              textShadow: "0 0 28px rgba(34,197,94,.55)",
            }}
          >
            لا تشتري قبل ما تقارن السعر 👇
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 28,
              color: "#dbeafe",
              fontWeight: 800,
            }}
          >
            {query} | {countryName}
          </div>
        </div>

        <div
          style={{
            borderRadius: 46,
            padding: 26,
            background:
              "linear-gradient(145deg, rgba(255,255,255,.16), rgba(255,255,255,.06))",
            border: "2px solid rgba(34,197,94,.55)",
            boxShadow: "0 0 65px rgba(34,197,94,.28)",
            textAlign: "center",
          }}
        >
          {heroImage && (
            <div
              style={{
                height: 560,
                background: "white",
                borderRadius: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 30,
                boxShadow: "0 25px 60px rgba(0,0,0,.35)",
              }}
            >
              <img
                src={heroImage}
                alt={heroTitle}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          )}

          <div
            style={{
              marginTop: 22,
              fontSize: 38,
              lineHeight: 1.35,
              fontWeight: 950,
            }}
          >
            {short(heroTitle, 70)}
          </div>

          <div
            style={{
              marginTop: 16,
              display: "inline-block",
              padding: "14px 34px",
              borderRadius: 999,
              background: style.priceBg,
              color: "#fff",
              fontSize: 48,
              fontWeight: 950,
              boxShadow: `0 0 ${30 + pulse * 35}px ${style.glow}`,
            }}
          >
            {heroPrice}
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 28,
              color: "#dbeafe",
              fontWeight: 850,
            }}
          >
            المتجر: {heroStore}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 980,
          left: 46,
          right: 46,
          bottom: 150,
          zIndex: 8,
          opacity: listOpacity,
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 950,
            marginBottom: 18,
            textAlign: "center",
            color: "#fde68a",
            textShadow: "0 0 22px rgba(250,204,21,.45)",
          }}
        >
          عروض مشابهة تستحق المقارنة
        </div>

        {shown.slice(1, 5).map((p, i) => {
          const img = getImage(p);
          const title = getProductName(p);
          const price = getPrice(p);
          const store = getStore(p);

          const enterY = interpolate(frame, [130 + i * 12, 165 + i * 12], [60, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const opacity = interpolate(frame, [130 + i * 12, 165 + i * 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginBottom: 14,
                padding: 15,
                borderRadius: 26,
                background: "rgba(255,255,255,.095)",
                border: "1px solid rgba(255,255,255,.16)",
                boxShadow: "0 0 28px rgba(0,0,0,.25)",
                transform: `translateY(${enterY}px)`,
                opacity,
              }}
            >
              {img && (
                <img
                  src={img}
                  alt={title}
                  style={{
                    width: 118,
                    height: 118,
                    objectFit: "contain",
                    background: "white",
                    borderRadius: 22,
                    padding: 8,
                  }}
                />
              )}

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 24, color: "#bfdbfe", fontWeight: 900 }}>
                  {store}
                </div>

                <div
                  style={{
                    marginTop: 4,
                    fontSize: 25,
                    lineHeight: 1.28,
                    fontWeight: 850,
                  }}
                >
                  {short(title, 48)}
                </div>
              </div>

              <div
                style={{
                  minWidth: 210,
                  textAlign: "center",
                  color: "#86efac",
                  fontSize: 29,
                  fontWeight: 950,
                }}
              >
                {String(price).slice(0, 22)}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 48,
          right: 48,
          zIndex: 20,
          borderRadius: 30,
          background: "rgba(0,0,0,.72)",
          border: "1px solid rgba(255,255,255,.18)",
          padding: "20px 28px",
          textAlign: "center",
          boxShadow: "0 0 45px rgba(37,99,235,.28)",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 950 }}>
         {style.footer}
        </div>

        <div style={{ fontSize: 28, marginTop: 6, color: "#93c5fd", fontWeight: 900 }}>
          bpschat.com
        </div>
      </div>
    </AbsoluteFill>
  );
}