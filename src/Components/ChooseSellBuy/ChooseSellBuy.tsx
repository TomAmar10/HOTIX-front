import { NavLink } from "react-router-dom";
import { User } from "../../models/User";
import "./ChooseSellBuy.scss";

interface props {
  user: User;
}

function ChooseSellBuy(props: props): JSX.Element {
  return (
    <>
      <h1 className="sell-buy-greet-user">
        HEY, {`${props.user.first_name} ${props.user.last_name}`.toUpperCase()}
      </h1>
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
