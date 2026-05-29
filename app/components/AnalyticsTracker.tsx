"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getOrCreateId(key: string) {
  let value = localStorage.getItem(key);

  if (!value) {
    value = crypto.randomUUID();
    localStorage.setItem(key, value);
  }

  return value;
}

function sendEvent(data: any) {
  try {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      keepalive: true,
    });
  } catch {}
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const visitorId = getOrCreateId("bps_visitor_id");
    const sessionId = getOrCreateId("bps_session_id");

    const startedAt = Date.now();

    sendEvent({
      visitor_id: visitorId,
      session_id: sessionId,
      event_type: "page_view",
      path: pathname,
    });

    const onUnload = () => {
      const duration = Math.round((Date.now() - startedAt) / 1000);

      navigator.sendBeacon(
        "/api/analytics/track",
        new Blob(
          [
            JSON.stringify({
              visitor_id: visitorId,
              session_id: sessionId,
              event_type: "session_end",
              path: pathname,
              duration_seconds: duration,
            }),
          ],
          { type: "application/json" }
        )
      );
    };

    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [pathname]);

  return null;
}