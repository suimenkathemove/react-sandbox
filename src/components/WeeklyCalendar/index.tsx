import { isSameDate } from "@/utils/date/isSameDate";
import { jaDays } from "@/utils/date/jaDays";
import { splitDateRange } from "@/utils/date/splitDateRange";
import { range } from "@/utils/range";
import { useRef } from "react";
import { Event } from "./Event";
import styles from "./styles.module.scss";
import { dateByMouseEvent } from "./utils/dateByMouseEvent";
import { HOUR_HEIGHT } from "./utils/hourHeight";
import { useEvent } from "./utils/useEvent";
import { useWeek } from "./utils/useWeek";

export type Mode =
  | "create"
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

  const modeRef = useRef<Mode>("create");

  const editedEventRef = useRef<Event | null>(null);

  const onMouseDown = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
    mouseDownDateRef.current = dateByMouseEvent(mouseEvent, date);

    if (modeRef.current === "create") {
      event[modeRef.current](mouseDownDateRef.current);

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
          event[modeRef.current](
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
      case "move":
        if (
          editedEventRef.current != null &&
          mouseDownDateRef.current != null
        ) {
          event[modeRef.current](
            editedEventRef.current,
            mouseDownDateRef.current,
            mouseMoveDateRef.current,
          );
        }
        break;
    }
  };

  const onMouseUp = () => {
    mouseDownDateRef.current = null;

    modeRef.current = "create";
  };

  const onMouseDownEvent = (event: Event, mode: Mode) => {
    editedEventRef.current = event;

    modeRef.current = mode;
  };

  return (
    <div>
      <div className={styles.header}>
        <button onClick={week.prev}>{"<"}</button>
        <button onClick={week.next}>{">"}</button>
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
                height: HOUR_HEIGHT,
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
          {week.current.map((date) => (
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
              {event.list.map((event) =>
                splitDateRange({
                  startDate: event.startDate,
                  endDate: event.endDate,
                }).map(
                  (dateRange) =>
                    isSameDate(dateRange.startDate, date) && (
                      <Event
                        key={`${event.id}-${dateRange.startDate.getDate()}`}
                        event={event}
                        dateRage={dateRange}
                        mode={modeRef.current}
                        onMouseDown={onMouseDownEvent}
                      />
                    ),
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
