import { Mode } from '../';
import { HOUR_HEIGHT } from '../utils/hourHeight';

import styles from './styles.module.scss';
import { RESIZE_HEIGHT } from './utils/resizeHeight';

import { DateRange } from '@/types/date';
import { diffMinutes } from '@/utils/date/diffMinutes';
import { mouseCoordinate } from '@/utils/mouseCoordinate';

export type Event = {
  id: number;
  title: string;
} & DateRange;

type Props = {
  event: Event;
  dateRage: DateRange;
  mode: Mode;
  onMouseDown: (event: Event, mode: Mode) => void;
};

export const Event: React.VFC<Props> = (props) => {
  const onMouseDown = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const newMode = ((): Mode => {
      const mouseYFromElementTop = mouseCoordinate.yFromElementTop(mouseEvent);
      if (mouseYFromElementTop < RESIZE_HEIGHT) {
        return 'resizeStart';
      }

      const mouseYFromElementBottom = mouseCoordinate.yFromElementBottom(
        mouseEvent,
      );
      if (-mouseYFromElementBottom < RESIZE_HEIGHT) {
        return 'resizeEnd';
      }

      return 'moveOrEdit';
    })();
    props.onMouseDown(props.event, newMode);
  };

  const top =
    HOUR_HEIGHT * props.dateRage.startDate.getHours() +
    HOUR_HEIGHT * (props.dateRage.startDate.getMinutes() / 60);

  const height =
    HOUR_HEIGHT *
    (diffMinutes(props.dateRage.endDate, props.dateRage.startDate) / 60);

  return (
    <div
      onMouseDown={onMouseDown}
      role="button"
      tabIndex={-1}
      className={styles.base}
      style={{
        top,
        height,
      }}
    >
      {props.event.title}
    </div>
  );
};
