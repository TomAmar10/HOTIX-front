import dateConvertor from "../../../../utils/dateConvertor";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import { UserEvent } from "../../../../pages/ProfileTickets";
import { Deal } from "../../../../models/Deal";
import { User } from "../../../../models/User";
import { getSign } from "../../../../utils/currencyHandler";
import { Link } from "react-router-dom";
import "./SingleUserEvent.scss";

interface props {
  event: UserEvent;
  isShowTime: boolean;
  isShowOver: boolean;
  showTicket: Function;
  onRateClick: Function;
  user: User | null;
  buyer?: boolean;
  offersAmount: number;
}

function SingleUserEvent(props: props): JSX.Element {
  const dealToRate = (props.event.ticketsArray[0].id_deal as Deal) || null;
  const isRatingTime = () => {
    if (!dealToRate) return false;
    if (!props.isShowOver) return false;
    if (props.buyer && !dealToRate.is_buyer_rated) {
      return true;
    }
    if (!props.buyer && !dealToRate.is_seller_rated) return true;
    else return false;
  };
  const userToRate = isRatingTime()
    ? props.buyer
      ? (dealToRate.id_buyer as User)
      : (dealToRate.id_seller as User)
    : null;

  const giveFeedback = () =>
    props.onRateClick(dealToRate.id_buyer as User, dealToRate);

  return (
    <div className="SingleUserEvent">
      {props.offersAmount > 0 && (
        <div className="bid-amount-container">
          <Link to={"../offers"} className="bids-amount">
            {props.offersAmount} Bid{props.offersAmount > 1 ? "s" : ""}
          </Link>
        </div>
      )}
      {props.isShowTime && (
        <span className="show-is-live">
          <i className="fa-regular fa-circle-dot fa-fade"></i> Live
        </span>
      )}
      {userToRate && (
        <button className="rate-user-btn" onClick={giveFeedback}>
          <i className="fa-solid fa-star"></i> Rate{" "}
          {`${userToRate.first_name} ${userToRate.last_name}`}
        </button>
      )}
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
            <span>{dateConvertor(props.event.date as string)}</span>
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
                <span>
                  {t.price.toString()}
                  {getSign(t.currency)}
                </span>
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
