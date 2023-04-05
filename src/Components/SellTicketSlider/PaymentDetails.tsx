import "./PaymentDetails.scss";
import CreditCard from "../../assets/credit-card-image.png";
import NextPrevButtons from "./NextPrevButtons/NextPrevButtons";

interface props {
  onSubmit: Function;
  onMoveBackwards:Function;
}

function PaymentDetails(props: props): JSX.Element {
  return (
    <>
    <div className="PaymentDetails" onClick={() => props.onSubmit()}>
      <h5>Upload your ticket</h5>
      <div className="details-container">
        <div className="card-details-inputs">
          <div className="single-detail">
            <label htmlFor="card-name">
              Card Name
              <button id="card-name">User Name</button>
            </label>
          </div>
          <div className="single-detail">
            <label htmlFor="card-number">
              Card Number
              <button id="card-number">4555666888333222</button>
            </label>
          </div>
          <div className="expiry-3-digits">
            <label htmlFor="card-number">
              Expiry day
              <button id="card-number">03/23</button>
            </label>
            <label htmlFor="card-number">
              CVV
              <button id="card-number">111</button>
            </label>
          </div>
        </div>
        <img src={CreditCard} alt="credit-card" className="credit-card-image" />
      </div>
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

export default PaymentDetails;
