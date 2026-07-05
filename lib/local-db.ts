import customerOffers from "@/data/customer_offers.json";
import searchTerms from "@/data/search_terms.json";
import seoLandingPages from "@/data/seo_landing_pages.json";

export type LocalOffer = any;

export function getApprovedOffers() {
  return (customerOffers as LocalOffer[]).filter(
    (offer) => offer.status === "approved"
  );
}

export function getOfferById(id: number) {
  return getApprovedOffers().find((offer) => Number(offer.id) === Number(id)) || null;
}

export function getOffersByCountry(country: string) {
  return getApprovedOffers().filter((offer) => offer.country === country);
}

export function getSearchTerms() {
  return searchTerms as any[];
}

export function getSeoLandingPages() {
  return seoLandingPages as any[];
}