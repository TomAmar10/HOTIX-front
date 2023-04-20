import "./NoticeMessage.scss";
import { User } from "../../../models/User";
import { useState } from "react";

interface props {
  user: User | null;
  onSubmit: Function;
  isCurrent: boolean;
}

function NoticeMessage(props: props): JSX.Element {
  const [isChecked, setIsChecked] = useState(false);

  const confirm = (e: any) => {
    setIsChecked(e.target.checked);
    props.onSubmit(e.target.checked);
  };

  return (
    <div
      className="sell-ticket-section-wrapper"
      style={{ opacity: props.isCurrent ? 1 : 0 }}
    >
      <div className="NoticeMessage">
        <h5 className="sell-ticket-section-header">
          Hey {props.user?.first_name}, Please notice
        </h5>
        <p>
          Be advised that a temporary deposit may be placed on your card to
          insure its reliability for future transactions.
        </p>
        <div className="checkbox-container">
          <input type="checkbox" onChange={confirm} checked={isChecked} />
          <span> I agree to terms & conditions</span>
        </div>
      </div>
    </div>
  );
}

export default NoticeMessage;
