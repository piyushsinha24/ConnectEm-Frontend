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
