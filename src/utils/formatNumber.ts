export const formatNumber = (value: number) => {
  return value.toLocaleString("fa-IR");
};

export const formatPrice = (value: number) => {
  return `${value.toLocaleString("fa-IR")} تومان`;
};
