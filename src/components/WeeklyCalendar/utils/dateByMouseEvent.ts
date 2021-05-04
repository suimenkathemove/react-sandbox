import { setTime } from "@/utils/date/setTime";
import { mouseCoordinate } from "@/utils/mouseCoordinate";
import { HEIGHT } from "./height";

export const dateByMouseEvent = (
  mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
  date: Date,
) => {
  const mouseY = mouseCoordinate.yFromElementTop(mouseEvent);
  const hours = Math.floor(mouseY / HEIGHT);
  const minutes =
    Math.floor((mouseY - HEIGHT * hours) / (HEIGHT / (60 / 15))) * 15;

  return setTime(date, hours, minutes);
};
