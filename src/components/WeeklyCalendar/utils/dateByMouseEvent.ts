import { setTime } from "@/utils/date/setTime";
import { mouseCoordinate } from "@/utils/mouseCoordinate";
import { HOUR_HEIGHT } from "./hourHeight";

export const dateByMouseEvent = (
  mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
  date: Date,
) => {
  const mouseY = mouseCoordinate.yFromElementTop(mouseEvent);
  const hours = Math.floor(mouseY / HOUR_HEIGHT);
  const minutes =
    Math.floor((mouseY - HOUR_HEIGHT * hours) / (HOUR_HEIGHT / (60 / 15))) * 15;

  return setTime(date, hours, minutes);
};
