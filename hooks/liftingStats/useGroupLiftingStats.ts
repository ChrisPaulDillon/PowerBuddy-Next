import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ILiftingStat } from '../../interfaces/liftingStats';
import useAuthentication from '../useAuthentication';

const useGroupLiftingStats = (liftingStats: ILiftingStat[]) => {
  const [statsGrouped, setStatsGrouped] = useState();
  const isAuthenticated = useAuthentication();

  useEffect(() => {
    if (liftingStats.length > 0 && isAuthenticated) {
      setStatsGrouped(
        liftingStats.reduce((acc: any, curr: any) => {
          if (!acc[curr.exerciseId]) acc[curr.exerciseId] = []; //If this type wasn't previously stored
          acc[curr.exerciseId].push(curr);
          return acc;
        }, {} as ILiftingStat)
      );
    }
  }, [isAuthenticated, liftingStats]);

  return Object.values(statsGrouped ?? {});
};

export default useGroupLiftingStats;
