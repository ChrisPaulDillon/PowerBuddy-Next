//@ts-nocheck
import moment from 'moment';

Date.prototype.subtractDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

export const formatDate = (date: Date) => {
  let curDate = new Date();
  if (moment(date).isSame(curDate, 'day')) {
    return "Today";
  }
  else if (moment(date).isBefore(curDate.subtractDays(7))) {
    return moment(date).format('DD/MM/yyyy');
  } else {
    return moment(date).format('dddd');
  }
};
