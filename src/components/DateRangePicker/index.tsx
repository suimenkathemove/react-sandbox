import { Calendar } from "@/components/Calendar";
import { Popover } from "@/components/Popover";
import { dateString } from "@/utils/date/dateString";
import { isSameDate } from "@/utils/date/isSameDate";
import { useShow } from "@/utils/useShow";
import { useState } from "react";
import styles from "./styles.module.scss";

type NonNullableArray<T extends unknown[]> = {
  [P in keyof T]: NonNullable<T[P]>;
};
type Props = {
  dateRange: [startDate: Date | null, endDate: Date | null];
  setDateRange: (dateRange: NonNullableArray<Props["dateRange"]>) => void;
};

export const DateRangePicker: React.VFC<Props> = (props) => {
  const [firstSelectedDate, setFirstSelectedDate] = useState<Date | null>(null);

  const [dateRange, setDateRange] = useState(props.dateRange);
  const startDate = dateRange[0];
  const endDate = dateRange[1];

  const startDateValue =
    props.dateRange[0] != null ? dateString(props.dateRange[0]) : "";
  const endDateValue =
    props.dateRange[1] != null ? dateString(props.dateRange[1]) : "";

  const { isShown, show, hide } = useShow();

  const onClickInput: React.MouseEventHandler<HTMLInputElement> = (event) => {
    event.currentTarget.blur();

    show();
  };

  const onClickDate = (date: Date) => {
    if (firstSelectedDate == null) {
      setFirstSelectedDate(date);

      setDateRange([null, null]);
    } else {
      setFirstSelectedDate(null);

      const newDateRange: [Date, Date] =
        date < firstSelectedDate
          ? [date, firstSelectedDate]
          : [firstSelectedDate, date];
      setDateRange(newDateRange);
    }
  };

  const onClickSubmit = () => {
    if (startDate == null || endDate == null) {
      return;
    }

    props.setDateRange([startDate, endDate]);

    hide();
  };

  return (
    <div>
      <Popover
        trigger={
          <div>
            <input
              value={startDateValue}
              onClick={onClickInput}
              onChange={() => {}}
              className={styles.input}
            />
            <input
              value={endDateValue}
              onClick={onClickInput}
              onChange={() => {}}
              className={styles.input}
            />
          </div>
        }
        placement="left"
        isShown={isShown}
        hide={hide}
      >
        <Calendar
          onClickDate={onClickDate}
          dateClassNames={[
            (date) =>
              [firstSelectedDate, startDate, endDate].some(
                (date2) => date2 != null && isSameDate(date, date2),
              ) && styles.selectedDate,
            (date) =>
              startDate != null &&
              endDate != null &&
              startDate < date &&
              date < endDate &&
              styles.inDate,
          ]}
        />

        <button onClick={onClickSubmit}>決定</button>
      </Popover>
    </div>
  );
};
