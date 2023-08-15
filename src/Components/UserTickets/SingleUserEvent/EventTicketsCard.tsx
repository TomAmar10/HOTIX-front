import { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import format from "date-fns/format";
import { UserEventTickets } from "../../../store/userTicketsSlice";
import { getSign } from "../../../utils/currencyHandler";
import { LanguageUserTickets } from "../../../languageControl/Language";
import "./EventTicketsCard.scss";

interface props {
  eventTicket: UserEventTickets;
  data: LanguageUserTickets;
  isHebrew: boolean;
}

function EventTicketsCard(props: props): JSX.Element {
  const data = props.data.EventTicketsCard;
  const [isCurrent, setIsCurrent] = useState(false);
  const tickets = props.eventTicket.ticketsArray;
  const forSaleCount = props.eventTicket.ticketsArray.filter(
    (t) => t.open_for_sale
  ).length;
  const showTickets = () => {
    setIsCurrent((prev) => !prev);
  };

  return (
    <div className="user-event-container">
      <div className="EventTicketsCard" key={`${props.eventTicket._id}-event`}>
        <img
          src={props.eventTicket.image}
          className="event-image"
          alt={props.eventTicket._id}
        />
        <div className="event-details">
          <h5 className="event-name">{props.eventTicket.event_name}</h5>
          <div className="event-date">
            <CalendarMonthIcon className="details-icon" />
            <p>
              <span>{data.eventDate}</span> :{" "}
              {format(new Date(props.eventTicket.date), "dd MMM, p")}
            </p>
          </div>
          <div className="event-location">
            <LocationOnIcon className="details-icon" />
            <p>
              <span>{data.location}</span> : {props.eventTicket.location}
            </p>
          </div>
          <p className="event-description">{props.eventTicket.description}</p>
        </div>
        <div className="tickets-section">
          {forSaleCount > 0 && (
            <div className={`for-sale-sign ${props.isHebrew && "hebrew"}`}>
              {forSaleCount} {data.ticketsForSale}
            </div>
          )}
          <button className="view-tickets-btn" onClick={showTickets}>
            {isCurrent ? data.close : data.viewTickets}
          </button>
          <span>
            {props.eventTicket.ticketsArray.length} {data.tickets}
          </span>
        </div>
      </div>
      {isCurrent && (
        <div className="event-tickets">
          {tickets.map((t, i) => (
            <div key={`${t._id}-event-ticket`}>
              <div className="single-ticket">
                <div>
                  {data.area}: <span>{t.area}</span>
                </div>
                <div>
                  {data.seat}: <span>{t.seat as string} </span>
                </div>
                <div>
                  {data.row}: <span>{t.row}</span>
                </div>
                <div>
                  {data.price}:
                  <span>
                    {t.price as number}
                    {getSign(t.currency)}
                  </span>
                </div>
              </div>
              {i < tickets.length - 1 && <hr />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventTicketsCard;
