import moment from 'moment';
import { Strings } from '../resource';
import { DateConstants } from './dateConstants';

/**
 * Returns the input date in the format of 'MMM DD'
 * @param {*} dateString
 * @param {*} dateFormat
 */
const getFormattedDate = (dateString, dateFormat) =>
  moment(dateString).format(dateFormat);

/**
 * Returns the input time stamp date in the format of dateFormat
 * @param {*} timestamp
 * @param {*} dateFormat
 */
// eslint-disable-next-line max-len
const getFormattedDateFromTimestamp = (timestamp, dateFormat) =>
  moment(new Date(timestamp)).format(dateFormat);

/**
 * method returns the tme as minutes, hours and standard time
 * @param { datestring to be formatted } datestring
 * @param { type of the date string being passed } dateType
 * @param { Format of the standard time} dateFormat
 */
const displayTime = (datestring, dateType, dateFormat) => {
  const startTime = moment(datestring);
  const endTime = moment();
  const hours = endTime.diff(startTime, 'hours');
  const minutes = endTime.diff(startTime, 'minutes');

  if (hours === 0) {
    // eslint-disable-next-line radix
    if (parseInt(minutes) < 1) {
      return Strings.notificationMessages.MSG_JUST_NOW;
    }
    return minutes + Strings.notificationMessages.MSG_MINUTES_AGO;
  }
  if (hours < 24) {
    return hours + Strings.notificationMessages.MSG_HOURS_AGO;
  }
  if (dateType === DateConstants.DATE_TYPE_TIMESTAMP) {
    return getFormattedDateFromTimestamp(datestring, dateFormat);
  }
  return getFormattedDate(datestring, dateFormat);
};

/**
 * Get tomorrow's date
 * */
const getTomorrowsDate = () => {
  let minimumDate = new Date();
  minimumDate = moment(minimumDate)
    .add(1, 'days')
    .format(DateConstants.DATE_TYPE_YYYY_MM_DD);
  return minimumDate;
};

/**
 * Function which acccepts total seconds and converts to minutes
 */
const convertSecondstoTime = (totalSeconds) => {
  const givenSeconds = totalSeconds;

  const dateObj = new Date(givenSeconds * 1000);
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();

  const timeString = `${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return timeString;
};

export const DateUtils = {
  displayTime,
  getFormattedDate,
  getFormattedDateFromTimestamp,
  convertSecondstoTime,
  getTomorrowsDate,
};
