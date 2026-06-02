const BASE_URL = "http://localhost:3001";

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("خطایی در دریافت محصولات رخ داد.");
  }

  const data = await response.json();

  return data;
};

export const addNewProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...productData,
      status: productData.stock > 0 ? "available" : "unavailable",
    }),
  });

  if (!response.ok) {
    throw new Error("خطایی در اضافه کردن محصول جدید رخ داد.");
  }

  const data = await response.json();

  return data;
};

export const removeProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("خطایی در حذف کردن محصول رخ داد.");
  }

  const data = await response.json();

  return data;
};

export const editProduct = async ({ id, ...productData }) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("خطایی در ویرایش محصول رخ داد.");
  }

  const data = await response.json();

  return data;
};
