import { useState } from "react";
import { Event } from "../../models/Event";
import { categoryImages as images } from "../../utils/file-import";
import NextPrevButtons from "./NextPrevButtons/NextPrevButtons";
import "./TicketsAmount.scss";

interface props {
  onSubmit: Function;
  event: Event | null;
}

function TicketsAmount(props: props): JSX.Element {
  const options = [1, 2, 3, 4, 5, 6];
  const [currentAmount, setCurrentAmount] = useState(0);

  return (
    <div className="sell-ticket-section-wrapper">
      <div className="TicketsAmount">
        <div className="current-event-details">
          <div className="event-details">
            <h6 className="event-name">{props.event?.event_name}</h6>
            <span>{props.event?.date as string}</span>
            <span>{props.event?.location}</span>
          </div>
          <img
            className="current-event-image"
            src={
              props.event &&
              images[props.event.id_category.name.replace(" ", "_")]
            }
            alt=""
          />
        </div>
        <h5>How many tickets would you like to sell?</h5>
        <div className="amount-options-area">
          {options.map((o) => (
            <button
              key={o}
              className={`tickets-amount-option ${
                currentAmount === o && "current-amount"
              }`}
              value={o}
              onClick={(e: any) => setCurrentAmount(+e.target.value)}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
      <NextPrevButtons
        allowNext={currentAmount > 0}
        onMoveForward={() => props.onSubmit(currentAmount)}
        onMoveBackwards={undefined}
        isFirstStep
      />
    </div>
  );
}

export default TicketsAmount;
