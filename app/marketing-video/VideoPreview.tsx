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

  const handleDownload = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: false,
      });

      playerRef.current?.seekTo(0);
      playerRef.current?.play();

      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        playerRef.current?.pause();
        stream.getTracks().forEach((track) => track.stop());

        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${query}-${countryName}-bpschat.webm`
          .replace(/\s+/g, "-")
          .replace(/[^\w\u0600-\u06FF.-]/g, "");
        a.click();

        URL.revokeObjectURL(url);
      };

      recorder.start();

      setTimeout(() => {
        recorder.stop();
      }, 20000);
    } catch (error) {
      alert("تم إلغاء التسجيل أو المتصفح لا يدعم تسجيل الشاشة");
    }
  };

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

        <button
          onClick={handleDownload}
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
          ⬇️ تحميل الفيديو
        </button>

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