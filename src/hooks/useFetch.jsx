import { useState, useEffect } from "react";

const useFetch = (url, initialData = null) => {
  const hasInitialData = initialData !== null;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!hasInitialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(!hasInitialData);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        if (!hasInitialData) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, hasInitialData]);

  return { data, loading, error };
};

export default useFetch;
