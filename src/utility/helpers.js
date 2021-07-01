import { DateObject } from 'react-multi-date-picker';

export const getTomorrowsDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow;
};

export const getTimeInfoList = () => {
  const timeList = [];

  for (let hours = 0; hours <= 23; hours++) {
    for (let minutes = 0; minutes <= 45; minutes = minutes + 15) {
      let hoursStr = hours < 10 ? `0${hours}` : hours;
      let minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      timeList.push({
        id: `${hoursStr}${minutesStr}`,
        hours: hoursStr,
        minutes: minutesStr,
      });
    }
  }

  return timeList;
};

export const formatDateToFullStr = (date) => {
  try {
    const dateObj = new DateObject(new Date(date));
    const formatedStr = dateObj.format('dddd, DD/MM/YYYY');
    return formatedStr;
  } catch {
    return date;
  }
};

export const formatDateToTimeStr = (date) => {
  try {
    const dateObj = new DateObject(new Date(date));
    const formatedStr = dateObj.format('HH:mm a');
    return formatedStr;
  } catch {
    return date;
  }
};

export const getUserTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const formatDate = (str) => {
  const date = new Date(str);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-IN', options).format(date);
};

export const formatTime = (
  str,
  options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
) => {
  const date = new Date(str);

  return new Intl.DateTimeFormat('en-IN', options).format(date);
};
