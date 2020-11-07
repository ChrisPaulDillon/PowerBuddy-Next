import { useState, useEffect } from "react";

const useDelayedRender = (delay: number) => {
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delay);
    console.log(timeout);

    return () => clearTimeout(timeout);
  }, []);
  return (fn: () => any) => !delayed && fn();
};

export default useDelayedRender;
