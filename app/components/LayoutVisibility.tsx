"use client";

import { usePathname } from "next/navigation";

export default function LayoutVisibility({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isProductPage = pathname.startsWith("/customer-offers/product/");

  if (isProductPage) {
    return null;
  }

  return <>{children}</>;
}