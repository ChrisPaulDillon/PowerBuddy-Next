import React from 'react';
import { TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import moment from 'moment';
import ModernCalendar from '../../common/ModernCalendar';
import { DayValue } from 'react-modern-calendar-datepicker';
import { Flex } from '../../../chakra/Layout';

interface IProps {
  selectedDate: Date;
  setSelectedDate: any;
  workoutDates?: Array<Date>;
  proposedWorkoutDates?: Array<Date>;
}

const CalendarSelectFrom: React.FC<IProps> = ({ selectedDate, setSelectedDate, workoutDates, proposedWorkoutDates }) => {
  return (
    <Flex align="center" flexDir="column">
      <ModernCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        workoutDates={workoutDates}
        proposedWorkoutDates={proposedWorkoutDates}
      />
      <TextXs mt="2">You have selected {moment(selectedDate).format('MMM Do YY')} as your start date</TextXs>
    </Flex>
  );
};

export default CalendarSelectFrom;
