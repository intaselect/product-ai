"use client";

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
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
  countryName,
  products,
}: {
  query: string;
  countryName: string;
  products: Product[];
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shown = products.slice(0, 3);

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  const glowPulse = interpolate(
    Math.sin(frame / 10),
    [-1, 1],
    [0.35, 0.9]
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 8%, rgba(0,180,255,0.38), transparent 28%), radial-gradient(circle at 20% 80%, rgba(140,60,255,0.28), transparent 30%), linear-gradient(180deg, #05070d 0%, #090b12 45%, #000 100%)",
        color: "white",
        fontFamily: "Arial",
        padding: 62,
        direction: "rtl",
        overflow: "hidden",
      }}
    >
      {/* AI glowing background */}
      <div
        style={{
          position: "absolute",
          inset: -120,
          background:
            "linear-gradient(120deg, transparent, rgba(0,220,255,0.12), transparent)",
          transform: `translateX(${interpolate(frame, [0, 180], [-260, 260], {
            extrapolateRight: "clamp",
          })}px) rotate(12deg)`,
        }}
      />

      {/* particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 6 + (i % 3) * 3,
            height: 6 + (i % 3) * 3,
            borderRadius: "50%",
            background: "rgba(0,220,255,0.75)",
            left: `${8 + ((i * 17) % 82)}%`,
            top: `${8 + ((i * 29) % 82)}%`,
            opacity: interpolate(Math.sin(frame / 12 + i), [-1, 1], [0.15, 0.8]),
            boxShadow: "0 0 18px rgba(0,220,255,0.9)",
          }}
        />
      ))}

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${titleScale})`,
          marginTop: 35,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: 999,
            background: "rgba(0,220,255,0.12)",
            border: "1px solid rgba(0,220,255,0.42)",
            boxShadow: `0 0 ${30 + glowPulse * 30}px rgba(0,220,255,0.45)`,
            fontSize: 28,
            marginBottom: 22,
          }}
        >
          AI Product Search
        </div>

        <h1
          style={{
            fontSize: 62,
            lineHeight: 1.15,
            margin: 0,
            textShadow: "0 0 28px rgba(0,220,255,0.45)",
          }}
        >
          بتشتري {query} في {countryName}؟
        </h1>

        <p style={{ fontSize: 36, color: "#d8eaff", marginTop: 18 }}>
          استنى قبل ما تدفع… قارن بالذكاء الاصطناعي 👀
        </p>
      </div>

      {/* Product cards */}
      <div style={{ marginTop: 42 }}>
        {shown.map((p, i) => {
          const cardSpring = spring({
            frame: frame - 25 - i * 12,
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          const y = interpolate(cardSpring, [0, 1], [90, 0]);
          const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

          const isFirst = i === 0;

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${y}px) scale(${isFirst ? 1.03 : 1})`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: isFirst
                  ? "linear-gradient(135deg, rgba(0,220,255,0.22), rgba(255,255,255,0.08))"
                  : "rgba(255,255,255,0.075)",
                border: isFirst
                  ? "2px solid rgba(0,220,255,0.72)"
                  : "1px solid rgba(255,255,255,0.16)",
                borderRadius: 30,
                padding: 24,
                marginBottom: 20,
                boxShadow: isFirst
                  ? "0 0 44px rgba(0,220,255,0.34)"
                  : "0 0 26px rgba(255,255,255,0.08)",
              }}
            >
              {(p.image || p.thumbnail) && (
                <img
                  src={p.image || p.thumbnail}
                  alt={p.title || p.name || "Product"}
                  style={{
                    width: 135,
                    height: 135,
                    objectFit: "contain",
                    borderRadius: 22,
                    background: "white",
                    padding: 10,
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
                      padding: "7px 16px",
                      fontSize: 22,
                      marginBottom: 10,
                      color: "#baffea",
                    }}
                  >
                    الأرخص غالبًا 🔥
                  </div>
                )}

                <div style={{ fontSize: 32, fontWeight: "bold" }}>
                  {p.store || p.source || "متجر"}
                </div>

                <div style={{ fontSize: 27, color: "#d6d6d6", marginTop: 7 }}>
                  {(p.title || p.name || "منتج").slice(0, 46)}
                </div>

                <div
                  style={{
                    fontSize: 42,
                    marginTop: 10,
                    fontWeight: "bold",
                    color: "#ffffff",
                    textShadow: "0 0 18px rgba(0,220,255,0.45)",
                  }}
                >
                  {p.priceText || p.price || "شوف السعر"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 55,
          left: 60,
          right: 60,
          textAlign: "center",
          padding: 26,
          borderRadius: 28,
          background: "rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 0 40px rgba(0,220,255,0.18)",
        }}
      >
        <div style={{ fontSize: 50, fontWeight: "bold" }}>BPS Chat</div>
        <div style={{ fontSize: 31, color: "#d9f6ff", marginTop: 6 }}>
          ابحث. قارن. وفر.
        </div>
        <div style={{ fontSize: 29, marginTop: 8 }}>bpschat.com</div>
      </div>
    </AbsoluteFill>
  );
}