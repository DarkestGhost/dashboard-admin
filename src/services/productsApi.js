import { supabase } from "./supabase";

export const fetchProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw new Error("خطایی در دریافت محصولات رخ داد.");
  return data;
};

export const fetchProduct = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error("خطایی در دریافت محصول رخ داد.");
  return data;
};

export const addNewProduct = async (productData) => {
  const { data, error } = await supabase
    .from("products")
    .insert({
      ...productData,
      status: productData.stock > 0 ? "available" : "unavailable",
      createdAt: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw new Error("خطایی در اضافه کردن محصول جدید رخ داد.");
  return data;
};

export const removeProduct = async (id) => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error("خطایی در حذف کردن محصول رخ داد.");
};

export const editProduct = async ({ id, ...productData }) => {
  const { data, error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error("خطایی در ویرایش محصول رخ داد.");
  return data;
};
