"use client";

import { useRef } from "react";
import { Player, PlayerRef } from "@remotion/player";
import MarketingVideo from "../components/MarketingVideo";

export default function VideoPreview({
  query,
  countryName,
  products,
}: {
  query: string;
  countryName: string;
  products: any[];
}) {
  const playerRef = useRef<PlayerRef>(null);

  <a href="/bps-video.mp4" download>
  <button
    style={{
      marginBottom: 16,
      padding: "12px 20px",
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      background: "#00d4ff",
      color: "#000",
    }}
  >
    ⬇️ تحميل الفيديو MP4
  </button>
</a>
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: 24,
        display: "grid",
        placeItems: "center",
      }}
    >
      <div>
        <h1 style={{ marginBottom: 18 }}>BPS Chat Marketing Video Preview</h1>

       

        <Player
          ref={playerRef}
          component={MarketingVideo}
          durationInFrames={600}
          fps={30}
          compositionWidth={1080}
          compositionHeight={1920}
          controls
          style={{
            width: 360,
            height: 640,
            borderRadius: 20,
            overflow: "hidden",
          }}
          inputProps={{
            query,
            countryName,
            products,
          }}
        />
      </div>
    </main>
  );
}