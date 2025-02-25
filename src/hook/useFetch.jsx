import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetch(url, method = "GET", postData = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (method !== "GET" && postData) {
      setOptions({
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
    }
  }, [method, postData]);

  useEffect(() => {
    const fetchData = async (reqOptions) => {
      setIsPending(true);
      try {
        const response = await fetch(url, reqOptions);
        if (!response.ok) {
          throw new Error("Xatolik yuz berdi ");
        }
        const result = await response.json();
        setData(result);
        toast.success("A'lo darajada");
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setIsPending(false);
      }
    };

    if (method === "GET") {
      fetchData();
    } else if (options) {
      fetchData(options);
    }
  }, [url, method, options]);

  return { data, error, isPending };
}
