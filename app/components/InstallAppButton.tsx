"use client";

import { useEffect, useState } from "react";

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShow(false);
  };

  if (!show) return null;

  return (
    <button className="installAppFloatingBtn" onClick={installApp}>
      <span className="installAppIcon">⚡</span>
      <span>
        ثبّت البحث السريع
        <small>ادخل لـ BPS Chat كأنه تطبيق</small>
      </span>
    </button>
  );
}