import { supabase } from "./supabase";
import type { RegisterDataProps, LoginDataProps } from "@/types/auth";

export const registerUser = async (userData: RegisterDataProps) => {
  const { ...dataToSave } = userData;

  const { data: users, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("email", dataToSave.email);

  if (fetchError) throw new Error("خطایی رخ داد.");
  if (users.length > 0) throw new Error("ایمیل قبلا ثبت شده است.");

  const newUser = {
    ...dataToSave,
    role: "staff",
    accessToken: crypto.randomUUID(),
  };

  const { data, error } = await supabase
    .from("users")
    .insert(newUser)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const loginUser = async (userData: LoginDataProps) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", userData.email)
    .eq("password", userData.password);

  if (error) throw new Error("خطایی رخ داد.");

  if (!users || users.length === 0)
    throw new Error("ایمیل یا رمز عبور اشتباه است");

  return users[0];
};
