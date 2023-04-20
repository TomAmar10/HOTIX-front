import Rating from "@mui/material/Rating";
import { User } from "../../../models/User";
import ProfileImg from "../../../assets/tom-profile-img.jpeg";
import { SellerTicket } from "./SellersSlider";
import "./SingleSellerCard.scss";

interface props {
  ticket: SellerTicket;
  onClick?: Function;
  isActive?: boolean;
}

function SingleSellerCard(props: props): JSX.Element {
  const value = 3.5;
  return (
    <div className="single-seller-container">
      <div className="SingleSellerCard">
        <div className="owner-details">
          <img src={ProfileImg} alt="owner" className="owner-profile-image" />
          <div className="name-and-rating">
            <h5 className="owner-name">{`${
              (props.ticket?.id_owner as User).first_name
            } ${(props.ticket?.id_owner as User).last_name}`}</h5>
            <Rating value={value} readOnly precision={0.5} />
          </div>
        </div>
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
            className={`show-tickets-button ${
              props.isActive ? "active-seller" : ""
            }`}
            onClick={() => props.onClick && props.onClick()}
          >
            <span className="amount">{props.ticket.ticketsArray.length}</span>{" "}
            Tickets
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleSellerCard;
