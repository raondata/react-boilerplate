import dayjs, { ManipulateType } from 'dayjs';

export const formatDateString = (
  date?: Date | undefined,
  format?: 'DTTM' | 'D-T' | 'DT' | 'DT TM'
) => {
  if (date) {
    return dayjs(date).format(
      (format === 'DTTM' && 'YYYY-MM-DDTHH:mm:ss') ||
        (format === 'DT TM' && 'YYYY-MM-DD HH:mm:ss') ||
        (format === 'D-T' && 'YYYY-MM-DD') ||
        'YYYYMMDD'
    );
  }
  return null;
};

export const dayAgo = (date: Date, val: number, unit?: ManipulateType) => {
  const ago = dayjs(date)
    .startOf('day')
    .add(val * -1, unit || 'day');

  return ago.toDate();
};

export const isSame = (date1: Date, date2: Date, unit?: ManipulateType) => {
  return dayjs(date1).isSame(date2, unit || 'day');
};

export function getTimeArray(startDate: Date, endDate: Date): string[] {
  const timeArray = [];

  const startHour = startDate.getHours();
  const cv =
    dayjs(endDate).startOf('day').diff(dayjs(startDate).startOf('day'), 'day') *
    24; // cv: correctionValue
  const endHour = endDate.getHours() + cv;

  let tmp = 0;
  const cur = new Date(startDate);

  for (let hour = startHour; hour <= endHour; hour++) {
    const t = hour % 24; // t: time
    if (t === 0 && hour !== startHour) {
      // 날이 바뀐것으로 간주.
      tmp++;
      cur.setDate(startDate.getDate() + tmp);
    }
    const tStr = t < 10 ? `0${t}` : `${t}`; // tStr: timeString
    timeArray.push(`${formatDateString(cur, 'D-T')} ${tStr}`);
  }
  return timeArray;
}

export function getDatesArray(
  startDate: Date,
  endDate: Date,
  removeHoliday?: boolean
): string[] {
  const datesArray: string[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    if (
      removeHoliday !== true ||
      !(currentDate.getDay() === 0 || currentDate.getDay() === 6)
    ) {
      datesArray.push(dayjs(new Date(currentDate)).format('YYYY-MM-DD'));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return datesArray;
}

export const getWeeksArray = (startDate: Date, endDate: Date) => {
  const result: string[] = [];

  let current = dayjs(startDate).startOf('week').startOf('day');

  // 마지막 주는 endDate를 넘어가도 그 주의 토요일까지 포함
  const lastWeekEnd = dayjs(endDate).startOf('week').add(6, 'day');

  while (current.isBefore(lastWeekEnd) || current.isSame(lastWeekEnd, 'day')) {
    const weekStart = current;
    const weekEnd = current.add(6, 'day');

    const weekRange = `${formatDateString(
      weekStart.toDate()
    )}-${formatDateString(weekEnd.toDate())}`;
    result.push(weekRange);

    current = current.add(7, 'day');
  }

  return result;
};

export const getMonthsArray = (
  startDate: Date,
  endDate: Date,
  zero?: boolean
): string[] => {
  const monthsArray = [];
  const currentDate = new Date(startDate);

  while (
    dayjs(currentDate).isBefore(dayjs(endDate), 'month') ||
    dayjs(currentDate).isSame(dayjs(endDate), 'month')
  ) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const monthYearString = `${year.toString()}-${
      zero === true && month < 10
        ? `0${month.toString()}`
        : `${month.toString()}`
    }`;
    monthsArray.push(monthYearString);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return monthsArray;
};

const stringToDate = (yyyymmdd: string) => {
  const year = parseInt(yyyymmdd.slice(0, 4), 10);
  const month = parseInt(yyyymmdd.slice(4, 6), 10) - 1; // JS는 0-based month
  const day = parseInt(yyyymmdd.slice(6, 8), 10);

  const date = new Date(year, month, day);

  return date;
};

const isValidDate = (year: number, month: number, date: number) => {
  const dd = new Date(year, month - 1, date); // JS는 0-based month
  return (
    dd.getFullYear() === year &&
    dd.getMonth() === month - 1 &&
    dd.getDate() === date
  );
};

export const getTimeUnit = (startDate: Date, endDate: Date) => {
  const startDayjs = dayjs(startDate).startOf('day');
  const endDayjs = dayjs(endDate).endOf('day');

  if (endDate.getTime() - startDate.getTime() < 86400000) {
    return 'time';
  } else if (endDayjs.diff(startDayjs, 'day') < 14) {
    return 'day';
  } else if (endDayjs.diff(startDayjs, 'week') < 10) {
    return 'week';
  } else {
    return 'month';
  }
};

export default {
  formatDateString,
  dayAgo,
  isSame,
  getTimeArray,
  getDatesArray,
  getWeeksArray,
  getMonthsArray,
  stringToDate,
  isValidDate,
  today: dayjs(new Date()).startOf('day').toDate(),
  yesterday: dayAgo(new Date(), 1),
  getTimeUnit,
};
