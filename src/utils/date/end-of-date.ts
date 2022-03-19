import { addDate } from '@/utils/date/addDate';

export const endOfDate = (date: Date) =>
  new Date(addDate(date, 1).getTime() - 1);
