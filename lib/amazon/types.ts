export type NormalAmazonProduct = {
  asin: string;
  title: string;
  price: string;
  availability: "in_stock" | "out_of_stock" | "unknown";
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specifications: Record<string, any>;
  brand: string;
  rating?: string;
  reviewsCount?: string;
  raw: any;
};