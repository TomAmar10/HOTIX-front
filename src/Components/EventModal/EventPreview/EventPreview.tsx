import { NavLink } from "react-router-dom";
import { Event } from "../../../models/Event";
import { UserModes } from "../../../store/authSlice";
import "./EventPreview.scss";
import { useEffect, useState } from "react";
import { User } from "../../../models/User";
import { Ticket } from "../../../models/Ticket";

interface props {
  onMoveToSecondStep: Function;
  userMode: UserModes | null;
  user: User | null;
  event: Event | null;
  userTicketsForSale: Ticket[] | [];
}

function EventPreview(props: props): JSX.Element {
  const [isPermitted, setIsPermitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.userMode === UserModes.BUYER) {
      setIsPermitted(true);
      return;
    }
    if (props.userTicketsForSale?.length > 5) {
      setIsPermitted(false);
      setError("* Maximum tickets to sale in a single event is 6");
    } else setIsPermitted(true);
  }, [props.userMode, props.userTicketsForSale]);

  return (
    <div className="EventPreview">
      <img src={props.event?.image} alt={props.event?.event_name} />
      <div className="event-data">
        <h5>{props.event?.event_name}</h5>
        <div className="data-row">
          <h6>About:</h6> {props.event?.description}
        </div>
        <div className="data-row">
          <h6>Category:</h6> {props.event?.id_category.name}
        </div>
        <div className="data-row">
          <h6>Location:</h6> {props.event?.location}
        </div>
        <div className="data-row">
          <h6>Date:</h6> {props.event?.date as string}
        </div>
        <hr />
      </div>
      {error && <span className="user-error">{error}</span>}
      <div className="event-preview-buttons">
        <NavLink to={`/event/${props.event?._id}`}>
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
