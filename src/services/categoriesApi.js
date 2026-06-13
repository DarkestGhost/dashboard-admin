import { supabase } from "./supabase";

export const fetchCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw new Error("خطایی در دریافت دسته بندی ها رخ داد.");
  return data;
};

export const fetchcategoriy = async (id) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error("خطایی در دریافت دسته بندی رخ داد.");
  return data;
};

export const addNewCategoriy = async (categoryData) => {
  const { data, error } = await supabase
    .from("categories")
    .insert({
      ...categoryData,
      createdAt: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw new Error("خطایی در اضافه کردن دسته بندی جدید رخ داد.");
  return data;
};

export const removeCategory = async (id) => {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error("خطایی در حذف کردن دسته بندی رخ داد.");
};

export const editCategory = async ({ id, ...categoryData }) => {
  const { data, error } = await supabase
    .from("categories")
    .update(categoryData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error("خطایی در ویرایش دسته بندی رخ داد.");
  return data;
};
