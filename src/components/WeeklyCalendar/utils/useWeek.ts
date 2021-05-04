import { addDate } from "@/utils/date/addDate";
import { range } from "@/utils/range";
import { useState } from "react";

export const useWeek = () => {
  const now = new Date();
  const [currentWeekFirstDate, setCurrentWeekFirstDate] = useState(
    addDate(now, -now.getDay()),
  );

  const currentWeek = range(7).map((day) => addDate(currentWeekFirstDate, day));

  const yearMonth = `${currentWeekFirstDate.getFullYear()}/${
    currentWeekFirstDate.getMonth() + 1
  }`;

  const prevWeek = () => {
    const prevWeekFirstDate = addDate(currentWeekFirstDate, -7);
    setCurrentWeekFirstDate(prevWeekFirstDate);
  };
  const nextWeek = () => {
    const nextWeekFirstDate = addDate(currentWeekFirstDate, 7);
    setCurrentWeekFirstDate(nextWeekFirstDate);
  };

  return {
    currentWeek,
    yearMonth,
    prevWeek,
    nextWeek,
  };
};
