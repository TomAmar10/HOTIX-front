import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Event } from "../../../models/Event";
import { UserModes } from "../../../store/authSlice";
import { categoryImages as images } from "../../../utils/file-import";
import "./EventPreview.scss";
import { useEffect, useState } from "react";
import TicketService from "../../../services/ticketService";
import { User } from "../../../models/User";

interface props {
  onMoveToSecondStep: Function;
  userMode: UserModes | null;
  user: User | null;
}

function EventPreview(props: props): JSX.Element {
  const currentEvent: Event = useSelector(
    (state: any) => state.events.currentEvent
  );
  const [isPermitted, setIsPermitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.userMode === UserModes.SELLER) {
      TicketService.getUserTicketsForSaleByEvent(
        props.user?._id as string,
        currentEvent._id as string
      ).then((res) => {
        setIsPermitted(res.length < 6);
        if (res.length >= 6)
          setError("* Maximum tickets to sale in a single event is 6");
      });
    } else setIsPermitted(true);
  }, [currentEvent._id, props.user?._id, props.userMode]);

  return (
    <div className="EventPreview">
      <img
        src={images[currentEvent.id_category.name.replace(" ", "_")]}
        alt={images[currentEvent.id_category.name]}
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
      {error && <span className="user-error">{error}</span>}
      <div className="event-preview-buttons">
        <NavLink to={`/event/${currentEvent._id}`}>
          <button className="event-details-btn">Event Details</button>
        </NavLink>
        {props.userMode && (
          <button
            disabled={!isPermitted}
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
