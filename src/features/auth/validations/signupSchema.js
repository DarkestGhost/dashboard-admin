import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .nonempty("نام و نام خانوادگی الزامی است.")
      .min(3, "حداقل 3 کاراکتر وارد کنید.")
      .max(50, "حداکثر 50 کاراکتر وارد کنید.")
      .regex(/^[آ-ی\s]+$/, "فقط حروف فارسی مجاز است."),
    email: z.string().nonempty("ایمیل الزامی است.").email("ایمیل معتبر نیست."),
    password: z
      .string()
      .nonempty("رمز عبور الزامی است.")
      .min(6, "رمز عبور حداقل باید 6 کاراکتر داشته باشد.")
      .regex(/[A-Z]/, "حداقل یک حرف بزرگ لازم است.")
      .regex(/[a-z]/, "حداقل یک حرف کوچک لازم است.")
      .regex(/[0-9]/, "حداقل یک عدد لازم است.")
      .regex(/[!@#$%^&*]/, "حداقل یک کاراکتر خاص بازم است."),
    confirmPassword: z.string().nonempty("تکرار رمز عبور الزامی است."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "تکرار رمز عبور با رمز عبور برابر نیست.",
    path: ["confirmPassword"],
  });
