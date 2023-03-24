import UpcomingEventCard from "../UpcomingEventCard/UpcomingEventCard";
import "./UpcomingEvents.scss";

function UpcomingEvents(): JSX.Element {
  return (
    <div className="UpcomingEvents">
      <div className="upcoming-events-navbar">
        <h2>Upcoming Events</h2>
        <div className="select-events-area">
          <select>
            <option value="Weekdays">Weekdays</option>
          </select>
          <select>
            <option value="EventType">EventType</option>
          </select>
          <select>
            <option value="Any Category">Any Category</option>
          </select>
        </div>
      </div>
      <div className="upcoming-events-card-container">
        {[1, 2, 3, 4, 5, 6].map((e) => (
          <UpcomingEventCard />
        ))}
      </div>
      <button className="load-more-upcoming-events">Load More</button>
    </div>
  );
}

export default UpcomingEvents;
