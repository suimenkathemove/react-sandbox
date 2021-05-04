import { addMinutes } from "@/utils/date/addMinutes";
import { compareDate } from "@/utils/date/compareDate";
import { setTime } from "@/utils/date/setTime";
import { useState } from "react";
import { Event } from "../Event";

export const useEvent = (baseEvents: Event[]) => {
  const [events, setEvents] = useState(baseEvents);

  const updateEvents = (event: Event) => {
    setEvents((events) => events.map((e) => (e.id === event.id ? event : e)));
  };

  const create = (date: Date) => {
    const newEvent: Event = {
      id: (events?.[events.length - 1]?.id ?? 0) + 1,
      startDate: date,
      endDate: addMinutes(date, 15),
    };
    const _events = [...events, newEvent];
    setEvents(_events);
  };

  const resizeNew = (startPointDate: Date, endPointDate: Date) => {
    const newEvent = events[events.length - 1];

    const [date1, date2] =
      startPointDate < endPointDate
        ? [startPointDate, endPointDate]
        : [endPointDate, startPointDate];
    const _event = {
      ...newEvent,
      startDate: date1,
      endDate: addMinutes(date2, 15),
    };
    updateEvents(_event);
  };

  const resizeStart = (event: Event, date: Date) => {
    const _event = {
      ...event,
      startDate: compareDate.min(date, addMinutes(event.endDate, -15)),
    };
    updateEvents(_event);
  };

  const resizeEnd = (event: Event, date: Date) => {
    const _event = {
      ...event,
      endDate: compareDate.max(
        addMinutes(date, 15),
        addMinutes(event.startDate, 15),
      ),
    };
    updateEvents(_event);
  };

  const move = (event: Event, startPointDate: Date, endPointDate: Date) => {
    const horizontalStartDate = setTime(
      endPointDate,
      event.startDate.getHours(),
      event.startDate.getMinutes(),
    );
    const horizontalEndDate = setTime(
      endPointDate,
      event.endDate.getHours(),
      event.endDate.getMinutes(),
    );

    const diffHours = endPointDate.getHours() - startPointDate.getHours();
    const diffMinutes = endPointDate.getMinutes() - startPointDate.getMinutes();
    const diffSumMinutes = 60 * diffHours + diffMinutes;

    const startDate = addMinutes(horizontalStartDate, diffSumMinutes);
    const endDate = addMinutes(horizontalEndDate, diffSumMinutes);

    const _event = {
      ...event,
      startDate,
      endDate,
    };
    updateEvents(_event);
  };

  return {
    list: events,
    create,
    resizeNew,
    resizeStart,
    resizeEnd,
    move,
  };
};
