import { useState, useEffect } from 'react';
import { ILiftingStat } from 'powerbuddy-shared';

const useLiftingStatSearch = (stats: ILiftingStat[], searchTerm: string) => {
  const [filteredStats, setFilteredStats] = useState<ILiftingStat[]>(stats!);

  useEffect(() => {
  setFilteredStats(stats!.filter((stat) => stat!.exerciseName!.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, stats]);
  return filteredStats;
};

export default useLiftingStatSearch;
