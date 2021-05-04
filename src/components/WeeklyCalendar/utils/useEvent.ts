import { addMinutes } from "@/utils/date/addMinutes";
import { compareDate } from "@/utils/date/compareDate";
import { diffMinutes } from "@/utils/date/diffMinutes";
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
    const minutes = diffMinutes(endPointDate, startPointDate);
    const _event = {
      ...event,
      startDate: addMinutes(event.startDate, minutes),
      endDate: addMinutes(event.endDate, minutes),
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
