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

  const shown = products.slice(0, 5);
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
        background:
          "radial-gradient(circle at 50% 5%, rgba(34,197,94,0.36), transparent 30%), radial-gradient(circle at 20% 80%, rgba(37,99,235,0.32), transparent 36%), linear-gradient(180deg, #020617 0%, #07111f 52%, #000 100%)",
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
          🔥 الأرخص اليوم
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
              background: "linear-gradient(135deg,#16a34a,#22c55e)",
              color: "#fff",
              fontSize: 48,
              fontWeight: 950,
              boxShadow: `0 0 ${30 + pulse * 35}px rgba(34,197,94,.65)`,
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
          شوف أرخص سعر قبل الشراء
        </div>

        <div style={{ fontSize: 28, marginTop: 6, color: "#93c5fd", fontWeight: 900 }}>
          bpschat.com
        </div>
      </div>
    </AbsoluteFill>
  );
}