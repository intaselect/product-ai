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

export default function MarketingVideo({
  query,
  products,
}: {
  query: string;
  countryName: string;
  products: Product[];
}) {
  const frame = useCurrentFrame();

  const shown = products.slice(0, 18);
  const scrollY = Math.round(
  interpolate(frame, [0, 540], [0, -900], {
    extrapolateRight: "clamp",
  })
);

  const pulse = interpolate(Math.sin(frame / 10), [-1, 1], [0.45, 1]);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 6%, rgba(0,220,255,0.35), transparent 28%), radial-gradient(circle at 25% 85%, rgba(150,60,255,0.28), transparent 32%), linear-gradient(180deg, #05070d 0%, #080b12 45%, #000 100%)",
        color: "white",
        fontFamily: "Arial",
        direction: "rtl",
        overflow: "hidden",
        padding: 48,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -120,
          background:
            "linear-gradient(120deg, transparent, rgba(0,220,255,0.16), transparent)",
          transform: `translateX(${interpolate(frame, [0, 540], [-420, 420], {
            extrapolateRight: "clamp",
          })}px) rotate(12deg)`,
        }}
      />

      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 5 + (i % 3) * 3,
            height: 5 + (i % 3) * 3,
            borderRadius: "50%",
            background: "rgba(0,220,255,0.75)",
            left: `${7 + ((i * 19) % 86)}%`,
            top: `${6 + ((i * 31) % 88)}%`,
            opacity: interpolate(Math.sin(frame / 12 + i), [-1, 1], [0.12, 0.9]),
            boxShadow: "0 0 20px rgba(0,220,255,0.95)",
          }}
        />
      ))}

      {/* Header fixed */}
      <div
        style={{
          position: "absolute",
          top: 42,
          left: 48,
          right: 48,
          textAlign: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px 24px",
            borderRadius: 999,
            background: "rgba(0,220,255,0.13)",
            border: "1px solid rgba(0,220,255,0.5)",
            boxShadow: `0 0 ${35 + pulse * 35}px rgba(0,220,255,0.45)`,
            fontSize: 26,
            marginBottom: 16,
          }}
        >
          AI Product Search
        </div>

        <h1
          style={{
            fontSize: 54,
            margin: 0,
            lineHeight: 1.15,
            textShadow: "0 0 30px rgba(0,220,255,0.48)",
          }}
        >
          أفضل أسعار {query}
        </h1>

       <div style={{ marginTop: 12 }}>
  <div style={{ fontSize: 30, color: "#d8eaff" }}>
    متاجر العالم بين إيديك بضغطة… اختار الأفضل
  </div>

  <div style={{ fontSize: 24, color: "#bfefff", marginTop: 8 }}>
    السعودية 🇸🇦 | الإمارات 🇦🇪 | الكويت 🇰🇼 | قطر 🇶🇦 | البحرين 🇧🇭 | مصر 🇪🇬
  </div>

  <div
    style={{
      fontSize: 24,
      color: "#ffffff",
      marginTop: 8,
      fontWeight: "bold",
    }}
  >
    BPS Chat | بي بي اس شات
  </div>
</div>
      </div>

   
{/* Scrolling products */}
<div
  style={{
    position: "absolute",
    top: 300,
    left: 48,
    right: 48,
    bottom: 115,
    overflow: "hidden",
    zIndex: 3,
  }}
>
       <div
  style={{
    transform: `translate3d(0, ${scrollY}px, 0)`,
    willChange: "transform",
  }}
>
          {shown.map((p, i) => {
            const isFirst = i === 0;
            const img = p.image || p.thumbnail;
            const title = p.title || p.name || "منتج";
            const store = p.store || p.source || "متجر";
            const price = p.priceText || p.price || "شوف السعر";

            return (
              <div
                key={i}
                style={{
                    
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  background: isFirst
                    ? "linear-gradient(135deg, rgba(0,220,255,0.24), rgba(255,255,255,0.08))"
                    : "rgba(255,255,255,0.075)",
                  border: isFirst
                    ? "2px solid rgba(0,220,255,0.78)"
                    : "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 28,
                  padding: 18,
                  marginBottom: 16,
                  minHeight: 142,
                  boxShadow: isFirst
                    ? "0 0 42px rgba(0,220,255,0.34)"
                    : "0 0 24px rgba(255,255,255,0.07)",
                }}
              >
                {img && (
                  <img
                    src={img}
                    alt={title}
                    style={{
                      width: 110,
                      height: 110,
                      objectFit: "contain",
                      borderRadius: 20,
                      background: "white",
                      padding: 9,
                      boxShadow: "0 0 24px rgba(255,255,255,0.22)",
                    }}
                  />
                )}

                <div style={{ flex: 1 }}>
                  {isFirst && (
                    <div
                      style={{
                        display: "inline-block",
                        background: "rgba(0,255,180,0.16)",
                        border: "1px solid rgba(0,255,180,0.5)",
                        borderRadius: 999,
                        padding: "6px 15px",
                        fontSize: 21,
                        marginBottom: 8,
                        color: "#baffea",
                      }}
                    >
                      نتيجة مميزة 🔥
                    </div>
                  )}

                  <div style={{ fontSize: 31, fontWeight: "bold" }}>
                    {store}
                  </div>

                  <div style={{ fontSize: 25, color: "#d6d6d6", marginTop: 6 }}>
                    {title.slice(0, 58)}
                  </div>

                  <div
                    style={{
                      fontSize: 34,
                      marginTop: 8,
                      fontWeight: "bold",
                      textShadow: "0 0 18px rgba(0,220,255,0.45)",
                    }}
                  >
                    {price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer fixed */}
<div
  style={{
    position: "absolute",
    bottom: 32,   // 👈 هنا
    left: 54,
    right: 54,
    textAlign: "center",
    padding: 22,  // 👈 وهنا
    borderRadius: 28,
    background: "rgba(0,0,0,0.62)",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 0 44px rgba(0,220,255,0.2)",
    zIndex: 6,
  }}
>
        <div style={{ fontSize: 38, fontWeight: "bold" }}>BPS Chat</div>

<div style={{ fontSize: 24, color: "#d9f6ff", marginTop: 3 }}>
  ابحث. قارن. وفر.
</div>

<div style={{ fontSize: 22, marginTop: 4 }}>bpschat.com</div>
      </div>
    </AbsoluteFill>
  );
}