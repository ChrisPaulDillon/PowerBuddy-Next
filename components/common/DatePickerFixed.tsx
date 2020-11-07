//@ts-nocheck
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCreateDateRange from '../../hooks/util/useCreateDateRange';

export const DatePickerFixed = ({ startDate, changeDate }) => {
  return <DatePicker selected={startDate} onChange={(date) => changeDate(date)} inline />;
};

export const DatePickerFixedExcludeDays = ({ startDate, setStartDate, weekStart, weekEnd, highlightDates }) => {
  const beforeWeekDates = useCreateDateRange(weekStart, false, 50);
  const afterWeekDates = useCreateDateRange(weekEnd, true, 50);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      excludeDates={[...beforeWeekDates, ...afterWeekDates, ...highlightDates]}
      highlightDates={[...highlightDates]}
      inline
    />
  );
};
