"use client";

import { useEffect } from "react";

export default function ScrollTextActivator() {
  useEffect(() => {
    let timer: any;

    const onScroll = () => {
      document.body.classList.add("isScrollingProductText");

      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.classList.remove("isScrollingProductText");
      }, 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return null;
}