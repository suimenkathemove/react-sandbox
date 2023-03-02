import { useState } from 'react';

export const useMonth = (
  initialDate?: Date,
): {
  currentMonthFirstDate: Date;
  prev: VoidFunction;
  next: VoidFunction;
} => {
  const now = initialDate ?? new Date();
  const [currentMonthFirstDate, setCurrentMonthFirstDate] = useState(
    new Date(now.getFullYear(), now.getMonth()),
  );

  const prev = (): void => {
    setCurrentMonthFirstDate(
      (currentMonthFirstDate) =>
        new Date(
          currentMonthFirstDate.getFullYear(),
          currentMonthFirstDate.getMonth(),
          0,
        ),
    );
  };

  const next = (): void => {
    setCurrentMonthFirstDate(
      (currentMonthFirstDate) =>
        new Date(
          currentMonthFirstDate.getFullYear(),
          currentMonthFirstDate.getMonth() + 1,
        ),
    );
  };

  return {
    currentMonthFirstDate,
    prev,
    next,
  };
};
