const BASE_URL = "http://localhost:3001";

export const fetchOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders`);

  if (!response.ok) throw new Error("خطایی در دریافت سفارشات رخ داد.");

  return response.json();
};

export const fetchOrder = async (id) => {
  const response = await fetch(`${BASE_URL}/orders/${id}`);

  if (!response.ok) throw new Error("خطایی در دریافت سفارش رخ داد.");

  return response.json();
};

export const editOrder = async ({ id, ...productData }) => {  
  const response = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) throw new Error("خطایی در ویرایش سفارش رخ داد.");

  return response.json();
};
