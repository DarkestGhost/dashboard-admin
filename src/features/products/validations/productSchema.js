import { z } from "zod";

export const productSchema = z.object({
  name: z.string().nonempty("نام محصول الزامی است."),
  price: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({
        message: "قیمت محصول الزامی است.",
      })
      .min(0, "قیمت محصول نمیتواند منفی باشد."),
  ),
  stock: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({
        message: "موجودی محصول الزامی است.",
      })
      .min(0, "موجودی محصول نمیتواند منفی باشد."),
  ),
  category: z.string().nonempty("دسته بندی محصول الزامی است."),
});
