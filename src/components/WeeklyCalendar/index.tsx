import { addDate } from "@/utils/date/addDate";
import { isSameDate } from "@/utils/date/isSameDate";
import { jaDays } from "@/utils/date/jaDays";
import { setTime } from "@/utils/date/setTime";
import { getMouseYFromElementTop } from "@/utils/getMouseYFromElementTop";
import { range } from "@/utils/range";
import { useRef, useState } from "react";
import { Event } from "./Event";
import { getTimeFromMouseY } from "./logic/getTimeFromMouseY";
import styles from "./styles.module.scss";

type Props = {
  events: Event[];
};

const HEIGHT = 50;

export const WeeklyCalendar: React.VFC<Props> = (props) => {
  const now = new Date();
  const [currentWeekFirstDate, setCurrentWeekFirstDate] = useState(
    addDate(now, -now.getDay()),
  );
  const currentWeek = range(7).map((day) => addDate(currentWeekFirstDate, day));
  const jaYearMonth = `${currentWeekFirstDate.getFullYear()}年 ${
    currentWeekFirstDate.getMonth() + 1
  }月`;
  const onClickPrevWeek = () => {
    const prevWeekFirstDate = addDate(currentWeekFirstDate, -7);
    setCurrentWeekFirstDate(prevWeekFirstDate);
  };
  const onClickNextWeek = () => {
    const nextWeekFirstDate = addDate(currentWeekFirstDate, 7);
    setCurrentWeekFirstDate(nextWeekFirstDate);
  };

  const [events, setEvents] = useState(props.events);

  const currentEventIdRef = useRef((events?.[events.length - 1]?.id ?? 0) + 1);

  const isDraggingRef = useRef(false);

  const onMouseDown = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
    isDraggingRef.current = true;

    const mouseY = getMouseYFromElementTop(mouseEvent);
    const { hours, minutes } = getTimeFromMouseY(mouseY, HEIGHT);
    const startDate = setTime(date, hours, minutes);
    const endDate = setTime(date, hours, minutes + 15);
    const newEvents = [
      ...events,
      {
        id: currentEventIdRef.current,
        startDate,
        endDate,
      },
    ];
    setEvents(newEvents);
  };
  const onMouseMove = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
    if (!isDraggingRef.current) {
      return;
    }

    const mouseY = getMouseYFromElementTop(mouseEvent);
    const { hours, minutes } = getTimeFromMouseY(mouseY, HEIGHT);
    const endDate = setTime(date, hours, minutes + 15);
    const newEvents = events.map((event) =>
      event.id === currentEventIdRef.current ? { ...event, endDate } : event,
    );
    setEvents(newEvents);
  };
  const onMouseUp = () => {
    isDraggingRef.current = false;

    currentEventIdRef.current++;
  };

  return (
    <div>
      <div className={styles.header}>
        <button onClick={onClickPrevWeek}>{"<"}</button>
        <button onClick={onClickNextWeek}>{">"}</button>
        <div>{jaYearMonth}</div>
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
          {currentWeek.map((date) => (
            <div
              key={date.getDay()}
              onMouseDown={(event) => {
                onMouseDown(event, date);
              }}
              onMouseMove={(event) => {
                onMouseMove(event, date);
              }}
              onMouseUp={onMouseUp}
              className={styles.date}
            >
              <div>{date.getDate()}</div>
              {events.map((event) =>
                isSameDate(event.startDate, date) ? (
                  <Event key={event.id} event={event} height={HEIGHT} />
                ) : null,
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
