import { useDispatch } from "react-redux";
import { Event } from "../../models/Event";
import { eventActions } from "../../store/eventSlice";
import { categoryImages as images } from "../../utils/file-import";
import "./UpcomingEventCard.scss";

interface props {
  event: Event;
}

function UpcomingEventCard(props: props): JSX.Element {
  const dispatch = useDispatch();
  const month = new Date(props.event.date)
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const day = new Date(props.event.date).getDate().toString().padStart(2, "0");

  const chooseEvent = () => {
    dispatch(eventActions.setSingleEvent(props.event));
  };

  return (
    <div className="UpcomingEventCard" onClick={chooseEvent}>
      <div className="event-card-img-holder">
        <img
          className="event-card-img"
          src={images[props.event.id_category.name.replace(" ", "_")]}
          alt=""
        />
      </div>
      <div className="event-card-content">
        <div className="card-content-date">
          <span>{month}</span>
          <h3>{day}</h3>
        </div>
        <div className="card-content-details">
          <h6>
            {props.event.event_name} - {props.event.location}
          </h6>
          <p>{props.event.description}</p>
        </div>
      </div>
    </div>
  );
}

export default UpcomingEventCard;
