import { Link, useSearchParams } from "react-router-dom";
import { UserEvent } from "../../../pages/ProfileTickets";
import { Ticket } from "../../../models/Ticket";
import { useState } from "react";
import SingleUserEvent from "./SingleUserEvent/SingleUserEvent";
import { User } from "../../../models/User";
import Feedback from "./Feedback/Feedback";
import "./TicketsList.scss";
import { Deal } from "../../../models/Deal";
import { useSelector } from "react-redux";
import { IStore } from "../../../store/store";
import { Event } from "../../../models/Event";
import NoBidsToShow from "../OffersList/NoBidsToShow/NoBidsToShow";

interface props {
  upcomingEvents: UserEvent[];
  prevEvents: UserEvent[];
  user: User | null;
}

function TicketsList(props: props): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentStatus = searchParams.get("filter")?.split("_").reverse()[0];
  const [ticketToShow, setTicketToShow] = useState<Ticket | null>(null);
  const [dealToRate, setDealToRate] = useState<Deal | null>(null);
  const [userToRate, setUserToRate] = useState<User | null>(null);
  const userOffers = useSelector(
    (state: IStore) => state.userBids.receivedBidsWaiting
  );
  const biddenEvents: string[] = [];
  userOffers?.forEach((o) =>
    biddenEvents.push(
      ((o.tickets as Ticket[])[0].id_event as Event)._id as string
    )
  );
  const twoHours = 1000 * 60 * 60 * 2;
  const oneHour = 1000 * 60 * 60;

  const showTicket = (ticket: Ticket | null) => {
    setTicketToShow(ticket);
  };

  const rateClick = (userToRate: User, deal: Deal) => {
    setDealToRate(deal);
    setUserToRate(userToRate);
  };

  const removeModal = () => {
    setUserToRate(null);
    setTicketToShow(null);
    setDealToRate(null);
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
                onRateClick={rateClick}
                user={props.user}
                offersAmount={0}
                buyer
              />
            );
          })}
        </div>
      ) : (
        <>
          {props.upcomingEvents.length > 0 && (
            <div className="upcoming-events-container">
              {props.upcomingEvents?.map((event) => {
                const eventTime = new Date(event.date as Date).getTime();
                const isShowOver = new Date().getTime() > eventTime + oneHour;
                const isShowTime =
                  new Date().getTime() > eventTime - twoHours &&
                  eventTime + oneHour > new Date().getTime();
                let offersAmount = 0;
                for (let i = 0; i < biddenEvents.length; i++) {
                  if (biddenEvents[i] === event._id) offersAmount++;
                }
                return (
                  <SingleUserEvent
                    key={event._id}
                    event={event}
                    isShowTime={isShowTime}
                    isShowOver={isShowOver}
                    showTicket={showTicket}
                    onRateClick={rateClick}
                    user={props.user}
                    offersAmount={offersAmount}
                  />
                );
              })}
            </div>
          )}
          {props.upcomingEvents.length < 1 && <NoBidsToShow upcomingEvents />}
        </>
      )}
      {(ticketToShow || userToRate) && (
        <>
          <div className="ticket-modal-bg" onClick={removeModal}></div>
          <div className="ticket-modal">
            {ticketToShow && (
              <img src={ticketToShow.image} alt="" className="ticket-img" />
            )}
            {userToRate && (
              <Feedback
                userToRate={userToRate}
                dealToRate={dealToRate}
                user={props.user}
                onClose={removeModal}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TicketsList;
