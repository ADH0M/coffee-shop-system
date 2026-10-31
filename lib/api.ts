import { Beverage, Order, OrderItem, Producer, RetailProduct } from "./types";

// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) throw new Error(`خطأ في الـ API: ${res.statusText}`);
  return res.json();
}

export const api = {
  getOrders: () => fetchAPI<{ success: boolean; data: Order[] }>("/orders"),
  getOrderById: (id: number) => fetchAPI<Order>(`/orders/${id}`),
  createOrder: (data: {
    customer_name: string;
    address?: string;
    total_price: number;
  }) =>
    fetchAPI<Order>("/orders", { method: "POST", body: JSON.stringify(data) }),

  updateOrderStatus: (id: number, status: string) =>
    fetchAPI<Order>(`/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  createOrderItem: (data: {
    order_id: number;
    beverage_id?: number;
    retail_product_id?: number;
    quantity: number;
    unit_price: number;
  }) =>
    fetchAPI<OrderItem>("/order-items", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getBeverages: () => fetchAPI<{ success: boolean; data: Beverage[] }>("/beverages"),
  getRetailProducts: () => fetchAPI<{ success: boolean; data: RetailProduct[] }>("/retailProduct"),
  getProducers: () => fetchAPI<Producer[]>("/producers"),
};
