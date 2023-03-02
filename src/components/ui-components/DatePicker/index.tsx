import styles from './styles.module.scss';

import { Popover } from '@/components/Popover';
import {
  MonthlyCalendar,
  MonthlyCalendarProps,
} from '@/components/ui-components/MonthlyCalendar';
import { isSameDate } from '@/utils/date/isSameDate';
import { useShow } from '@/utils/useShow';

type Props = {
  selectedDate: Date | null;
  setSelectedDate: (date: NonNullable<Props['selectedDate']>) => void;
};

export const DatePicker: React.VFC<Props> = (props) => {
  const value = props.selectedDate?.toLocaleDateString() ?? '';

  const { isShown, show, hide } = useShow();

  const onClickInput: React.MouseEventHandler<HTMLInputElement> = (event) => {
    event.currentTarget.blur();

    show();
  };

  const onClickDate: MonthlyCalendarProps['onClickDate'] = (date) => {
    props.setSelectedDate(date);

    hide();
  };

  const isSelectedDate = (date: Date): boolean =>
    props.selectedDate != null && isSameDate(date, props.selectedDate);

  return (
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
        initialDate={props.selectedDate ?? void 0}
        onClickDate={onClickDate}
        dateClassNames={[(date) => isSelectedDate(date) && styles.selectedDate]}
      />
    </Popover>
  );
};
