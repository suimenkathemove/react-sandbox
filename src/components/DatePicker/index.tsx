import { useState } from 'react';
import { dateString } from '../../utils/date/dateString';
import { isSameDate } from '../../utils/date/isSameDate';
import { Calendar } from '../Calendar';
import styles from './styles.module.scss';

type Props = {
  selectedDate: Date | null;
  setSelectedDate: (date: NonNullable<Props['selectedDate']>) => void;
};

export const DatePicker: React.VFC<Props> = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);

  const value =
    props.selectedDate != null ? dateString(props.selectedDate) : '';

  const onClickSubmit = () => {
    if (selectedDate != null) {
      props.setSelectedDate(selectedDate);
    }
  };

  return (
    <div>
      <input value={value} onChange={() => {}} />

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
    </div>
  );
};
