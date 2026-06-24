"use client";

import Link from "next/link";

export default function BestOffersSlider({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="bestOffersSlider">
      <div className="bestOffersHeader">
        <h2> أفضل عروض جميع متاجر بلدك</h2>

        <Link href="/customer-offers" className="bestOffersAllBtn">
          تصفح جميع العروض ←
        </Link>
      </div>

      <div className="bestOffersTrack">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/customer-offers/product/bps-chat-${String(
              product.product_name || ""
            )
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")}-${
              product.country || "sa"
            }-${product.id}`}
            className="bestOfferCard"
          >
            <div className="bestOfferImage">
              <img src={product.image_url} alt={product.product_name} />
            </div>

            <h3>{product.product_name}</h3>

            <p className="bestOfferPrice">{product.price}</p>

            <span className="bestOfferStore">
              {product.store_name || "متجر خارجي"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}