import axios from 'axios';
import { useState, useEffect, } from "react";

export function useAxios<T>(uri: string) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState();
  const [statusCode, setStatusCode] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uri) return;
    setLoading(true);
    axios.get(uri)
      .then((response) => setData(response.data))
      .catch(function (error) { if(error.response) setStatusCode(error.response.status); setError(error); })
      .then(() => setLoading(false))
  }, [uri]);

  return {
    loading,
    data,
    error,
    statusCode
  };
}
