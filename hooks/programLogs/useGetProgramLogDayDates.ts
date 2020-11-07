import { useState, useMemo } from "react";
import { IProgramLogWeek } from "../../interfaces/programLogs/index";
import moment from "moment";

const useGetProgramLogDayDates = (programLogWeek: IProgramLogWeek) => {
  const [programDayDates, setProgramDayDates] = useState<Date[]>([]);

  useMemo(() => {
    let dates = [] as Date[];
    programLogWeek.programLogDays.map((x) =>
      dates.push(moment(x.date).toDate())
    );
    setProgramDayDates(dates);
  }, []);

  return programDayDates;
};

export default useGetProgramLogDayDates;
