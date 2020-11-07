import { useState, useEffect } from "react";

export const useShuffleArray = (arr: any) => {
  const [randomVal, setRandomVal] = useState<Object>({});

  useEffect(() => {
    setRandomVal(
      arr
        .map((a: any) => [Math.random(), a])
        .sort((a: any, b: any) => a[0] - b[0])
        .map((a: any) => a[1])[0]
    );
  }, []);

  return randomVal;
};
