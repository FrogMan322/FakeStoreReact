import { useEffect, useState, useCallback } from "react";
function useHttp(api) {
  const [curData, setCurData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(false);
      setError(null);
      const endpoint = await fetch(api);
      if (!endpoint.ok) {
        throw new Error("FAILD TO LOAD PRODUCTS TRY LATER");
      }
      const data = await endpoint.json();
      setCurData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(true);
  }, [api]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { error, items: curData, isLoading };
}

export default useHttp;
