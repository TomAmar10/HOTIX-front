import { LanguageProfilePage } from "../../../languageControl/Language";
import { User } from "../../../models/User";
import SingleFeedback from "./SingleFeedback";
import "./UserFeedbacks.scss";

interface props {
  user: User;
  data: LanguageProfilePage;
}

function UserFeedbacks(props: props): JSX.Element {
  const data = props.data.UserFeedbacks;
  return (
    <div className="UserFeedbacks user-page-section">
      <h4 className="section-header">{data.header}</h4>
      <hr />
      <div className="feedbacks-container">
        {props.user.ratings.map((f) => (
          <SingleFeedback feedback={f} key={f._id} />
        ))}
      </div>
    </div>
  );
}

export default UserFeedbacks;
