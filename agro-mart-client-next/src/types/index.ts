// Shared TypeScript types for the Agro-Mart application

export interface UserInfo {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
  category: string;
  description: string;
  quantity: number;
  rating?: number;
  inStock?: boolean;
  sellerEmail?: string;
  sellerName?: string;
}

export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  email: string;
}

export interface Order {
  _id: string;
  email: string;
  products: CartItem[];
  totalAmount: number;
  status: string;
  date: string;
  transactionId?: string;
}

export interface Review {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  rating?: number;
}

export interface WishlistItem {
  _id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  email: string;
}
