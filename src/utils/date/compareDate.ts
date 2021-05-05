export const compareDate = {
  max: (...dates: Date[]) =>
    dates.reduce((acc, cur) => (cur > acc ? cur : acc)),
  min: (...dates: Date[]) =>
    dates.reduce((acc, cur) => (cur < acc ? cur : acc)),
};
