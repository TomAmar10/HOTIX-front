import { Ticket } from "../../../models/Ticket";
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import dateConvertor from "../../../utils/dateConvertor";
import { SellerTicket } from "../../EventModal/BuyTicketSlider/SellersSlider";
import { randomProfile } from "../../../utils/file-import";
import { Rating } from "@mui/material";
import { Bid } from "../../../models/Bid";
import "./SingleUserTicket.scss";

interface props {
  bid: Bid;
  myBid?: boolean;
  onPayNowClick?: Function;
  onViewStatus?: Function;
}

function SingleUserTicket(props: props): JSX.Element {
  const ratingValue = 3.5;
  const user = props.myBid
    ? (props.bid.id_owner as User)
    : (props.bid.id_bidder as User);

  const event = (props.bid.tickets[0] as Ticket).id_event as Event;
  const seatsAmount = (
    (props.bid.tickets as SellerTicket[])[0].ticketsArray as Ticket[]
  ).length;

  const payNowClick = () => props.onPayNowClick && props.onPayNowClick();

  const viewStatusClick = () =>
    props.onViewStatus && props.onViewStatus(props.bid);

  return (
    <div className="SingleUserTicket">
      <div className="user-details">
        <img
          src={(user.image as string) || randomProfile}
          alt="user"
          className="user-profile-image"
        />
        <div className="name-and-rating">
          <h5 className="user-name">{`${user.first_name} ${user.last_name}`}</h5>
          <Rating value={ratingValue} readOnly precision={0.5} />
        </div>
      </div>
      <div className="event-details">
        <h5 className="event-name">{event.event_name}</h5>
        <span className="event-date">{dateConvertor(event.date as Date)}</span>
      </div>
      <div className="ticket-details">
        <div className="ticket-headers">
          <h6>Seat{seatsAmount > 1 && "s"}</h6>
          <span></span> <h6>Row</h6>
        </div>
        <div className="ticket-info">
          <span>{(props.bid.tickets as Ticket[])[0].seat as string}</span>
          <span>{(props.bid.tickets as Ticket[])[0].row}</span>
        </div>
      </div>
      <div className="bid-price-area">
        {props.myBid &&
          (props.bid.isConfirmed ? (
            <>
              <span className="confirmed-span">CONFIRMED ✔</span>
              <button className="pay-now-btn" onClick={payNowClick}>
                Pay now
              </button>
            </>
          ) : (
            <div className="bid-price">
              <span>{seatsAmount + " "}tickets</span>-
              <span>{props.bid.amount * seatsAmount}$</span>
            </div>
          ))}

        {!props.myBid &&
          (props.bid.isConfirmed ? (
            <button className="view-status-btn" onClick={viewStatusClick}>
              View Status
            </button>
          ) : (
            <>
              <div className="bid-price">
                <span>{seatsAmount + " "}tickets</span>-
                <span>{props.bid.amount * seatsAmount}$</span>
              </div>
              <div className="reply-area">
                <button className="reply-btn accept" onClick={payNowClick}>
                  Accept
                </button>
                <button className="reply-btn decline">Decline</button>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default SingleUserTicket;
