import { useState } from "react";
import styles from "./styles.module.scss";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { Popover } from "@/components/Popover";
import { isSameDate } from "@/utils/date/isSameDate";
import { useShow } from "@/utils/useShow";

type Props = {
  selectedDate: Date | null;
  setSelectedDate: (date: NonNullable<Props["selectedDate"]>) => void;
};

export const DatePicker: React.VFC<Props> = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);

  const value =
    props.selectedDate != null ? props.selectedDate.toLocaleDateString() : "";

  const { isShown, show, hide } = useShow();

  const onClickInput: React.MouseEventHandler<HTMLInputElement> = (event) => {
    event.currentTarget.blur();

    show();
  };

  const onClickSubmit = () => {
    if (selectedDate != null) {
      props.setSelectedDate(selectedDate);

      hide();
    }
  };

  return (
    <div>
      <Popover
        trigger={
          <input
            value={value}
            onClick={onClickInput}
            onChange={() => {}}
            className={styles.input}
          />
        }
        placement="left"
        isShown={isShown}
        hide={hide}
      >
        <MonthlyCalendar
          onClickDate={setSelectedDate}
          dateClassNames={[
            (date) =>
              selectedDate != null &&
              isSameDate(date, selectedDate) &&
              styles.selectedDate,
          ]}
        />

        <button onClick={onClickSubmit}>決定</button>
      </Popover>
    </div>
  );
};
