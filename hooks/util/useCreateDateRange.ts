import { useState, useMemo } from "react";
import moment from "moment";

const useCreateDateRange = (
  dateStart: Date,
  addDates: boolean,
  range: number
) => {
  const [excludedDates, setExcludedDates] = useState<Date[]>([]);

  useMemo(() => {
    let dates = [] as Date[];
    for (let i = 0; i < range; i++) {
      if (addDates) {
        let createdDate = moment(dateStart).add(i, "days").toDate();
        dates.push(createdDate);
      } else {
        let createdDate = moment(dateStart).subtract(i, "days").toDate();
        dates.push(createdDate);
      }
    }
    setExcludedDates(dates);
  }, []);

  return excludedDates;
};

export default useCreateDateRange;
