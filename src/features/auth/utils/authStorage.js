export const setAuthToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

export const removeAuthtoken = () => {
  localStorage.removeItem("token");
};
