import { DateRange } from '@/types/date';
import { addDate } from '@/utils/date/addDate';
import { dateStart } from '@/utils/date/dateStart';
import { diffDates } from '@/utils/date/diff-dates';
import { range } from '@/utils/range';

export const splitDateRange = ({
  startDate,
  endDate,
}: DateRange): DateRange[] => {
  if (startDate.getDate() === endDate.getDate()) {
    return [{ startDate, endDate }];
  }

  const firstDateRange: DateRange = {
    startDate,
    endDate: addDate(dateStart(startDate), 1),
  };
  const lastDateRange: DateRange = {
    startDate: dateStart(endDate),
    endDate,
  };
  const middleDateRange: DateRange[] = range(
    diffDates(dateStart(endDate), dateStart(startDate)) - 1,
  ).map((date) => ({
    startDate: addDate(dateStart(startDate), date + 1),
    endDate: addDate(dateStart(startDate), date + 2),
  }));

  return [firstDateRange, ...middleDateRange, lastDateRange];
};
