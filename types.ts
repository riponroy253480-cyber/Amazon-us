
export interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  isPrime: boolean;
  stockCount: number;
  buyNowUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Category {
  Electronics = "Electronics",
  Home = "Home & Kitchen",
  Fashion = "Fashion",
  Books = "Books",
  Gifts = "Gifts",
  Beauty = "Beauty & Personal Care"
}

export interface SiteSettings {
  heroBannerUrl: string;
}
