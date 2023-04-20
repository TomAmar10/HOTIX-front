import CreditCard from "../../../assets/credit-card-image.png";
import { logoImages } from "../../../utils/file-import";
import { useForm } from "react-hook-form";
import { card_details } from "../../../models/CreditCard";
import { useEffect } from "react";
import "./PaymentDetails.scss";

interface props {
  price: number;
  onSubmit: Function;
  isCurrent: boolean;
}

function PaymentDetails(props: props): JSX.Element {
  const { register, formState, watch } = useForm<card_details>();
  const formWatch = watch();

  useEffect(() => {
    props.onSubmit(formWatch, formState.isValid);
  }, [formState.isValid]);

  return (
    <div
      className="sell-ticket-section-wrapper"
      style={{ opacity: props.isCurrent ? 1 : 0 }}
    >
      <div className="PaymentDetails">
        <div className="credit-card-image-container">
          <img
            src={CreditCard}
            alt="credit-card"
            className="credit-card-image"
          />
        </div>
        <form className="credit-card-form">
          <div className="use-saved-card-area">
            <label className="use-saved-label">Use saved card:</label>
            <select {...register("card_type", { required: true })}>
              <option value="mastercard">Mastercard</option>
              <option value="visa">VISA</option>
            </select>
          </div>
          <div className="card-form-section">
            <label>Name on card:</label>
            <input
              type="text"
              maxLength={50}
              {...register("card_name", { minLength: 2, required: true })}
            />
          </div>
          <div className="card-form-section">
            <label>Card number:</label>
            <input
              type="text"
              {...register("card_number", {
                required: true,
                minLength: 10,
                maxLength: 16,
              })}
            />
          </div>
          <div className="expiry-3-digits-area">
            <div className="expiry-section">
              <label>Expiry date:</label>
              <input type="date" {...register("date", { required: true })} />
            </div>
            <div className="ccv-section">
              <label>CCV:</label>
              <input
                type="password"
                {...register("digits", {
                  required: true,
                  minLength: 3,
                  maxLength: 3,
                })}
              />
            </div>
          </div>
        </form>
        <div className="credit-logos">
          <img src={logoImages.visa} alt="visa" />
          <img src={logoImages.masterCard} alt="mastercard" />
          <img src={logoImages.americanExpress} alt="amex" />
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
