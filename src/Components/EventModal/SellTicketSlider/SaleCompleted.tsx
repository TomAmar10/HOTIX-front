import { useDispatch } from "react-redux";
import "./SaleCompleted.scss";
import { eventActions } from "../../../store/eventSlice";

interface props {
  isCurrent: boolean;
  buyerMode?: boolean;
  sellerMode?: boolean;
}

function SaleCompleted(props: props): JSX.Element {
  const dispatch = useDispatch();

  const hideModal = () => {
    dispatch(eventActions.clearSingleEvent());
  };

  return (
    <div className="sell-ticket-section-wrapper">
      <div
        className="SaleCompleted"
        style={{ opacity: props.isCurrent ? 1 : 0 }}
      >
        <i className="fa-solid fa-circle-check"></i>
        <h2>CONGRATULATIONS !!!</h2>
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
        <button className="home-btn" onClick={hideModal}>
          Home
        </button>
      </div>
    </div>
  );
}

export default SaleCompleted;
