import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import { userActions, UserModes } from "../../store/authSlice";
import "./ChooseMode.scss";
import { useEffect } from "react";
import { IStore } from "../../store/store";


function ChooseMode(): JSX.Element {
  const dispatch = useDispatch();
  const setSeller = () => dispatch(userActions.setMode(UserModes.SELLER));
  const setBuyer = () => dispatch(userActions.setMode(UserModes.BUYER));
  const user = useSelector((state: IStore) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  return (
    <>
      {user ? (
        <>
          <h1 className="sell-buy-greet-user">
            HEY,
            {`${user.first_name} ${user.last_name}`.toUpperCase()}
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
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ChooseMode;
