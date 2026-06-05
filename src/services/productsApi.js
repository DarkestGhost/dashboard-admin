const BASE_URL = "http://localhost:3001";

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) throw new Error("خطایی در دریافت محصولات رخ داد.");

  return response.json();
};

export const fetchProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) throw new Error("خطایی در دریافت محصول رخ داد.");

  return response.json();
};

export const addNewProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...productData,
      status: productData.stock > 0 ? "available" : "unavailable",
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) throw new Error("خطایی در اضافه کردن محصول جدید رخ داد.");

  return response.json();
};

export const removeProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("خطایی در حذف کردن محصول رخ داد.");

  return response.json();
};

export const editProduct = async ({ id, ...productData }) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) throw new Error("خطایی در ویرایش محصول رخ داد.");

  return response.json();
};
