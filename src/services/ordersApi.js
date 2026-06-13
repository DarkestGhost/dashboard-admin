import { supabase } from "./supabase";

export const fetchOrders = async () => {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) throw new Error("خطایی در دریافت سفارشات رخ داد.");
  return data;
};

export const fetchOrder = async (id) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error("خطایی در دریافت سفارش رخ داد.");
  return data;
};

export const editOrder = async ({ id, ...orderData }) => {
  const { data, error } = await supabase
    .from("orders")
    .update(orderData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error("خطایی در ویرایش سفارش رخ داد.");
  return data;
};
