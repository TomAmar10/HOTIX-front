import { LanguageProfilePage } from "../../../languageControl/Language";
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./FavoriteEvents.scss";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { eventActions } from "../../../store/eventSlice";

interface props {
  user: User;
  favorites: Event[];
  data: LanguageProfilePage;
}

function FavoriteEvents(props: props): JSX.Element {
  const data = props.data.FavoriteEvents;
  const dispatch = useDispatch();

  return (
    <div className="FavoriteEvents user-page-section">
      <h4 className="section-header">{data.header}</h4>
      <hr />
      <div className="favorite-events-container">
        {props.favorites.map((e) => (
          <div
            key={e._id + "-favorite-key"}
            className="single-favorite-event"
            onClick={() => dispatch(eventActions.setSingleEvent(e))}
          >
            <div className="favorite-event-img-wrap">
              <img
                src={e.image}
                alt={e.event_name}
                className="favorite-event-img"
              />
              <div className="event-details">
                <div className="event-single-detail">
                  <span>
                    <LocationOnIcon className="detail-icon" />
                  </span>
                  <span>{e.location}</span>
                </div>
                <div className="event-single-detail">
                  <span>
                    <CalendarMonthIcon className="detail-icon" />
                  </span>
                  <span>{format(new Date(e.date), "Pp")}</span>
                </div>
              </div>
            </div>
            <h6 className="favorite-event-name">{e.event_name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteEvents;
