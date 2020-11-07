import { useEffect, useState } from "react";

const useGetIdFromUrl = (location: any) => {
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (location != null) {
      var index = location.pathname.lastIndexOf("/");
      setId(location.pathname.substring(index + 1));
    }
  }, [location]);
  return id;
};

export default useGetIdFromUrl;
