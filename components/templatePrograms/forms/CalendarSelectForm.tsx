import React from 'react';
import { TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import moment from 'moment';
import ModernCalendar from '../../common/ModernCalendar';
import { DayValue } from 'react-modern-calendar-datepicker';

interface IProps {
  selectedDate: Date | undefined;
  calendarDate: DayValue | undefined;
  setCalendarDate: any;
  workoutDates?: Array<Date>;
}

const CalendarSelectFrom: React.FC<IProps> = ({ selectedDate, calendarDate, setCalendarDate, workoutDates }) => {
  return (
    <CenterColumnFlex>
      <ModernCalendar calendarDate={calendarDate} setCalendarDate={setCalendarDate} workoutDates={workoutDates} />
      <TextXs mt="2">You have selected {moment(selectedDate).format('MMM Do YY')} as your start date</TextXs>
    </CenterColumnFlex>
  );
};

export default CalendarSelectFrom;
