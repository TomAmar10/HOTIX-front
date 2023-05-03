import { Link, useSearchParams } from "react-router-dom";
import { UserEvent } from "../../../pages/ProfileTickets";
import { Ticket } from "../../../models/Ticket";
import { useState } from "react";
import SingleUserEvent from "./SingleUserEvent/SingleUserEvent";
import "./TicketsList.scss";

interface props {
  upcomingEvents: UserEvent[];
  prevEvents: UserEvent[];
}

function TicketsList(props: props): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentStatus = searchParams.get("filter")?.split("_").reverse()[0];
  const [ticketToShow, setTicketToShow] = useState<Ticket | null>(null);
  const twoHours = 1000 * 60 * 60 * 2;
  const oneHour = 1000 * 60 * 60;

  const showTicket = (ticket: Ticket | null) => {
    setTicketToShow(ticket);
  };

  return (
    <div className="TicketsList">
      <div className="tickets-status-filters">
        <Link
          to={"?filter=upcoming_events"}
          className={`filter-link ${
            currentStatus === "events" || !currentStatus ? "active-link" : ""
          }`}
        >
          <h6>Upcoming events</h6>
        </Link>
        <Link
          to={"?filter=history"}
          className={`filter-link ${
            currentStatus === "history" ? "active-link" : ""
          }`}
        >
          <h6>Events history</h6>
        </Link>
      </div>
      {currentStatus === "history" ? (
        <div className="history-container">
          {props.prevEvents?.map((event) => {
            const eventTime = new Date(event.date as Date).getTime();
            const isShowOver = new Date().getTime() > eventTime + oneHour;
            const isShowTime =
              new Date().getTime() > eventTime - twoHours &&
              eventTime + oneHour > new Date().getTime();
            return (
              <SingleUserEvent
                key={event._id}
                event={event}
                isShowTime={isShowTime}
                isShowOver={isShowOver}
                showTicket={showTicket}
              />
            );
          })}
        </div>
      ) : (
        <div className="upcoming-events-container">
          {props.upcomingEvents?.map((event) => {
            const eventTime = new Date(event.date as Date).getTime();
            const isShowOver = new Date().getTime() > eventTime + oneHour;
            const isShowTime =
              new Date().getTime() > eventTime - twoHours &&
              eventTime + oneHour > new Date().getTime();
            return (
              <SingleUserEvent
                key={event._id}
                event={event}
                isShowTime={isShowTime}
                isShowOver={isShowOver}
                showTicket={showTicket}
              />
            );
          })}
        </div>
      )}
      {ticketToShow && (
        <>
          <div className="ticket-modal">
            <img src={ticketToShow.image} alt="" className="ticket-img" />
          </div>
          <div
            className="ticket-modal-bg"
            onClick={() => setTicketToShow(null)}
          ></div>
        </>
      )}
    </div>
  );
}

export default TicketsList;
