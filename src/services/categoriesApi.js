const BASE_URL = "http://localhost:3001";

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) throw new Error("خطایی در دریافت دسته بندی ها رخ داد.");

  return response.json();
};

export const fetchcategoriy = async (id) => {
  const response = await fetch(`${BASE_URL}/categories/${id}`);

  if (!response.ok) throw new Error("خطایی در دریافت دسته بندی رخ داد.");

  return response.json();
};

export const addNewCategoriy = async (categoryData) => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...categoryData,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok)
    throw new Error("خطایی در اضافه کردن دسته بندی جدید رخ داد.");

  return response.json();
};

export const removeCategory = async (id) => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("خطایی در حذف کردن دسته بندی رخ داد.");

  return response.json();
};

export const editCategory = async ({ id, ...categoriyData }) => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoriyData),
  });

  if (!response.ok) throw new Error("خطایی در ویرایش دسته بندی رخ داد.");

  return response.json();
};
