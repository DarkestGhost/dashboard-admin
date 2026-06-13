const BASE_URL = "http://localhost:3001";

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`);
  const users = await response.json();

  const userExist = users.find((user) => user.email === userData.email);

  if (userExist) {
    throw new Error("ایمیل قبلا ثبت شده است.");
  }

  const newUser = {
    ...userData,
    role: "staff",
    accessToken: crypto.randomUUID(),
  };

  const registerResponse = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  const data = await registerResponse.json();

  if (!registerResponse.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`);
  const users = await response.json();

  const founderUser = users.find(
    (user) =>
      user.email === userData.email && user.password === userData.password,
  );

  if (!founderUser) {
    throw new Error("ایمیل یا رمز عبور اشتباه است");
  }

  return founderUser;
};
