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
  const useWeekObj = useWeek();

  const useEventObj = useEvent(props.events);

  const modeRef = useRef<Mode>("create");

  const mouseDownDateRef = useRef<Date | null>(null);

  const editedEventRef = useRef<Event | null>(null);

  const onMouseDown = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
    mouseDownDateRef.current = dateByMouseEvent(mouseEvent, date);

    if (modeRef.current === "create") {
      useEventObj[modeRef.current](mouseDownDateRef.current);

      modeRef.current = "resizeNew";
    }
  };

  const onMouseMove = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
    const mouseMoveDate = dateByMouseEvent(mouseEvent, date);

    switch (modeRef.current) {
      case "resizeNew":
        if (mouseDownDateRef.current != null) {
          useEventObj[modeRef.current](mouseMoveDate, mouseDownDateRef.current);
        }
        break;
      case "resizeStart":
      case "resizeEnd":
        if (editedEventRef.current != null) {
          useEventObj[modeRef.current](editedEventRef.current, mouseMoveDate);
        }
        break;
      case "move":
        if (
          editedEventRef.current != null &&
          mouseDownDateRef.current != null
        ) {
          useEventObj[modeRef.current](
            editedEventRef.current,
            mouseDownDateRef.current,
            mouseMoveDate,
          );
        }
        break;
    }
  };

  const onMouseUp = () => {
    mouseDownDateRef.current = null;

    editedEventRef.current = null;

    if (modeRef.current === "resizeNew") {
      const title = window.prompt("title");
      const newEvent = useEventObj.list[useEventObj.list.length - 1];

      if (title != null) {
        useEventObj.inputTitle(newEvent, title);
      } else {
        useEventObj.remove(newEvent.id);
      }
    }

    modeRef.current = "create";
  };

  type EventProps = React.ComponentProps<typeof Event>;

  const onMouseDownEvent: EventProps["onMouseDown"] = (event, mode) => {
    editedEventRef.current = event;

    modeRef.current = mode;
  };

  const onClickEvent: EventProps["onClick"] = (event) => {
    const title = window.prompt("title");
    if (title != null) {
      useEventObj.inputTitle(event, title);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <button onClick={useWeekObj.prev}>{"<"}</button>
        <button onClick={useWeekObj.next}>{">"}</button>
        <div>{useWeekObj.yearMonth}</div>
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
              <div className={styles.borderAndNumContainer}>
                <div className={styles.border} />
                <div>{hour}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.dates}>
          {useWeekObj.current.map((date) => (
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
              {useEventObj.list.map((event) =>
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
                        onClick={onClickEvent}
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
