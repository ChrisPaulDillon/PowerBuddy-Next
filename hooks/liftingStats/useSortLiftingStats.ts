import { useEffect, useState } from "react";
import { ILiftingStat } from "../../interfaces/liftingStats";
import useAuthentication from "../useAuthentication";

const useSortLiftingStat = (liftingStats: ILiftingStat[]) => {
  const [sortedStats, setSortedStats] = useState<ILiftingStat[]>(liftingStats);
  const isAuthenticated = useAuthentication();

  useEffect(() => {
    setSortedStats([...liftingStats].sort((a, b) => a.repRange - b.repRange));
  }, [isAuthenticated, liftingStats]);

  return sortedStats;
};

export default useSortLiftingStat;
