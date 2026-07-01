export interface Product {
  category: string;
  createdAt: string;
  id: number;
  name: string;
  price: number;
  status: "available" | "unavailable";
  stock: number;
}

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  orderId: string;
  name: string;
  createdAt: string;
  totalPrice: number;
  newStatus: OrderStatus;
  items: Item[];
  status: OrderStatus;
}
