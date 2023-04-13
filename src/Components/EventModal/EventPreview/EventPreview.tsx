import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Event } from "../../../models/Event";
import { UserModes } from "../../../store/authSlice";
import { categoryImages as images } from "../../../utils/file-import";
import "./EventPreview.scss";

interface props {
  onMoveToSecondStep: Function;
  userMode: UserModes | null;
}

function EventPreview(props: props): JSX.Element {
  const currentEvent: Event = useSelector(
    (state: any) => state.events.currentEvent
  );

  return (
    <div className="EventPreview">
      <img
        src={images[currentEvent.id_category.name.replace(" ", "_")]}
        alt=""
      />
      <div className="event-data">
        <h5>{currentEvent.event_name}</h5>
        <div className="data-row">
          <h6>About:</h6> {currentEvent.description}
        </div>
        <div className="data-row">
          <h6>Category:</h6> {currentEvent.id_category.name}
        </div>
        <div className="data-row">
          <h6>Location:</h6> {currentEvent.location}
        </div>
        <div className="data-row">
          <h6>Date:</h6> {currentEvent.date as string}
        </div>
      </div>
      <div className="event-preview-buttons">
        <NavLink to={`/event/${currentEvent._id}`}>
          <button className="event-details-btn">Event Details</button>
        </NavLink>
        {props.userMode && (
          <button
            className="buy-now-btn"
            onClick={() => props.onMoveToSecondStep()}
          >
            {props.userMode === UserModes.BUYER ? "Buy Now" : "Sell Ticket"}
          </button>
        )}
      </div>
    </div>
  );
}

export default EventPreview;
