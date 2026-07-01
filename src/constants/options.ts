interface Sort {
  slug: string;
  name: string;
}

interface StatusOrder {
  slug: string;
  name: string;
  color: string;
}

export const sortProductsOptions: Sort[] = [
  { slug: "newest", name: "جدیدترین" },
  { slug: "oldest", name: "قدیمی‌ترین" },
  { slug: "mostExpensive", name: "گران‌ترین" },
  { slug: "cheapest", name: "ارزان‌ترین" },
  { slug: "maxInventory", name: "بیشترین موجودی" },
  { slug: "minInventory", name: "کمترین موجودی" },
];

export const sortCategoriesOptions: Sort[] = [
  { slug: "newest", name: "جدیدترین" },
  { slug: "oldest", name: "قدیمی‌ترین" },
  { slug: "nameAsc", name: "نام (الف تا ی)" },
  { slug: "nameDesc", name: "نام (ی تا الف)" },
];

export const sortOrdersOptions: Sort[] = [
  { slug: "newest", name: "جدیدترین" },
  { slug: "oldest", name: "قدیمی‌ترین" },
  { slug: "mostExpensive", name: "بیشترین مبلغ" },
  { slug: "cheapest", name: "کمترین مبلغ" },
  { slug: "nameAsc", name: "نام (الف تا ی)" },
  { slug: "nameDesc", name: "نام (ی تا الف)" },
];

export const statusOrderOptions: StatusOrder[] = [
  {
    slug: "pending",
    name: "در انتظار",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    slug: "processing",
    name: "در حال پردازش",
    color: "bg-blue-100 text-blue-600",
  },
  {
    slug: "completed",
    name: "تکمیل شده",
    color: "bg-green-100 text-green-600",
  },
  { slug: "cancelled", name: "لغو شده", color: "bg-red-100 text-red-600" },
];
