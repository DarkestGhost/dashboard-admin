import { supabase } from "./supabase";
import type { Order } from "@/types/feature";

export const fetchOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) throw new Error("خطایی در دریافت سفارشات رخ داد.");
  return data;
};

export const fetchOrder = async (id: number): Promise<Order> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error("خطایی در دریافت سفارش رخ داد.");
  return data;
};

export const editOrder = async ({
  id,
  ...orderData
}: Order): Promise<Order> => {
  const { data, error } = await supabase
    .from("orders")
    .update(orderData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error("خطایی در ویرایش سفارش رخ داد.");
  return data;
};
