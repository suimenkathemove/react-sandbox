export const diffMinutes = (date1: Date, date2: Date) =>
  (date1.getTime() - date2.getTime()) / (1000 * 60);
