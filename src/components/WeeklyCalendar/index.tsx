import { isSameDate } from "@/utils/date/isSameDate";
import { jaDays } from "@/utils/date/jaDays";
import { range } from "@/utils/range";
import { useRef } from "react";
import { Event } from "./Event";
import styles from "./styles.module.scss";
import { dateByMouseEvent } from "./utils/dateByMouseEvent";
import { HEIGHT } from "./utils/height";
import { useEvent } from "./utils/useEvent";
import { useWeek } from "./utils/useWeek";

export type Mode =
  | "normal"
  | "resizeNew"
  | "resizeStart"
  | "resizeEnd"
  | "move";

type Props = {
  events: Event[];
};

export const WeeklyCalendar: React.VFC<Props> = (props) => {
  const week = useWeek();

  const event = useEvent(props.events);

  const mouseDownDateRef = useRef<Date | null>(null);
  const mouseMoveDateRef = useRef<Date | null>(null);

  const modeRef = useRef<Mode>("normal");

  const editedEventRef = useRef<Event | null>(null);

  const onMouseDown = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
    mouseDownDateRef.current = dateByMouseEvent(mouseEvent, date);

    if (modeRef.current === "normal") {
      event.createEvent(mouseDownDateRef.current);

      modeRef.current = "resizeNew";
    }
  };

  const onMouseMove = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
    mouseMoveDateRef.current = dateByMouseEvent(mouseEvent, date);

    switch (modeRef.current) {
      case "resizeNew":
        if (mouseDownDateRef.current != null) {
          event.resizeNewEvent(
            mouseMoveDateRef.current,
            mouseDownDateRef.current,
          );
        }
        break;
      case "resizeStart":
      case "resizeEnd":
        if (editedEventRef.current != null) {
          event[modeRef.current](
            editedEventRef.current,
            mouseMoveDateRef.current,
          );
        }
        break;
    }
  };

  const onMouseUp = () => {
    mouseDownDateRef.current = null;

    modeRef.current = "normal";
  };

  const onMouseDownEvent = (event: Event, mode: Mode) => {
    editedEventRef.current = event;

    modeRef.current = mode;
  };

  return (
    <div>
      <div className={styles.header}>
        <button onClick={week.prevWeek}>{"<"}</button>
        <button onClick={week.nextWeek}>{">"}</button>
        <div>{week.yearMonth}</div>
      </div>

      <div className={styles.days}>
        {jaDays.map((day) => (
          <div key={day} className={styles.day}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.hours}>
          {range(24).map((hour) => (
            <div
              key={hour}
              style={{
                height: HEIGHT,
              }}
            >
              <div className={styles.numBorderContainer}>
                <div className={styles.border} />
                <div>{hour}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.dates}>
          {week.currentWeek.map((date) => (
            <div
              key={date.getDay()}
              onMouseDown={(mouseEvent) => {
                onMouseDown(mouseEvent, date);
              }}
              onMouseMove={(mouseEvent) => {
                onMouseMove(mouseEvent, date);
              }}
              onMouseUp={onMouseUp}
              className={styles.date}
            >
              <div>{date.getDate()}</div>
              {event.events.map((event) =>
                isSameDate(event.startDate, date) ? (
                  <Event
                    key={event.id}
                    event={event}
                    mode={modeRef.current}
                    onMouseDown={onMouseDownEvent}
                  />
                ) : null,
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
