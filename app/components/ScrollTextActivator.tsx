"use client";

import { useEffect } from "react";

export default function ScrollTextActivator() {
  useEffect(() => {
    let timer: any;

    const onScroll = () => {
      document.body.classList.remove("playProductTextOnce");

      requestAnimationFrame(() => {
        document.body.classList.add("playProductTextOnce");
      });

      clearTimeout(timer);

      timer = setTimeout(() => {
        document.body.classList.remove("playProductTextOnce");
      }, 2100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return null;
}