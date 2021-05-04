import { isSameDate } from "@/utils/date/isSameDate";
import { jaDays } from "@/utils/date/jaDays";
import clsx from "clsx";
import { useMemo, useState } from "react";
import styles from "./styles.module.scss";
import { createDateGrid } from "./utils/createDateGrid";

type Props = {
  onClickDate: (date: Date) => void;
  dateClassNames?: ((date: Date) => string | false)[];
};

export const Calendar: React.VFC<Props> = (props) => {
  const now = new Date();

  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

  const onClickPrevMonth = (): void => {
    const prevMonthLastDate = new Date(currentYear, currentMonth, 0);

    setCurrentYear(prevMonthLastDate.getFullYear());
    setCurrentMonth(prevMonthLastDate.getMonth());
  };

  const onClickNextMonth = (): void => {
    const nextMonthFirstDate = new Date(currentYear, currentMonth + 1);

    setCurrentYear(nextMonthFirstDate.getFullYear());
    setCurrentMonth(nextMonthFirstDate.getMonth());
  };

  const dateGrid = useMemo(() => createDateGrid(currentYear, currentMonth), [
    currentMonth,
    currentYear,
  ]);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <button onClick={onClickPrevMonth}>{"<"}</button>
        <div>{`${currentYear}年 ${currentMonth + 1}月`}</div>
        <button onClick={onClickNextMonth}>{">"}</button>
      </div>

      <div>
        {jaDays.map((day) => (
          <div key={day} className={styles.day}>
            {day}
          </div>
        ))}
      </div>

      <div>
        {dateGrid.map((week, i) => (
          <div key={i}>
            {week.map((date, j) => (
              <div
                key={j}
                onClick={() => {
                  props.onClickDate(date);
                }}
                className={clsx(
                  styles.date,
                  isSameDate(date, now) && styles.today,
                  ...(props.dateClassNames ?? []).map((dateClassName) =>
                    dateClassName(date),
                  ),
                )}
              >
                {date.getDate()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
