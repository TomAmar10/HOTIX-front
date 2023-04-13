import Rating from "@mui/material/Rating";
import { User } from "../../models/User";
import ProfileImg from "../../assets/tom-profile-img.jpeg";
import { useState } from "react";
import { Ticket } from "../../models/Ticket";
import { Event } from "../../models/Event";
import dateConvertor from "../../utils/dateConvertor";
import "./SingleSellerCard.scss";

interface props {
  user: User | null;
  amount: number;
  ticket: Ticket;
  event: Event | null;
}

function SingleSellerCard(props: props): JSX.Element {
  const [buyerBid, setBuyerBid] = useState(0);
  const value = 3.5;
  return (
    <div className="SingleSellerCard">
      <div className="owner-details">
        <img src={ProfileImg} alt="owner" className="owner-profile-image" />
        <div className="name-and-rating">
          <h5 className="owner-name">{`${props.user?.first_name} ${props.user?.last_name}`}</h5>
          <Rating value={value} readOnly precision={0.5} />
        </div>
      </div>
      <div className="event-details">
        <h5 className="event-name">{props.event?.event_name}</h5>
        <span className="event-date">
          {dateConvertor(props.event?.date as Date)}
        </span>
      </div>
      <div className="ticket-details">
        <div className="ticket-headers">
          <h6>Seats</h6> <span>|</span> <h6>Row</h6> <span>|</span>
          <h6>Tickets</h6>
        </div>
        <div className="ticket-info">
          <span>{props.ticket.seat as string}</span>
          <span>{props.ticket.row}</span>
          <span>{props.amount}</span>
        </div>
      </div>
      <div className="price-area">
        <label>Price per ticket</label>
        <input
          type="number"
          className="bid-price-input"
          placeholder="0 "
          onChange={(e) => setBuyerBid(+e.target.value)}
        />
        <div className="total-price-calculate">
          <h6 className="total-price">Total Price:</h6>
          <span>{buyerBid * props.amount}$</span>
        </div>
        <button className="place-bid-button">Place a bid</button>
      </div>
    </div>
  );
}

export default SingleSellerCard;
