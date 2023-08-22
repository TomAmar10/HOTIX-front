import { Ticket } from "../../../models/Ticket";
import { useEffect, useState } from "react";
import { LanguageSellerModal } from "../../../languageControl/Language";
import "./TicketsDetails.scss";

interface props {
  tickets: Ticket[];
  onSubmit: Function;
  data: LanguageSellerModal;
  isHebrew: boolean;
}

function TicketsDetails(props: props): JSX.Element {
  const data = props.data.TicketsDetails;
  const types = ["Regular", "VIP", "Student"];
  const currencies = ["USD", "ILS", "EUR"];
  const [updatedTickets, setUpdatedTickets] = useState(props.tickets);

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
  };

  useEffect(() => {
    setUpdatedTickets(props.tickets);
  }, [props]);

  return (
    <div className="TicketsDetails">
      <h5 className="sell-ticket-section-header">{data.header}</h5>
      <form className="details-inputs-area">
        <div className="details-section">
          <label htmlFor="type">
            Type
            <select
              id="type"
              onChange={(e) => onTicketChange("type", e)}
              defaultValue={types[0]}
              required
            >
              {data.types.map((t: string, i: number) => (
                <option value={types[i]} key={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="area">
            Area
            <input
              id="area"
              type="text"
              placeholder="C"
              required
              onChange={(e) => onTicketChange("area", e)}
            />
          </label>
          <label htmlFor="currency">
            Currency
            <select onChange={(e) => onTicketChange("currency", e)} required>
              {data.currencies.map((c: string, i: number) => (
                <option value={currencies[i]} key={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="price">
            Price
            <input
              id="price"
              type="number"
              placeholder="0"
              min={1}
              required
              onChange={(e) => onTicketChange("price", e)}
            />
          </label>
        </div>
        <hr />
        <div className="details-section">
          <label htmlFor="seat">
            Seat
            <input
              type="number"
              id="seat"
              placeholder={"1"}
              required
              onChange={(e) => onTicketChange("seat", e, 1)}
            />
            {props.tickets.slice(1).map((t, index) => (
              <input
                key={t._id + "-seat-" + index}
                type="number"
                id="seat"
                placeholder={(index + 2).toString()}
                required
                onChange={(e) => onTicketChange("seat", e, index + 2)}
              />
            ))}
          </label>
          <label htmlFor="row">
            Row
            <input
              id="row"
              type="number"
              maxLength={3}
              placeholder="1"
              required
              onChange={(e) => onTicketChange("row", e, 1)}
            />
            {props.tickets.slice(1).map((t, index) => (
              <input
                key={t._id + "-row-" + index}
                id="row"
                type="number"
                maxLength={3}
                placeholder="1"
                required
                onChange={(e) => onTicketChange("row", e, index + 2)}
              />
            ))}
          </label>
        </div>
      </form>
      <span className={`few-areas-message ${props.isHebrew && "hebrew"}`}>
        {data.areaMsg}
      </span>
    </div>
  );
}

export default TicketsDetails;
