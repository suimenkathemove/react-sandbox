import { useRef } from "react";
import { Event } from "./Event";
import styles from "./styles.module.scss";
import { dateByMouseEvent } from "./utils/dateByMouseEvent";
import { HOUR_HEIGHT } from "./utils/hourHeight";
import { useEvent } from "./utils/useEvent";
import { useWeek } from "./utils/useWeek";
import { assertNever } from "@/utils/assertNever";
import { isSameDate } from "@/utils/date/isSameDate";
import { jaDays } from "@/utils/date/jaDays";
import { splitDateRange } from "@/utils/date/splitDateRange";
import { range } from "@/utils/range";

export type Mode =
  | "normal"
  | "resizeNew"
  | "resizeStart"
  | "resizeEnd"
  | "moveOrEdit"
  | "move";

type Props = {
  events: Event[];
};

export const WeeklyCalendar: React.VFC<Props> = (props) => {
  const useWeekObj = useWeek();

  const useEventObj = useEvent(props.events);

  const modeRef = useRef<Mode>("normal");

  const mouseDownDateRef = useRef<Date | null>(null);

  const editedEventRef = useRef<Event | null>(null);

  const cleanup = () => {
    mouseDownDateRef.current = null;

    editedEventRef.current = null;

    modeRef.current = "normal";
  };

  const onMouseDown = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
    mouseDownDateRef.current = dateByMouseEvent(mouseEvent, date);

    if (modeRef.current === "normal") {
      useEventObj.create(mouseDownDateRef.current);

      modeRef.current = "resizeNew";
    }
  };

  const onMouseMove = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
    const mouseMoveDate = dateByMouseEvent(mouseEvent, date);

    switch (modeRef.current) {
      case "normal":
        break;
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
      case "moveOrEdit":
      case "move":
        if (
          editedEventRef.current != null &&
          mouseDownDateRef.current != null
        ) {
          useEventObj.move(
            editedEventRef.current,
            mouseDownDateRef.current,
            mouseMoveDate,
          );

          if (modeRef.current === "moveOrEdit") {
            modeRef.current = "move";
          }
        }
        break;
      default:
        assertNever(modeRef.current);
    }
  };

  const onMouseUp = () => {
    switch (modeRef.current) {
      case "resizeNew":
        {
          const input = window.prompt("タイトルを入力してください");
          const newEvent = useEventObj.list[useEventObj.list.length - 1];

          if (input != null) {
            useEventObj.inputTitle(newEvent, input);
          } else {
            useEventObj.remove(newEvent.id);
          }
        }
        break;
      case "moveOrEdit": {
        if (editedEventRef.current != null) {
          const input = window.prompt(
            "タイトルを変更するか、削除したい場合は「delete」と入力してください",
          );
          if (input === "delete") {
            useEventObj.remove(editedEventRef.current.id);
          } else if (input != null) {
            useEventObj.inputTitle(editedEventRef.current, input);
          }
        }
        break;
      }
    }

    cleanup();
  };

  type EventProps = React.ComponentProps<typeof Event>;

  const onMouseDownEvent: EventProps["onMouseDown"] = (event, mode) => {
    editedEventRef.current = event;

    modeRef.current = mode;
  };

  return (
    <div className={styles.base}>
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
              role="presentation"
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
