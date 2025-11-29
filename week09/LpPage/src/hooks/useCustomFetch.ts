import { useState, useEffect } from "react";
import axios from "axios";

export function useCustomFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
        });
        if (!cancel) setData(response.data);
      } catch {
        setError("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      cancel = true;
    };
  }, [url]);

  return { data, isLoading, error };
}
