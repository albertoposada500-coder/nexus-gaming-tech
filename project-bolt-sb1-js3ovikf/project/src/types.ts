export type CategoryId =
  | 'outlet'
  | 'laptops'
  | 'pc-escritorio'
  | 'tarjetas-graficas'
  | 'procesadores'
  | 'memorias-ram'
  | 'monitores'
  | 'mouse'
  | 'teclados'
  | 'periféricos'
  | 'sillas';

export interface Category {
  id: CategoryId;
  label: string;
  href: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  image: string;
  specs: ProductSpec[];
  badges: string[];
  inStock: boolean;
  popularity: number;
  gpu?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PaymentMethod {
  name: string;
  color: string;
}

export interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  ctaCategory: CategoryId;
}
