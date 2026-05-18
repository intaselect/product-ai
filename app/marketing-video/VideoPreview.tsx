"use client";

import { Player } from "@remotion/player";
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
          component={MarketingVideo}
          durationInFrames={360}
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