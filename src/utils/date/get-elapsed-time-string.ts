const one_minute = 1_000 * 60;
const one_hour = one_minute * 60;
const one_day = one_hour * 24;
const one_month = one_day * 30;
const one_year = one_day * 365;

export const getElapsedTimeString = (date: Date): string => {
  const now = new Date();
  const elapsedTime = now.getTime() - date.getTime();

  if (elapsedTime < one_minute) {
    return '今';
  } else if (elapsedTime < one_hour) {
    return `${Math.floor(elapsedTime / one_minute)}分前`;
  } else if (elapsedTime < one_day) {
    return `${Math.floor(elapsedTime / one_hour)}時間前`;
  } else if (elapsedTime < one_month) {
    return `${Math.floor(elapsedTime / one_day)}日前`;
  } else if (elapsedTime < one_year) {
    return `${Math.floor(elapsedTime / one_month)}ヶ月前`;
  } else {
    return `${Math.floor(elapsedTime / one_year)}年前`;
  }
};
