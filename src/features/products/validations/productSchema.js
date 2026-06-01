import { z } from "zod";

export const productSchema = z.object({
  name: z.string().nonempty("نام محصول الزامی است."),
  price: z.coerce
    .string()
    .nonempty("قیمت محصول الزامی است.")
    .refine((val) => Number(val) >= 0, {
      message: "قیمت محصول نمیتواند منفی باشد.",
    }),
  stock: z.coerce
    .string()
    .nonempty("موجودی محصول الزامی است.")
    .refine((val) => Number(val) >= 0, {
      message: "موجودی محصول نمیتواند منفی باشد.",
    }),
  category: z.string().nonempty("دسته بندی محصول الزامی است."),
});
