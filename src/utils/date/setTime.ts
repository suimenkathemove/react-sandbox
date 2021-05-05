export const setTime = (date: Date, hours: number, minutes: number) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    date.getSeconds(),
    date.getMilliseconds(),
  );
