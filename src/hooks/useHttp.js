import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: config.method || "GET",
        headers: { "Content-Type": "application/json" },
        body:
          config.method !== "GET" && config.method !== "DELETE"
            ? JSON.stringify(config.body)
            : null,
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "درخواست با خطا مواجه شد");
      }

      return resData;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, sendRequest };
};
