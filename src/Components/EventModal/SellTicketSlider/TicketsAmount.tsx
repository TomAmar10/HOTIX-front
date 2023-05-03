import { useState } from "react";
import { Event } from "../../../models/Event";
import { useSelector } from "react-redux";
import { IStore } from "../../../store/store";
import { UserModes } from "../../../store/authSlice";
import "./TicketsAmount.scss";

interface props {
  onSubmit: Function;
  event: Event | null;
  isCurrent: boolean;
  amount?: number;
  header?: string;
  maxToSell?: number;
}

function TicketsAmount(props: props): JSX.Element {
  const options = [1, 2, 3, 4, 5, 6];
  const [currentAmount, setCurrentAmount] = useState(props.amount);
  const userMode = useSelector((state: IStore) => state.user.mode);
  const buyOrSell = userMode === UserModes.BUYER ? "buy" : "sell";

  const amountClick = (value: number) => {
    setCurrentAmount(value);
    props.onSubmit(value);
  };

  return (
    <div
      className="sell-ticket-section-wrapper"
      style={{ opacity: props.isCurrent ? 1 : 0 }}
    >
      <div className="TicketsAmount">
        <div className="current-event-details">
          <div className="event-details">
            <h6 className="event-name">{props.event?.event_name}</h6>
            <span>{props.event?.date as string}</span>
            <span>{props.event?.location}</span>
          </div>
          <img
            className="current-event-image"
            src={props.event?.image}
            alt={props.event?.event_name}
          />
        </div>
        <h5 className={`${buyOrSell}-ticket-section-header`}>
          How many tickets would you like to
          {" " + buyOrSell}?
        </h5>
        <div className="amount-options-area">
          {options.map((o) => (
            <button
              key={o}
              className={`tickets-amount-option ${
                currentAmount === o && "current-amount"
              }`}
              value={o}
              onClick={(e: any) => amountClick(+e.target.value)}
              disabled={(props.maxToSell || 6) < o}
            >
              {o}
            </button>
          ))}
        </div>
        {(props.maxToSell || 6) < 6 && (
          <span className="max-tickets-msg">
            * You already have {6 - (props.maxToSell || 6)} tickets for sale, maximum is
            6 per event
          </span>
        )}
      </div>
    </div>
  );
}

export default TicketsAmount;
