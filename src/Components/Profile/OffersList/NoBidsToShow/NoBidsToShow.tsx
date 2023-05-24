import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import "./NoBidsToShow.scss";
import { NavLink } from "react-router-dom";

interface props {
  isSelling?: boolean;
  upcomingEvents?: boolean;
}

function NoBidsToShow(props: props): JSX.Element {
  return (
    <div className="NoBidsToShow">
      <span className="no-bids-span">
        {props.upcomingEvents
          ? "No upcoming events to show"
          : `You didn't ${
              props.isSelling ? "receive" : "place"
            } any bid so far`}
      </span>
      <ConfirmationNumberIcon className="ticket-icon" />
      <span className="find-event-span">
        {props.upcomingEvents ? 'Looking for tickets to an upcoming event?':
        props.isSelling
          ? "Looking for an event to sell your ticket?"
          : "Looking for an event to place a bid?"
        }
      </span>
      <NavLink to={"/"}>
        <button className="click-here-btn">CLICK HERE</button>
      </NavLink>
    </div>
  );
}

export default NoBidsToShow;
