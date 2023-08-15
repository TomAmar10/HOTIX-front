import { User } from "../../models/User";
import { randomProfile } from "../../utils/file-import";
import Rating from "@mui/material/Rating";
import { Feedback } from "../../models/Feedback";
import SingleFeedback from "../UserProfile/UserFeedbacks/SingleFeedback";
import "./UserPopup.scss";

interface props {
  user: User | null;
  onHidePopup: Function;
}

function UserPopup(props: props): JSX.Element {
  const hidePopup = () => props.onHidePopup();
  const value = +(props.user?.total_rating || 0);
  return (
    <>
      <div className="UserPopup">
        <div className="top">
          <img src={props.user?.image || randomProfile} alt="user" />
          <div className="name-and-rating">
            <h3 className="user-name">
              {props.user?.first_name} {props.user?.last_name}
            </h3>
            <Rating
              value={value}
              readOnly
              size="large"
              precision={0.5}
              className="user-total-rating"
            />
          </div>
        </div>
        {props.user?.ratings && props.user?.ratings.length > 0 ? (
          <div className="feedbacks">
            <h5 className="header">Feedbacks</h5>
            <div className="feedback-list">
              {props.user?.ratings.map((r: Feedback) => (
                <SingleFeedback feedback={r} key={`${r._id}-rate`} />
              ))}
            </div>
          </div>
        ) : (
          <p className="no-feedback-msg">
            {props.user?.first_name} has no feedbacks yet.
          </p>
        )}
      </div>
      <div className="popup-holder" onClick={hidePopup}></div>
    </>
  );
}

export default UserPopup;
