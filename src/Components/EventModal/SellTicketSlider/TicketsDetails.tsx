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
  const types = ["Regular", "VIP", "Student"];
  const currencies = ["USD", "ILS", "EUR"];
  const [updatedTickets, setUpdatedTickets] = useState(props.tickets);
  const [area, setArea] = useState("");

  const onTicketChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const value = event.target.value;
    const ticketsCopy = [...updatedTickets];
    if (index) (ticketsCopy[index - 1] as any)[field] = value;
    else ticketsCopy.map((t: any) => (t[field] = value));
    const isValid = event.target.form?.checkValidity();
    props.onSubmit(updatedTickets, isValid);
    if (field === "area") setArea(value);
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
              <select
                onChange={(e) => onTicketChange("type", e)}
                defaultValue={types[0]}
                required
              >
                {types.map((t) => (
                  <option value={t} key={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="0"
                min={1}
                required
                onChange={(e) => onTicketChange("price", e)}
              />
              <select onChange={(e) => onTicketChange("currency", e)} required>
                {currencies.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
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
                  placeholder={(index + 1).toString()}
                  required
                  onChange={(e) => onTicketChange("seat", e, index + 1)}
                />
                <input
                  type="number"
                  maxLength={3}
                  placeholder="1"
                  required
                  onChange={(e) => onTicketChange("row", e, index + 1)}
                />
                <input
                  type="text"
                  placeholder="C"
                  required
                  value={area}
                  onChange={(e) => onTicketChange("area", e)}
                />
              </div>
            ))}
          </div>
        </form>
        <span className="few-areas-message">
          * Separate sales are required for tickets with different areas
        </span>
      </div>
    </div>
  );
}

export default TicketsDetails;
