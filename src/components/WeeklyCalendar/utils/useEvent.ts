import { addMinutes } from "@/utils/date/addMinutes";
import { compareDate } from "@/utils/date/compareDate";
import { useState } from "react";
import { Event } from "../Event";

export const useEvent = (baseEvents: Event[]) => {
  const [events, setEvents] = useState(baseEvents);

  const updateEvents = (event: Event) => {
    const _events = events.map((e) => (e.id === event.id ? event : e));
    setEvents(_events);
  };

  const createEvent = (date: Date) => {
    const newEvent: Event = {
      id: (events?.[events.length - 1]?.id ?? 0) + 1,
      startDate: date,
      endDate: addMinutes(date, 15),
    };
    const _events = [...events, newEvent];
    setEvents(_events);
  };

  const resizeNewEvent = (startPointDate: Date, endPointDate: Date) => {
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

  return {
    events,
    createEvent,
    resizeNewEvent,
    resizeStart,
    resizeEnd,
  };
};
