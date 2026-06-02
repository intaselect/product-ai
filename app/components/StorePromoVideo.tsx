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
  const shown = products.slice(0, 10);

  const introOpacity = interpolate(frame, [0, 60, 120], [0, 1, 1], {
    extrapolateRight: "clamp",
  });

  const cardsOpacity = interpolate(frame, [120, 180], [0, 1], {
    extrapolateRight: "clamp",
  });

  const slideX = interpolate(frame, [120, 500], [120, 0], {
    extrapolateRight: "clamp",
  });

  const pulse = interpolate(Math.sin(frame / 12), [-1, 1], [0.5, 1]);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 15% 15%, rgba(0,220,255,0.30), transparent 30%), radial-gradient(circle at 85% 85%, rgba(255,140,0,0.22), transparent 32%), linear-gradient(135deg, #030712 0%, #07111f 45%, #000 100%)",
        color: "white",
        fontFamily: "Arial",
        direction: "rtl",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -200,
          background:
            "linear-gradient(120deg, transparent, rgba(0,220,255,0.14), transparent)",
          transform: `translateX(${interpolate(frame, [0, 1800], [-900, 900])}px) rotate(10deg)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 55,
          right: 80,
          left: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              padding: "12px 28px",
              borderRadius: 999,
              background: "rgba(0,220,255,0.14)",
              border: "1px solid rgba(0,220,255,0.55)",
              boxShadow: `0 0 ${30 + pulse * 35}px rgba(0,220,255,0.40)`,
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            BPS Chat | بي بي اس شات
          </div>

          <h1
            style={{
              margin: "26px 0 0",
              fontSize: 62,
              lineHeight: 1.15,
              maxWidth: 900,
              textShadow: "0 0 35px rgba(0,220,255,0.45)",
              opacity: introOpacity,
            }}
          >
            أفضل عروض {query}
          </h1>

          <div
            style={{
              marginTop: 18,
              fontSize: 34,
              color: "#d9f6ff",
              opacity: introOpacity,
            }}
          >
            منتجات مختارة في {countryName} مع السعر والمتجر
          </div>
        </div>

        <div
          style={{
            width: 360,
            padding: 28,
            borderRadius: 36,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 0 60px rgba(0,220,255,0.18)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 44, fontWeight: "bold" }}>ابحث</div>
          <div style={{ fontSize: 44, fontWeight: "bold" }}>قارن</div>
          <div style={{ fontSize: 44, fontWeight: "bold", color: "#80f7ff" }}>
            وفر
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 300,
          right: 80,
          left: 80,
          bottom: 135,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 22,
          opacity: cardsOpacity,
          transform: `translateX(${slideX}px)`,
          zIndex: 4,
        }}
      >
        {shown.map((p, i) => {
          const img = p.image || p.thumbnail;
          const title = p.title || p.name || "منتج";
          const store = p.store || p.source || "متجر";
          const price = p.priceText || p.price || "شوف السعر";

          const y = interpolate(
            Math.sin(frame / 18 + i),
            [-1, 1],
            [-8, 8]
          );

          return (
            <div
              key={i}
              style={{
                borderRadius: 28,
                padding: 18,
                background:
                  i === 0
                    ? "linear-gradient(135deg, rgba(0,220,255,0.26), rgba(255,140,0,0.16))"
                    : "rgba(255,255,255,0.075)",
                border:
                  i === 0
                    ? "2px solid rgba(0,220,255,0.75)"
                    : "1px solid rgba(255,255,255,0.14)",
                boxShadow:
                  i === 0
                    ? "0 0 55px rgba(0,220,255,0.35)"
                    : "0 0 25px rgba(255,255,255,0.08)",
                transform: `translateY(${y}px)`,
              }}
            >
              {img && (
                <img
                  src={img}
                  alt={title}
                  style={{
                    width: "100%",
                    height: 145,
                    objectFit: "contain",
                    background: "white",
                    borderRadius: 22,
                    padding: 10,
                    marginBottom: 14,
                  }}
                />
              )}

              <div style={{ fontSize: 24, fontWeight: "bold", color: "#bff7ff" }}>
                {store}
              </div>

              <div
                style={{
                  fontSize: 23,
                  color: "#ffffff",
                  marginTop: 8,
                  lineHeight: 1.25,
                  minHeight: 58,
                }}
              >
                {title.slice(0, 54)}
              </div>

              <div
                style={{
                  marginTop: 12,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                  textShadow: "0 0 18px rgba(0,220,255,0.48)",
                }}
              >
                {String(price).slice(0, 28)}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 42,
          left: 80,
          right: 80,
          height: 78,
          borderRadius: 999,
          background: "rgba(0,0,0,0.66)",
          border: "1px solid rgba(255,255,255,0.18)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 42px",
          boxShadow: "0 0 45px rgba(0,220,255,0.20)",
          zIndex: 7,
        }}
      >
        <div style={{ fontSize: 30, fontWeight: "bold" }}>
          bpschat.com
        </div>

        <div style={{ fontSize: 28, color: "#d9f6ff" }}>
          قارن الأسعار قبل ما تشتري
        </div>

        <div style={{ fontSize: 30, fontWeight: "bold", color: "#80f7ff" }}>
          BPS Chat
        </div>
      </div>
    </AbsoluteFill>
  );
}