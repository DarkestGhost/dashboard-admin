import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().nonempty("نام دسته‌بندی الزامی است."),
  slug: z
    .string()
    .nonempty("شناسه دسته‌بندی الزامی است.")
    .regex(
      /^[a-z0-9-]+$/,
      "شناسه فقط باید شامل حروف کوچک انگلیسی، اعداد و خط تیره باشد.",
    ),
});

export type CategorySchema = z.infer<typeof categorySchema>;
