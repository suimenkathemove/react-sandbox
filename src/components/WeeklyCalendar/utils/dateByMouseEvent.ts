import { HOUR_HEIGHT } from "./hourHeight";
import { setTime } from "@/utils/date/setTime";
import { mouseCoordinate } from "@/utils/mouseCoordinate";

const FIFTEEN_MINUTES_HEIGHT = HOUR_HEIGHT / (60 / 15);

export const dateByMouseEvent = (
  mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
  date: Date,
) => {
  const mouseY = mouseCoordinate.yFromElementTop(mouseEvent);
  const hours = Math.floor(mouseY / HOUR_HEIGHT);
  const minutes =
    Math.floor((mouseY - HOUR_HEIGHT * hours) / FIFTEEN_MINUTES_HEIGHT) * 15;

  return setTime(date, hours, minutes);
};
