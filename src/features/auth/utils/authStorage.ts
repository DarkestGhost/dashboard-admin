export const setAuthToken = (token: string): void => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

export const removeAuthtoken = (): void => {
  localStorage.removeItem("token");
};
