import { mouseCoordinate } from "@/utils/mouseCoordinate";
import { Mode } from "../";
import { HEIGHT } from "../utils/height";
import styles from "./styles.module.scss";
import { RESIZE_HEIGHT } from "./utils/resizeHeight";

export type Event = {
  id: number;
  startDate: Date;
  endDate: Date;
};

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

  const hoursDiff =
    props.event.endDate.getHours() - props.event.startDate.getHours();
  const minutesDiff =
    props.event.endDate.getMinutes() - props.event.startDate.getMinutes();
  const height = HEIGHT * hoursDiff + HEIGHT * (minutesDiff / 60);

  const top =
    HEIGHT * props.event.startDate.getHours() +
    HEIGHT * (props.event.startDate.getMinutes() / 60);

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
