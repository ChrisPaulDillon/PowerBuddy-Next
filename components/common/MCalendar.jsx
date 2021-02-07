import clsx from 'clsx';
import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, IconButton, makeStyles, ThemeProvider } from '@material-ui/core';
import moment from 'moment';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import isWithinInterval from 'date-fns/isWithinInterval';
import DateFnsUtils from '@date-io/date-fns';
import chakraTheme, { getColor } from '../../theme';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { lightBlue } from '@material-ui/core/colors';
import { AiOutlineArrowLeft} from 'react-icons/all';

const materialTheme = createMuiTheme({
  overrides: {
    // MuiPickersToolbar: {
    //   toolbar: {
    //     backgroundColor: lightBlue.A200,
    //   },
    // },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersBasePicker:{
      pickerView:{
          backgroundColor: "red",
      },
  },
    MuiPickersDay: {
      day: {
        color: lightBlue.A700,
      },
      daySelected: {
        backgroundColor: lightBlue['400'],
      },
      dayDisabled: {
        color: lightBlue['100'],
      },
      current: {
        color: lightBlue['900'],
      },
    },
    MuiPickersModal: {
    },
  },
});

const MCalendar = ({selectedDate, handleDateChange}) => {
  // const [selectedDate, handleDateChange] = useState(new Date());
  const { colorMode } = useColorMode();
  materialTheme.overrides.MuiPickersBasePicker.pickerView.backgroundColor = getColor(chakraTheme.colors.calendar[colorMode]);

  const useStyles = makeStyles((theme) => ({
    dayWrapper: {
      position: 'relative',
    },
    day: {
      width: 36,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: '0 2px',
      color: getColor(chakraTheme.colors.calendarText[colorMode]),
    },
    customDayHighlight: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '2px',
      right: '2px',
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: '50%',
    },
    nonCurrentMonthDay: {
      color: getColor(chakraTheme.colors.calendarTextNonMonth[colorMode]),
    },
    highlightNonCurrentMonthDay: {
      color: '#676767',
    },
    highlight: {
      background: theme.palette.primary.main,
      color: getColor(chakraTheme.colors.calendarTextNonMonth[colorMode])
    },
    firstHighlight: {
      extend: 'highlight',
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    },
    endHighlight: {
      extend: 'highlight',
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    },
  }));

  const classes = useStyles();

  const handleWeekChange = (date) => {
    handleDateChange((date));
  };

  const formatWeekSelectLabel = (date) => {
    return date ? `Week of ${moment(date).startOf('week').format('dddd Do MMM')}` : 'Invalid Date';
  };

  const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(date, 'd')}</span>
        </IconButton>
      </div>
    );
  };

  return (
    <ThemeProvider theme={materialTheme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        value={selectedDate}
        onChange={handleWeekChange}
        renderDay={renderWrappedWeekDay}
        labelFunc={formatWeekSelectLabel}
        autoOk={true}
      />
    </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default MCalendar;
