import { useDispatch } from "react-redux";
import "./SaleCompleted.scss";
import { eventActions } from "../../../store/eventSlice";
import { useNavigate } from "react-router-dom";
import { User } from "../../../models/User";
import { UserModes } from "../../../store/authSlice";

interface props {
  isCurrent: boolean;
  buyerMode?: boolean;
  sellerMode?: boolean;
  user?: User | null;
  amount?: number;
}

function SaleCompleted(props: props): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToTicket = () => {
    dispatch(eventActions.clearSingleEvent());
    const goTo = props.sellerMode ? "tickets" : "offers";
    navigate(`/profile/${props.user?._id}/${goTo}`);
  };

  return (
    <div className="sell-ticket-section-wrapper">
      <div
        className="SaleCompleted"
        style={{ opacity: props.isCurrent ? 1 : 0 }}
      >
        <div className="congrats-container">
          <i className="fa-solid fa-circle-check"></i>
          <h2>CONGRATULATIONS !</h2>
          {props.sellerMode && (
            <p>
              Your
              {props.amount && props.amount > 1
                ? " tickets are "
                : " ticket is "}
              available for bids. <br />
              View all your tickets in your profile, and stay tuned for further
              actions.
            </p>
          )}
          {props.buyerMode && (
            <p>
              Your bid was successfully submitted. <br />
              You will receive a notification once the seller responds. <br />
              Stay tuned for their response and good luck!
            </p>
          )}
        </div>
        <button className="home-btn" onClick={goToTicket}>
          {props.sellerMode ? "My Tickets" : "My Offers"}
        </button>
      </div>
    </div>
  );
}

export default SaleCompleted;
