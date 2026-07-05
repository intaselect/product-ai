import customerOffers from "@/data/customer_offers.json";
import searchTerms from "@/data/search_terms.json";
import seoLandingPages from "@/data/seo_landing_pages.json";

const offers = customerOffers as any[];
const searches = searchTerms as any[];
const collections = seoLandingPages as any[];

function slugify(text: string) {
  return String(text || "product")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "");
}

function getIdFromSlug(slug: string) {
  const parts = slug.split("-");
  const id = Number(parts[parts.length - 1]);
  return Number.isFinite(id) ? id : null;
}

export function getApprovedOffers() {
  return offers.filter((o) => o.status === "approved");
}

export function getOfferBySlug(slug: string) {
  const id = getIdFromSlug(slug);

  return (
    getApprovedOffers().find(
      (o) => Number(o.id) === Number(id)
    ) || null
  );
}

export function getRelatedOffers(offer: any) {
  const category = Array.isArray(offer.category)
    ? offer.category
    : [];

  let data = getApprovedOffers().filter(
    (o) =>
      o.country === offer.country &&
      o.id !== offer.id
  );

  if (category.length) {
    const related = data.filter((o) =>
      Array.isArray(o.category)
        ? o.category.some((c: string) =>
            category.includes(c)
          )
        : false
    );

    if (related.length) return related.slice(0, 40);
  }

  return data.slice(0, 12);
}

export function getCountryOffers(
  country: string,
  currentId: number
) {
  return getApprovedOffers()
    .filter(
      (o) =>
        o.country === country &&
        o.id !== currentId
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 12);
}

export function getRelatedSearchTerms(
  productName: string,
  country: string
) {
  const words = String(productName)
    .split(/\s+/)
    .filter((w) => w.length > 2);

  return searches
    .filter(
      (s) =>
        s.country === country &&
        words.some((w) =>
          String(s.query)
            .toLowerCase()
            .includes(w.toLowerCase())
        )
    )
    .sort(
      (a, b) =>
        (b.search_count || 0) -
        (a.search_count || 0)
    )
    .slice(0, 8);
}

export function getRelatedCollections() {
  return collections.slice(0, 12);
}