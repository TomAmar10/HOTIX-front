import { User } from "../../../models/User";
import UserImage from "../../../assets/random-profile.png";
import { Rating } from "@mui/material";
import { Feedback } from "../../../models/Feedback";
import { format } from "date-fns";
import "./SingleFeedback.scss";

interface props {
  feedback: Feedback;
}

function SingleFeedback(props: props): JSX.Element {
  const rater = props.feedback.id_posted as User;
  const raterName = rater.first_name || "Deleted user";
  return (
    <div className="SingleFeedback">
      <div className="left-side">
        <div className="rating-user">
          <img
            src={rater.image || UserImage}
            alt={rater.first_name}
            className="image"
          />
          <div className="details">
            <h6 className="user-name">{raterName}</h6>
            <span className="time-create">
              {format(new Date(props.feedback.time_create as string), "Pp")}
            </span>
          </div>
        </div>
        <p className="comment">{props.feedback.comment}</p>
      </div>
      <div className="right-side">
        <Rating value={+props.feedback.star} readOnly precision={0.5} />
      </div>
    </div>
  );
}

export default SingleFeedback;
