import Rating from "@mui/material/Rating";
import { User } from "../../models/User";
import ProfileImg from "../../assets/tom-profile-img.jpeg";
import { Event } from "../../models/Event";
import { SellerTicket } from "./SellersSlider";
import "./SingleSellerCard.scss";

interface props {
  user: User | null;
  amount: number;
  ticket: SellerTicket;
  event: Event | null;
  onClick?: Function;
  activeSeller?: boolean;
  isActive?: boolean;
  onGoBack?: Function;
}

function SingleSellerCard(props: props): JSX.Element {
  const value = 3.5;
  return (
    <div className="single-seller-container">
      <div
        className={`SingleSellerCard ${
          props.activeSeller ? "active-seller" : ""
        } ${props.isActive ? "hidden-card" : ""}`}
      >
        <div className="owner-details">
          <img src={ProfileImg} alt="owner" className="owner-profile-image" />
          <div className="name-and-rating">
            <h5 className="owner-name">{`${
              (props.ticket?.id_owner as User).first_name
            } ${(props.ticket?.id_owner as User).last_name}`}</h5>
            <Rating value={value} readOnly precision={0.5} />
          </div>
        </div>
        {!props.activeSeller && (
          <>
            <div className="ticket-details">
              <div className="ticket-headers">
                <h6>Seats</h6> <span></span> <h6>Row</h6>
              </div>
              <div className="ticket-info">
                <span>{props.ticket.seat as string}</span>
                <span>{props.ticket.row}</span>
              </div>
            </div>
            <div className="show-tickets-area">
              <button
                className="show-tickets-button"
                onClick={() => props.onClick && props.onClick()}
              >
                <span className="amount">{props.ticket.amount}</span> Tickets
              </button>
            </div>
          </>
        )}
        {props.activeSeller && (
          <div className="active-seller-tickets">
            <div className="active-seller-single-ticket">
            <h6 className="active-seller-header">Choose tickets</h6>
              <div className="active-seller-ticket-headers">
                <h6>Seat</h6>
                <h6>Row</h6>
                <h6>Area</h6>
              </div>
              {props.ticket.ticketsArray.map((t) => (
                <>
                <input type="checkbox" id={t.seat as string} className="ticket-input"/>
                  <label
                    htmlFor={t.seat as string}
                    className="active-seller-ticket-details"
                    key={t._id + "ticket"}
                  >
                    <span>{t.seat as number}</span>
                    <span>{t.row}</span>
                    <span>{t.area}</span>
                  </label>
                </>
              ))}
              <div className="active-seller-ticket-details">
                <span>75</span>
                <span>22</span>
                <span>C</span>
              </div>
            </div>
            <div className="active-seller-buttons">
              <button
                className="go-back-btn"
                onClick={() => props.onGoBack && props.onGoBack()}
              >
                Go Back
              </button>
              <button className="continue-btn">Continue</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleSellerCard;
