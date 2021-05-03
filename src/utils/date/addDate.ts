export const addDate = (date: Date, i: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
