import { DateRange } from "@/types/date";
import { diffMinutes } from "@/utils/date/diffMinutes";
import { mouseCoordinate } from "@/utils/mouseCoordinate";
import { Mode } from "../";
import { HOUR_HEIGHT } from "../utils/hourHeight";
import styles from "./styles.module.scss";
import { RESIZE_HEIGHT } from "./utils/resizeHeight";

export type Event = {
  id: number;
} & DateRange;

type Props = {
  event: Event;
  mode: Mode;
  onMouseDown: (event: Event, mode: Mode) => void;
};

export const Event: React.VFC<Props> = (props) => {
  const onMouseDown = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const newMode = (() => {
      const mouseYFromElementTop = mouseCoordinate.yFromElementTop(mouseEvent);
      if (mouseYFromElementTop < RESIZE_HEIGHT) {
        return "resizeStart";
      }

      const mouseYFromElementBottom = mouseCoordinate.yFromElementBottom(
        mouseEvent,
      );
      if (-mouseYFromElementBottom < RESIZE_HEIGHT) {
        return "resizeEnd";
      }

      return "move";
    })();
    props.onMouseDown(props.event, newMode);
  };

  const height =
    HOUR_HEIGHT *
    (diffMinutes(props.event.endDate, props.event.startDate) / 60);

  const top =
    HOUR_HEIGHT * props.event.startDate.getHours() +
    HOUR_HEIGHT * (props.event.startDate.getMinutes() / 60);

  return (
    <div
      onMouseDown={onMouseDown}
      className={styles.base}
      style={{
        height,
        top,
      }}
    ></div>
  );
};
