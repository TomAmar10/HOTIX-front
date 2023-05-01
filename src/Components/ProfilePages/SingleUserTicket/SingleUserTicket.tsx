import { Ticket } from "../../../models/Ticket";
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import dateConvertor from "../../../utils/dateConvertor";
import { SellerTicket } from "../../EventModal/BuyTicketSlider/SellersSlider";
import ProfileImg from "../../../assets/tom-profile-img.jpeg";
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

  const payNowClick = () => props.onPayNowClick && props.onPayNowClick();

  const viewStatusClick = () =>
    props.onViewStatus && props.onViewStatus(props.bid);

  return (
    <div className="SingleUserTicket">
      <div className="user-details">
        <img src={ProfileImg} alt="user" className="user-profile-image" />
        <div className="name-and-rating">
          <h5 className="user-name">{`${user.first_name} ${user.last_name}`}</h5>
          <Rating value={ratingValue} readOnly precision={0.5} />
        </div>
      </div>
      <div className="event-details">
        <h5 className="event-name">
          {((props.bid.tickets[0] as Ticket).id_event as Event).event_name}
        </h5>
        <span className="event-date">
          {dateConvertor(
            ((props.bid.tickets[0] as Ticket).id_event as Event).date as Date
          )}
        </span>
      </div>
      <div className="ticket-details">
        <div className="ticket-headers">
          <h6>Seats</h6> <span></span> <h6>Row</h6>
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
              <span>
                {(props.bid.tickets as SellerTicket[])[0].ticketsArray.length +
                  " "}
                tickets
              </span>
              -
              <span>
                {props.bid.amount *
                  (props.bid.tickets as SellerTicket[])[0].ticketsArray.length}
                $
              </span>
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
                <span>
                  {(props.bid.tickets as SellerTicket[])[0].ticketsArray
                    .length + " "}
                  tickets
                </span>
                -
                <span>
                  {props.bid.amount *
                    (props.bid.tickets as SellerTicket[])[0].ticketsArray
                      .length}
                  $
                </span>
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
