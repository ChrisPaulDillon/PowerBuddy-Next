import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { Calendar, Day, DayValue } from 'react-modern-calendar-datepicker';
import moment from 'moment';
import './ModernCalendar';

interface IProps {
  calendarDate: DayValue;
  setCalendarDate: any;
  workoutDates: Array<Date>;
}

const ModernCalendar: React.FC<IProps> = ({ calendarDate, setCalendarDate, workoutDates }) => {
  //const [selectedDay, setSelectedDay] = useState(null);
  const [disabledDates, setDisabledDates] = useState<Day[]>([]);

  useEffect(() => {
    if (workoutDates) {
      setDisabledDates(
        workoutDates.map((x) => ({
          year: parseInt(moment(x).format('yyyy')),
          month: parseInt(moment(x).format('M')),
          day: parseInt(moment(x).format('D')),
        }))
      );
    }
  }, [workoutDates]);

  const handleDisabledSelect = (disabledDay) => {
    console.log('Tried selecting a disabled day', disabledDay);
  };

  return <Calendar value={calendarDate} onChange={setCalendarDate} disabledDays={disabledDates} onDisabledDayError={handleDisabledSelect} />; // handle errorshouldHighlightWeekends
};

export default ModernCalendar;
