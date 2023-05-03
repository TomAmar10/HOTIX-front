import dateConvertor from "../../../../utils/dateConvertor";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import "./SingleUserEvent.scss";
import { UserEvent } from "../../../../pages/ProfileTickets";

interface props {
  event: UserEvent;
  isShowTime: boolean;
  isShowOver: boolean;
  showTicket: Function;
}

function SingleUserEvent(props: props): JSX.Element {
  return (
    <div className="SingleUserEvent">
      <div className="event-details">
        <img
          className="event-image"
          src={props.event.image}
          alt={props.event.event_name}
        />
        <div className="info">
          <h4 className="event-name">{props.event.event_name}</h4>
          <span>{props.event.description}</span>
          <div className="single-detail">
            <EventIcon className="event-icon" />
            <span>{dateConvertor(props.event.date as Date) as string}</span>
          </div>
          <div className="single-detail">
            <LocationOnIcon className="event-icon" />
            <span>{props.event.location}</span>
          </div>
        </div>
      </div>
      <div className="tickets-container">
        {props.event.ticketsArray.map((t, i) => (
          <div className="single-ticket-container" key={i}>
            {t.open_for_sale && <div className="for-sale-tag">Sale</div>}
            <div className="single-ticket">
              <div className="ticket-detail">
                <span>Seat</span>
                <span>{t.seat as string}</span>
              </div>
              <div className="ticket-detail">
                <span>Row</span>
                <span>{t.row}</span>
              </div>
              <div className="ticket-detail">
                <span>Area</span>
                <span>{t.area}</span>
              </div>
              <div className="ticket-detail">
                <span>Price</span>
                <span>{t.price.toString()}$</span>
              </div>
              <div className="ticket-detail">
                <span>Type</span>
                <span>{t.type}</span>
              </div>
              {props.isShowTime ? (
                <button
                  className="show-ticket-btn"
                  onClick={() => props.showTicket(t)}
                >
                  Show Ticket
                </button>
              ) : props.isShowOver ? (
                <button className="ticket-btn view">View Details</button>
              ) : (
                <button
                  className={`ticket-btn ${t.open_for_sale ? "" : "sell"}`}
                >
                  {t.open_for_sale ? "Delist" : "Sell Ticket"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleUserEvent;
