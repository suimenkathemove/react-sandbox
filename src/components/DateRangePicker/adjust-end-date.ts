import { addDate } from '@/utils/date/addDate';

export const adjustEndDate = (date: Date) =>
  new Date(addDate(date, 1).getTime() - 1);
