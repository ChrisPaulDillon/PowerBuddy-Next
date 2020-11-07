import React, { useState } from 'react';
import { DatePickerFixed } from '../../common/DatePickerFixed';
import { Box } from '@chakra-ui/core';
import { HeadingMd, HeadingSm, TextSm, TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import moment from 'moment';

interface IProps {
  selectedDate: Date;
  setSelectedDate: any;
}

const CalendarSelectFrom: React.FC<IProps> = ({ selectedDate, setSelectedDate }) => {
  return (
    <CenterColumnFlex>
      <DatePickerFixed startDate={selectedDate} changeDate={(date: Date) => setSelectedDate(date)} />
      <TextXs mt="2">You have selected {moment(selectedDate).format('MMM Do YY')} as your start date</TextXs>
    </CenterColumnFlex>
  );
};

export default CalendarSelectFrom;
