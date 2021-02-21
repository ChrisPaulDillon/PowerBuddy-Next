import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { Calendar, CustomDayClassNameItem, Day, DayValue } from 'react-modern-calendar-datepicker';
import moment from 'moment';

interface IProps {
  selectedDate: Date;
  setSelectedDate: any;
  workoutDates: Array<Date>;
}

const ParseDateToDayValue = (date: Date): DayValue => {
  return { year: parseInt(moment(date).format('yyyy')), month: parseInt(moment(date).format('M')), day: parseInt(moment(date).format('D')) };
};

const ParseDateToCustomDay = (date: Date, className: string): CustomDayClassNameItem => {
  return {
    year: parseInt(moment(date).format('yyyy')),
    month: parseInt(moment(date).format('M')),
    day: parseInt(moment(date).format('D')),
    className: className,
  };
};

enum DayColourEnum {
  purpleDay,
  orangeDay,
  yellowDay,
  navyBlueDay,
}

const ModernCalendar: React.FC<IProps> = ({ selectedDate, setSelectedDate, workoutDates }) => {
  //const [selectedDay, setSelectedDay] = useState(null);
  const [calendarDate, setCalendarDate] = useState<DayValue>(ParseDateToDayValue(new Date()));

  const [disabledDates, setDisabledDates] = useState<Day[]>([]);
  const [colouredDates, setColouredDates] = useState<CustomDayClassNameItem[]>([]);

  const test = DayColourEnum.navyBlueDay;
  console.log(test);

  useEffect(() => {
    if (workoutDates) {
      setDisabledDates(
        workoutDates.map((x) => {
          return ParseDateToDayValue(x);
        })
      );

      setColouredDates(
        workoutDates.map((x) => {
          return ParseDateToCustomDay(x, 'purpleDay');
        })
      );
    }
  }, [workoutDates]);

  useEffect(() => {
    if (calendarDate) {
      const calDate = `${calendarDate.month}/${calendarDate.day}/${calendarDate.year}`;
      const momentDate = moment(calDate).toDate();
      setSelectedDate(momentDate);
    }
  }, [calendarDate]);

  const handleDisabledSelect = (disabledDay) => {
    //onsole.log('Tried selecting a disabled day', disabledDay);
  };

  return (
    <Calendar
      value={calendarDate}
      onChange={setCalendarDate}
      disabledDays={disabledDates}
      onDisabledDayError={handleDisabledSelect}
      // customDaysClassName={colouredDates}
      calendarClassName="ModernCalendar"
      customDaysClassName={colouredDates}
    />
  ); // handle errorshouldHighlightWeekends
};

export default ModernCalendar;
