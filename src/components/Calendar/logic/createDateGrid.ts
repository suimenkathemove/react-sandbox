import { range } from "../../../utils/range";

export const createDateGrid = (year: number, month: number): Date[][] => {
  const currentMonthFirstDate = new Date(year, month);
  const currentMonthLastDate = new Date(year, month + 1, 0);

  const currentMonthDates: Date[] = range(
    1,
    currentMonthLastDate.getDate() + 1
  ).map((day) => new Date(year, month, day));

  const prevMonthLastDate = new Date(year, month, 0);
  const prevMonthDates: Date[] = range(
    prevMonthLastDate.getDate() - currentMonthFirstDate.getDay() + 1,
    prevMonthLastDate.getDate() + 1
  ).map(
    (day) =>
      new Date(
        prevMonthLastDate.getFullYear(),
        prevMonthLastDate.getMonth(),
        day
      )
  );

  const nextMonthFirstDate: Date = (() => {
    const date = new Date(currentMonthLastDate);
    date.setDate(currentMonthLastDate.getDate() + 1);
    return date;
  })();
  const nextMonthDates: Date[] = range(
    1,
    6 - currentMonthLastDate.getDay() + 1
  ).map(
    (day) =>
      new Date(
        nextMonthFirstDate.getFullYear(),
        nextMonthFirstDate.getMonth(),
        day
      )
  );

  const dates = [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
  return range(dates.length / 7).map((i) => dates.slice(i * 7, i * 7 + 7));
};
