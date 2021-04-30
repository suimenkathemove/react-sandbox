import { useState } from 'react';
import { dateString } from '../../utils/date/dateString';
import { isSameDate } from '../../utils/date/isSameDate';
import { useShow } from '../../utils/useShow';
import { Calendar } from '../Calendar';
import { Popover } from '../Popover';
import styles from './styles.module.scss';

type Props = {
  selectedDate: Date | null;
  setSelectedDate: (date: NonNullable<Props['selectedDate']>) => void;
};

export const DatePicker: React.VFC<Props> = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);

  const value =
    props.selectedDate != null ? dateString(props.selectedDate) : '';

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
        <Calendar
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
  );};
