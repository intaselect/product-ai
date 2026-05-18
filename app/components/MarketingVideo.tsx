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
  const shown = products.slice(0, 3);

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at top, #333 0%, #111 45%, #000 100%)",
        color: "white",
        fontFamily: "Arial",
        padding: 70,
        direction: "rtl",
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <div style={{ opacity: titleOpacity, textAlign: "center" }}>
        <h1 style={{ fontSize: 64, marginBottom: 20 }}>
          بتشتري {query} في {countryName}؟
        </h1>
        <p style={{ fontSize: 38, color: "#ddd" }}>
          استنى قبل ما تدفع 👀
        </p>
      </div>

      {/* Products */}
      <div style={{ marginTop: 50 }}>
        {shown.map((p, i) => {
          const move = interpolate(
            frame,
            [25 + i * 10, 45 + i * 10],
            [80, 0],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                transform: `translateY(${move}px)`,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 28,
                padding: 28,
                marginBottom: 22,
                boxShadow: "0 0 30px rgba(255,255,255,0.08)",
                textAlign: "center",
              }}
            >
              {/* Image */}
              {(p.image || p.thumbnail) && (
                <img
                  src={p.image || p.thumbnail}
                  alt={p.title || p.name || "Product"}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "contain",
                    borderRadius: 18,
                    background: "white",
                    padding: 8,
                    marginBottom: 14,
                  }}
                />
              )}

              {/* Store */}
              <div style={{ fontSize: 34, fontWeight: "bold" }}>
                {p.store || p.source || "متجر"}
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 30,
                  color: "#ddd",
                  marginTop: 8,
                }}
              >
                {(p.title || p.name || "منتج").slice(0, 42)}
              </div>

              {/* Price */}
              <div style={{ fontSize: 40, marginTop: 12 }}>
                {p.priceText || p.price || "شوف السعر"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 45 }}>
        <div style={{ fontSize: 44, fontWeight: "bold" }}>
          BPS Chat
        </div>
        <div style={{ fontSize: 30, color: "#ccc" }}>
          قارن قبل ما تشتري
        </div>
        <div style={{ fontSize: 28, marginTop: 10 }}>
          bpschat.com
        </div>
      </div>
    </AbsoluteFill>
  );
}