import { NavLink } from "react-router-dom";
import "./ChooseSellBuy.scss";

function ChooseSellBuy(): JSX.Element {
  return (
    <>
      <h1 className="sell-buy-greet-user">HEY, RAN ASIF</h1>
      <div className="ChooseSellBuy">
        <span>WHAT WOULD YOU LIKE TO DO TODAY?</span>
        <div className="choose-buttons-area">
          <NavLink to="/">
            <button className="sell-ticket-btn">Sell Ticket</button>
          </NavLink>
          <NavLink to="/">
            <button className="buy-ticket-btn">Buy Ticket</button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ChooseSellBuy;
