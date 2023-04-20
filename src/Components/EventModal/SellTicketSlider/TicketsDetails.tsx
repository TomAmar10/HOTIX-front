import TicketImage from "../../../assets/ticket-image.png";
import { Ticket } from "../../../models/Ticket";
import { useEffect, useState } from "react";
import "./TicketsDetails.scss";

interface props {
  tickets: Ticket[];
  onSubmit: Function;
  isCurrent: boolean;
}

function TicketsDetails(props: props): JSX.Element {
  const [updatedTickets, setUpdatedTickets] = useState(props.tickets);

  const onTicketChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const ticketsCopy = [...updatedTickets];
    if (index) (ticketsCopy[index - 1] as any)[field] = event.target.value;
    else ticketsCopy.map((t: any) => (t[field] = event.target.value));
    const isValid = event.target.form?.checkValidity();
    props.onSubmit(updatedTickets, isValid);
  };

  useEffect(() => {
    setUpdatedTickets(props.tickets);
  }, [props]);

  return (
    <div
      className="sell-ticket-section-wrapper"
      style={{ opacity: props.isCurrent ? 1 : 0 }}
    >
      <div className="TicketsDetails">
        <img src={TicketImage} alt="ticket" className="ticket-image" />
        <h5 className="sell-ticket-section-header">
          Please fill your ticket information
        </h5>
        <form className="details-inputs-area">
          <div className="inputs-section">
            <div className="labels">
              <label>Type</label>
              <label>Ticket Price</label>
              <label>Currency</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                placeholder="VIP"
                required
                onChange={(e) => onTicketChange("type", e)}
              />
              <input
                type="number"
                placeholder="300"
                required
                onChange={(e) => onTicketChange("price", e)}
              />
              <input
                type="text"
                placeholder="US Dollar $"
                required
                onChange={(e) => onTicketChange("currency", e)}
              />
            </div>
          </div>
          <hr />
          <div className="inputs-section">
            <div className="labels">
              <label>Seat Number</label>
              <label>Seat Row</label>
              <label>Seat Area</label>
            </div>
            {props.tickets.map((t, index) => (
              <div key={index} className="inputs">
                {props.tickets.length > 1 && (
                  <div className="ticket-index">
                    <span>#</span>
                    {index + 1}
                  </div>
                )}
                <input
                  type="number"
                  placeholder="21"
                  required
                  onChange={(e) => onTicketChange("seat", e, index + 1)}
                />
                <input
                  type="text"
                  maxLength={3}
                  placeholder="9"
                  required
                  onChange={(e) => onTicketChange("row", e, index + 1)}
                />
                <input
                  type="text"
                  placeholder="C"
                  required
                  onChange={(e) => onTicketChange("area", e, index + 1)}
                />
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketsDetails;
