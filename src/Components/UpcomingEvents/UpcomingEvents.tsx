import { useEffect, useState } from "react";
import { Category } from "../../models/Category";
import { Event } from "../../models/Event";
import UpcomingEventCard from "../UpcomingEventCard/UpcomingEventCard";
import "./UpcomingEvents.scss";

interface props {
  categories: Category[];
  events: Event[] | null;
}

function UpcomingEvents(props: props): JSX.Element {
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);

  useEffect(() => {
    setCurrentEvents(props.events || []);
  }, [props.events]);

  const changeCategory = (value: string) => {
    const newEventList = props.events?.filter(
      (e) => (e.id_category as any).name === value
    );
    if (!newEventList?.length) setCurrentEvents(props.events || []);
    else setCurrentEvents(newEventList);
  };

  const changeWeekDay = (value: string) => {
    if (value === "All Weekdays") {
      setCurrentEvents(props.events || []);
      return;
    }
    const newEventList = props.events?.filter(
      (e) =>
        new Date(e.date).toLocaleDateString("en-US", {
          weekday: "long",
        }) === value
    );
    setCurrentEvents(newEventList || []);
  };

  const weekDays = [
    "All Weekdays",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="UpcomingEvents">
      <div className="upcoming-events-navbar">
        <h2>Upcoming Events</h2>
        <div className="select-events-area">
          <select
            className="upcoming-events-select"
            onChange={(e) => changeWeekDay(e.target.value)}
          >
            {weekDays.map((w) => (
              <option value={w} key={w}>
                {w}
              </option>
            ))}
          </select>
          <select
            className="upcoming-events-select"
            onChange={(e) => changeCategory(e.target.value)}
          >
            <option value="Any Category">Any Category</option>
            {props.categories.map((c) => (
              <option value={c.name} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="upcoming-events-card-container">
        {currentEvents.length > 0 &&
          currentEvents.map((e) => <UpcomingEventCard key={e._id} event={e} />)}
        {!currentEvents.length && (
          <p className="error-message-section">
            No upcoming events on this day
          </p>
        )}
      </div>
      <button className="load-more-upcoming-events">Load More</button>
    </div>
  );
}

export default UpcomingEvents;
