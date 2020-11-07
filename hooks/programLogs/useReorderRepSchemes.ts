import { useEffect, useState } from 'react';
import { IProgramLogRepScheme } from '../../interfaces/programLogs/index';

const useReorderRepSchemes = (programLogRepSchemes: IProgramLogRepScheme[]) => {
  const [sortedRepSchemes, setSortedRepSchemes] = useState<IProgramLogRepScheme[]>(programLogRepSchemes);

  useEffect(() => {
    setSortedRepSchemes([...programLogRepSchemes].sort((a, b) => a.setNo! - b.setNo!));
  }, [programLogRepSchemes]);
  return sortedRepSchemes;
};

export default useReorderRepSchemes;
