import { useUserContext } from './../components/users/UserContext';
import axios from 'axios';
import { useState, useEffect, } from "react";

export function useAxios<T>(uri: string) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState();
  const [statusCode, setStatusCode] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (!uri) return;
    setLoading(true);
    axios.get(uri)
      .then((response) => setData(response.data))
      .catch(function (error) { if(error.response) setStatusCode(error.response.status); setError(error); })
      .then(() => setLoading(false))
  }, [uri, user]);

  return {
    loading,
    data,
    error,
    statusCode
  };
}
