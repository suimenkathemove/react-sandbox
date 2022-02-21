import clsx from 'clsx';

import { useMonth } from './hooks/useMonth';
import styles from './styles.module.scss';
import { createDateGrid } from './utils/createDateGrid';

import { isSameDate } from '@/utils/date/isSameDate';
import { jaDays } from '@/utils/date/jaDays';

type Props = {
  onClickDate: (date: Date) => void;
  dateClassNames?: ((date: Date) => string | false)[];
};

export const MonthlyCalendar: React.VFC<Props> = (props) => {
  const now = new Date();

  const month = useMonth();

  const yearAndMonth = `${month.currentMonthFirstDate.getFullYear()}年 ${
    month.currentMonthFirstDate.getMonth() + 1
  }月`;

  const dateGrid = createDateGrid(month.currentMonthFirstDate);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <button onClick={month.prev}>{'<'}</button>
        <div>{yearAndMonth}</div>
        <button onClick={month.next}>{'>'}</button>
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
