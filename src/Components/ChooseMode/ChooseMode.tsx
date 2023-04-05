import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { User } from "../../models/User";
import { userActions, UserModes } from "../../store/authSlice";
import "./ChooseMode.scss";

interface props {
  user: User;
}

function ChooseMode(props: props): JSX.Element {
  const dispatch = useDispatch();

  const setSeller = () => dispatch(userActions.setMode(UserModes.SELLER));
  const setBuyer = () => dispatch(userActions.setMode(UserModes.BUYER));

  return (
    <>
      <h1 className="sell-buy-greet-user">
        HEY, {`${props.user.first_name} ${props.user.last_name}`.toUpperCase()}
      </h1>
      <div className="ChooseMode">
        <span>WHAT WOULD YOU LIKE TO DO TODAY?</span>
        <div className="choose-buttons-area">
          <NavLink to="/">
            <button className="sell-ticket-btn" onClick={setSeller}>
              Sell Ticket
            </button>
          </NavLink>
          <NavLink to="/">
            <button className="buy-ticket-btn" onClick={setBuyer}>
              Buy Ticket
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ChooseMode;
