import { Bid } from "../../../../models/Bid";
import { Event } from "../../../../models/Event";
import { Ticket } from "../../../../models/Ticket";
import { User } from "../../../../models/User";
import dateConvertor from "../../../../utils/dateConvertor";
import "./BidStatus.scss";

interface props {
  bid: Bid;
  user: User | null;
  clearModal: Function;
}

function BidStatus(props: props): JSX.Element {
  const event = (props.bid.tickets[0] as Ticket).id_event as Event;
  const eventDate = dateConvertor(event.date as string);

  const isConfirmed = props.bid.isConfirmed;
  const currentStep = isConfirmed ? 2 : 1;

  const sellerSteps = {
    step1: `An offer was sent by ${(props.bid.id_bidder as User).first_name} ${
      (props.bid.id_bidder as User).last_name
    }`,
    step2: `You have approved a security deposit`,
    step3: ` ${(props.bid.id_bidder as User).first_name} ${
      (props.bid.id_bidder as User).last_name
    } has completed his payment`,
    step4: `${eventDate} - SHOW TIME`,
    step5: "Money has transferred to your wallet",
  };

  return (
    <div className="BidStatus">
      <h5 className="status-header">Event Status</h5>
      <div className="bid-ticket">
        <div className="bid-ticket-section">
          <h6 className="event-name">{event.event_name}</h6>
          <span>{eventDate}</span>
          <span>{event.location}</span>
        </div>
        <div className="bid-ticket-section">
          <span className="bid-price">Bid price:</span>
          <span className="price">{props.bid.amount} $</span>
          <div className="seat-details">
            <section className="seat-section">
              <span className="detail-header">Seat</span>
              {(props.bid.tickets[0] as Ticket).seat as string}
            </section>
            |
            <section className="seat-section">
              <span className="detail-header">Row</span>
              {(props.bid.tickets[0] as Ticket).row}
            </section>
            |
            <section className="seat-section">
              <span className="detail-header">Area</span>
              {(props.bid.tickets[0] as Ticket).area}
            </section>
          </div>
        </div>
      </div>
      <div className="dots-line-through"></div>
      <div className="steps-container">
        {Object.values(sellerSteps).map((s, i) => (
          <div className="single-step" key={s}>
            <span
              className={`step-dot ${currentStep > i ? "done" : ""}`}
            ></span>
            <span className="step-description">{s}</span>
          </div>
        ))}
      </div>
      <div className="ok-button-holder">
        <button className="ok-button" onClick={() => props.clearModal()}>
          OK
        </button>
      </div>
    </div>
  );
}

export default BidStatus;
