import { diffMinutes } from '@/utils/date/diffMinutes';

export const diffDates = (date1: Date, date2: Date) =>
  diffMinutes(date1, date2) / (60 * 24);
