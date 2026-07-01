import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("ایمیل الزامی است.").email("ایمیل معتبر نیست."),
  password: z
    .string()
    .nonempty("رمز عبور الزامی است.")
    .min(6, "رمز عبور حداقل باید 6 کاراکتر داشته باشد.")
    .regex(/[A-Z]/, "حداقل یک حرف بزرگ لازم است.")
    .regex(/[a-z]/, "حداقل یک حرف کوچک لازم است.")
    .regex(/[0-9]/, "حداقل یک عدد لازم است.")
    .regex(/[!@#$%^&*]/, "حداقل یک کاراکتر خاص بازم است."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
