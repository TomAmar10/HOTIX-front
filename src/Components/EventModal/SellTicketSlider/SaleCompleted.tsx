import { useDispatch } from "react-redux";
import "./SaleCompleted.scss";
import { eventActions } from "../../../store/eventSlice";
import { useNavigate } from "react-router-dom";
import { User } from "../../../models/User";

interface props {
  isCurrent: boolean;
  buyerMode?: boolean;
  sellerMode?: boolean;
  user?: User | null;
}

function SaleCompleted(props: props): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToMyOffers = () => {
    dispatch(eventActions.clearSingleEvent());
    navigate(`/profile/${props.user?._id}/offers`);
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
              Your tickets are available for bids. <br />
              View offers in your wallet, and choose the best deal for you.
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
        <button className="home-btn" onClick={goToMyOffers}>
          My Offers
        </button>
      </div>
    </div>
  );
}

export default SaleCompleted;
