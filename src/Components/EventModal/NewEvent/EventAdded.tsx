import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import "./EventAdded.scss";

interface props {
  user: User | null;
  event: Event | null;
}

function EventAdded(props: props): JSX.Element {
  return (
    <div className="EventAdded">
      <h2 className="thank-header">Thank you, {props.user?.first_name} !</h2>
        <EventAvailableIcon className="event-confirm"/>
      <h5 className="first-paragraph">Your event Was created successfully</h5>
      <p className="second-paragraph">
        We will have a look at it, and in the next 24 hours - <br />
        We'll let you know if the event is approved, with a message to this mail
        - {props.user?.email},
      </p>
    </div>
  );
}

export default EventAdded;
