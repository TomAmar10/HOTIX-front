import "./SecureDepositMsg.scss";
import { User } from "../../../models/User";
import { useState } from "react";

interface props {
  user: User | null;
  onSubmit: Function;
}

function SecureDepositMsg(props: props): JSX.Element {
  const [isChecked, setIsChecked] = useState(false);

  const confirm = (e: any) => setIsChecked(e.target.checked);

  const nextClick = () => props.onSubmit();

  return (
    <div className="SecureDepositMsg">
      <h5 className="sell-ticket-section-header">
        Hey {props.user?.first_name}, Please notice
      </h5>
      <p>
        Be advised that a temporary deposit may be placed on your card to insure
        its reliability for future transactions.
      </p>
      <div className="checkbox-container">
        <input type="checkbox" onChange={confirm} checked={isChecked} />
        <span> I agree to terms & conditions</span>
      </div>
      <button className="next-btn" onClick={nextClick} disabled={!isChecked}>
        Next
      </button>
    </div>
  );
}

export default SecureDepositMsg;
