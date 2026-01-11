
import { Product, Category } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones",
    price: 348.00,
    rating: 4.5,
    reviewsCount: 12540,
    image: "https://picsum.photos/seed/sony-xm5/600/600",
    category: Category.Electronics,
    description: "The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality.",
    features: [
      "Industry-leading noise cancellation",
      "Magnificent Sound, engineered to perfection",
      "Crystal clear hands-free calling",
      "Up to 30-hour battery life",
      "Multipoint connection"
    ],
    isPrime: true,
    stockCount: 15
  },
  {
    id: "2",
    title: "Apple 2024 MacBook Air 13-inch Laptop with M3 chip",
    price: 1099.00,
    rating: 4.8,
    reviewsCount: 890,
    image: "https://picsum.photos/seed/macbook/600/600",
    category: Category.Electronics,
    description: "LEAN. MEAN. M3 MACHINE — The blazing-fast MacBook Air with the M3 chip is a superportable laptop that sails through work and play.",
    features: [
      "Apple M3 Chip",
      "Up to 18 hours of battery life",
      "13.6-inch Liquid Retina Display",
      "1080p FaceTime HD camera",
      "Six-speaker sound system"
    ],
    isPrime: true,
    stockCount: 8
  },
  {
    id: "3",
    title: "KitchenAid Artisan Series 5-Quart Tilt-Head Stand Mixer",
    price: 449.99,
    rating: 4.9,
    reviewsCount: 25000,
    image: "https://picsum.photos/seed/mixer/600/600",
    category: Category.Home,
    description: "Whether you need 9 dozen of your signature chocolate chip cookies or shredded chicken for Taco Tuesday, the KitchenAid Artisan Series 5 Quart Tilt-Head Stand Mixer has the capacity for every occasion.",
    features: [
      "Built to last with 59 touchpoints",
      "5 Quart stainless steel bowl",
      "Tilt-head design for easy access",
      "10 speeds for nearly any task",
      "Includes flat beater, dough hook, and wire whip"
    ],
    isPrime: true,
    stockCount: 20
  },
  {
    id: "4",
    title: "Kindle Paperwhite (16 GB) – Now with a 6.8\" display and adjustable warm light",
    price: 149.99,
    rating: 4.7,
    reviewsCount: 32410,
    image: "https://picsum.photos/seed/kindle/600/600",
    category: Category.Books,
    description: "The Kindle Paperwhite is thin, lightweight, and travels easily so you can enjoy your favorite books at any time.",
    features: [
      "6.8” display and thinner borders",
      "Adjustable warm light",
      "Up to 10 weeks of battery life",
      "20% faster page turns",
      "Waterproof reading"
    ],
    isPrime: true,
    stockCount: 50
  },
  {
    id: "5",
    title: "Levi's Men's 501 Original Fit Jeans",
    price: 59.99,
    rating: 4.4,
    reviewsCount: 4500,
    image: "https://picsum.photos/seed/levis/600/600",
    category: Category.Fashion,
    description: "Close your eyes. Think 'jeans.' Now open. They were 501s, right? They're literally the blueprint for every pair of jeans in existence—burned into the world's collective cortex ever since Levi Strauss invented them in 1873.",
    features: [
      "100% Cotton",
      "Button Fly closure",
      "Regular through seat and thigh",
      "Straight leg",
      "Sits at waist"
    ],
    isPrime: true,
    stockCount: 100
  },
  {
    id: "6",
    title: "Echo Dot (5th Gen, 2022 release) | Smart speaker with Alexa | Charcoal",
    price: 49.99,
    rating: 4.6,
    reviewsCount: 15600,
    image: "https://picsum.photos/seed/echo/600/600",
    category: Category.Electronics,
    description: "Our best sounding Echo Dot yet – Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals, deeper bass and vibrant sound in any room.",
    features: [
      "Our best-sounding Echo Dot yet",
      "Check the time and more at a glance",
      "Alexa is happy to help",
      "Keep your home comfortable",
      "Do more with device pairing"
    ],
    isPrime: true,
    stockCount: 200
  }
];
