import clsx from "clsx";
import { useState } from "react";
import styles from "./styles.module.scss";
import { createDateGrid } from "./utils/createDateGrid";
import { isSameDate } from "@/utils/date/isSameDate";
import { jaDays } from "@/utils/date/jaDays";

type Props = {
  onClickDate: (date: Date) => void;
  dateClassNames?: ((date: Date) => string | false)[];
};

export const MonthlyCalendar: React.VFC<Props> = (props) => {
  const now = new Date();

  const [currentMonthFirstDate, setCurrentMonthFirstDate] = useState(
    new Date(now.getFullYear(), now.getMonth()),
  );

  const onClickPrevMonth = (): void => {
    setCurrentMonthFirstDate(
      (currentMonthFirstDate) =>
        new Date(
          currentMonthFirstDate.getFullYear(),
          currentMonthFirstDate.getMonth(),
          0,
        ),
    );
  };

  const onClickNextMonth = (): void => {
    setCurrentMonthFirstDate(
      (currentMonthFirstDate) =>
        new Date(
          currentMonthFirstDate.getFullYear(),
          currentMonthFirstDate.getMonth() + 1,
        ),
    );
  };

  const dateGrid = createDateGrid(currentMonthFirstDate);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <button onClick={onClickPrevMonth}>{"<"}</button>
        <div>{`${currentMonthFirstDate.getFullYear()}年 ${
          currentMonthFirstDate.getMonth() + 1
        }月`}</div>
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
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                key={j}
                onClick={() => {
                  props.onClickDate(date);
                }}
                role="gridcell"
                tabIndex={-1}
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
