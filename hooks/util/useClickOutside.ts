import { useEffect } from "react";

const useClickOutside = (ref: any, callback: any) => {
  useEffect(() => {
    const handleClickOutside = (e: { target: any }) => {
      if (ref?.current?.contains(e.target) && callback) callback(e);
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [callback, ref]);
};

export default useClickOutside;
