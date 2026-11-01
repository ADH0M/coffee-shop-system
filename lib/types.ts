// lib/types.ts
export interface RetailProduct {
  id: number;
  name: string;
  category: string;
  price_per_kilo: number;
  stock_kg: number;
  producer_id: number | null;
  created_at: string;
}

export interface Beverage {
  id: number;
  name: string;
  drink_type: string;
  roast_level: string | null;
  is_mahuj: boolean;
  price: number;
  description: string | null;
  created_at: string;
}

export interface Order {
  id: number;
  customer_name: string;
  address: string | null;
  total_price: number;
  status: "pending" | "preparing" | "completed" | "cancelled";
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  retail_product_id: number | null;
  beverage_id: number | null;
  quantity: number;
  unit_price: number;
  beverage?: Beverage;
  retail_product?: RetailProduct;
}

export interface ProductFormData {
  name: string;
  category: string;
  price_per_kilo: number;
  stock_kg: number;
  producer_id: number | null;
}

export interface BeverageFormData {
  name: string;
  drink_type: string;
  roast_level: string | null;
  is_mahuj: boolean;
  price: number;
  description: string | null;
}

export interface Producer {
  producer_id: number;
  name: string;
  rating: number;
  created_at: string;
  phones?: string[]; 
}
