import { useState } from "react";
import NextPrevButtons from "./NextPrevButtons/NextPrevButtons";
import "./TicketType.scss";

interface props {
  onSubmit: Function;
  onMoveBackwards: Function;
}

function TicketType(props: props): JSX.Element {
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const types = ["VIP", "Regular", "Student"];

  return (
    <>
      <div className="TicketType">
        <h5>Ticket Type</h5>
        <div className="ticket-types">
          {types.map((t) => (
            <button
              key={t}
              className={`single-type ${type === t ? "current" : ""}`}
              onClick={() => setType(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="add-condition-btn">Add a special condition</button>
        <p>
          Original price
          <input
            onChange={(v) => setPrice(+v.target.value)}
            type="text"
            required
            defaultValue={"0.00"}
            className="ticket-price"
          />
          ILS
        </p>
      </div>
      <NextPrevButtons
        allowNext
        onMoveForward={() => props.onSubmit()}
        onMoveBackwards={props.onMoveBackwards}
        isFirstStep={false}
      />
    </>
  );
}

export default TicketType;
