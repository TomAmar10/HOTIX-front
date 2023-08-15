import { Event } from "../../../models/Event";
import { Role, User } from "../../../models/User";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import "./EventAdded.scss";
import { useDispatch } from "react-redux";
import { eventActions } from "../../../store/eventSlice";
import { LanguageEventModal } from "../../../languageControl/Language";

interface props {
  user: User | null;
  event: Event | null;
  data: LanguageEventModal;
}

function EventAdded(props: props): JSX.Element {
  const data = props.data.EventForm;
  const dispatch = useDispatch();
  const done = () => {
    dispatch(eventActions.endCreating());
    dispatch(eventActions.endUpdating());
    dispatch(eventActions.clearSingleEvent());
  };

  return (
    <div className="EventAdded">
      <h2 className="thank-header">
        {data.thanks}, {props.user?.first_name} !
      </h2>
      <EventAvailableIcon className="event-confirm" />
      {props.user?.role === Role.ADMIN ? (
        <>
          <h5 className="success-msg">{data.approvedMsg}</h5>
          <p className="success-paragraph">
            {data.theEvent}
            <span>{props.event?.event_name}</span>
            {data.isAvailable}
          </p>
        </>
      ) : (
        <>
          <h5 className="success-msg">{data.createdMsg}</h5>
          <p className="success-paragraph">
            {data.waitForApproveMsg} - {props.user?.email}
          </p>
        </>
      )}
      <button className="ok-btn" onClick={done}>
        {data.closeBtn}
      </button>
    </div>
  );
}

export default EventAdded;
