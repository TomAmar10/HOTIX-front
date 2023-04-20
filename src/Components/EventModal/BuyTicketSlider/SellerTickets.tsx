import { useEffect, useState } from "react";
import { User } from "../../../models/User";
import { Event } from "../../../models/Event";
import { SellerTicket } from "./SellersSlider";
import "./SellerTickets.scss";
import { Ticket } from "../../../models/Ticket";

interface props {
  onSubmit: Function;
  isCurrent: boolean;
  user: User | null;
  event: Event | null;
  currentSeller: SellerTicket | null;
}

function SellerTickets(props: props): JSX.Element {
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
  const [currentBid, setCurrentBid] = useState<number>(0);

  useEffect(() => {
    setSelectedTickets([]);
    setCurrentBid(0);
  }, [props.isCurrent]);

  const toggleTicket = (ticket: Ticket) => {
    const index = selectedTickets.findIndex((s) => s._id === ticket._id);
    const newTickets = [...selectedTickets];
    index === -1 ? newTickets.push(ticket) : newTickets.splice(index, 1);
    setSelectedTickets(newTickets);
    props.onSubmit(currentBid, newTickets);
  };

  const changeBid = (value: number) => {
    setCurrentBid(value);
    props.onSubmit(value, selectedTickets);
  };

  return (
    <div
      className="sell-ticket-section-wrapper"
      style={{ opacity: props.isCurrent ? 1 : 0 }}
    >
      <div className="SellerTickets">
        <h5 className="buy-ticket-section-header">
          Choose your tickets and place a bid
        </h5>
        <div className="all-tickets">
          {props.currentSeller?.ticketsArray.map((t) => (
            <label
              className={`single-ticket-label ${
                selectedTickets.includes(t) ? "selected" : ""
              }`}
              key={t._id}
            >
              <input
                type="checkbox"
                className="ticket-checkbox"
                onChange={() => toggleTicket(t)}
                checked={selectedTickets.includes(t)}
              />
              <div className="single-ticket">
                <div className="single-ticket-headers">
                  <h6>Seat</h6>
                  <h6>Row</h6>
                  <h6>Area</h6>
                </div>
                <div className="single-ticket-details">
                  <span>{t.seat as string}</span>
                  <span>{t.row}</span>
                  <span>{t.area}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
        <hr />
        <div className="bid-area">
          <h5 className="buy-ticket-section-header">Price per ticket</h5>
          <input
            type="number"
            className="bid-amount-input"
            onChange={(e) => changeBid(+e.target.value)}
            value={currentBid || ""}
          />
          <span className="price-calculate">
            {currentBid} X {selectedTickets.length}
          </span>
          <h5 className="current-bid">
            Your bid : {currentBid * selectedTickets.length} $
          </h5>
        </div>
      </div>
    </div>
  );
}

export default SellerTickets;
