export interface Review {
  id: string;
  author: string;
  role: string; // e.g., "Mom of 2", "New Dad", "Pediatrician"
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Certification {
  name: string;
  authority: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'sleep' | 'gear' | 'play' | 'feeding' | 'apparel' | 'bath';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  features: string[];
  materials: string;
  certifications: Certification[];
  pediatricianNote?: {
    approvedBy: string;
    note: string;
  };
  reviews: Review[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface RegistryPreference {
  babyAge: 'expecting' | 'newborn' | 'infant' | 'toddler';
  primaryNeed: 'sleep' | 'feeding' | 'play' | 'gear' | 'all';
  designStyle: 'minimalist' | 'natural' | 'hightech';
}
