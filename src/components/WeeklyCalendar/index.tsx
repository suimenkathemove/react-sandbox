import { addDate } from "@/utils/date/addDate";
import { addMinutes } from "@/utils/date/addMinutes";
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
  const mouseDownDateRef = useRef<Date | null>(null);
  const onMouseDown = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
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

    mouseDownDateRef.current = startDate;
  };
  const onMouseMove = (
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date,
  ) => {
    if (mouseDownDateRef.current == null) {
      return;
    }

    const mouseY = getMouseYFromElementTop(mouseEvent);
    const { hours, minutes } = getTimeFromMouseY(mouseY, HEIGHT);
    const mouseDate = setTime(date, hours, minutes);
    const event = events.find(
      (event) => event.id === currentEventIdRef.current,
    )!;
    const newEvent = ((): Event => {
      if (mouseDate < mouseDownDateRef.current) {
        return {
          ...event,
          startDate: mouseDate,
          endDate: addMinutes(mouseDownDateRef.current, 15),
        };
      } else {
        return {
          ...event,
          startDate: mouseDownDateRef.current,
          endDate: setTime(date, hours, minutes + 15),
        };
      }
    })();
    const newEvents = events.map((event) =>
      event.id === currentEventIdRef.current ? newEvent : event,
    );
    setEvents(newEvents);
  };
  const onMouseUp = () => {
    mouseDownDateRef.current = null;

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
