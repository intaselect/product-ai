"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function GlobalProductSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = q.trim();
    if (!query) return;

    router.push(`/customer-offers/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <section className="globalProductSearchWrap" dir="rtl">
      <form className="globalProductSearchBox" onSubmit={handleSearch}>
        <span className="globalSearchIcon">🔎</span>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث في عالم المنتجات عن موبايل، عطر، لابتوب، ساعة..."
          aria-label="البحث في منتجات BPS Chat"
        />

        <button type="submit">بحث</button>
      </form>
    </section>
  );
}