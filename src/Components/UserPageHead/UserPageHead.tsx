import { Rating } from "@mui/material";
import { User } from "../../models/User";
import { randomProfile } from "../../utils/file-import";
import { NavLink } from "react-router-dom";
import { IStore } from "../../store/store";
import { useSelector } from "react-redux";
import "./UserPageHead.scss";

interface props {
  user: User | null;
}

function UserPageHead(props: props): JSX.Element {
  const langData = useSelector(
    (state: IStore) => state.language.langData
  ).UserPageHead;
  const user = props.user;
  const navigators = ["profile", "tickets", "offers", "wallet"];
  return (
    <div className="UserPageHead">
      <div className="profile-details">
        <img
          src={user?.image || randomProfile}
          className="profile-img"
          alt={user?.first_name}
        />
        <h3 className="profile-name">{`${user?.first_name} ${user?.last_name}`}</h3>
        <Rating value={+(user?.total_rating || 0)} readOnly precision={0.5} className="rating-stars"/>
        <span className="feedbacks-amount">
          {/* {user?.ratings.length} {langData.reviews} */}
        </span>
      </div>
      <div className="nav-buttons">
        {navigators.map((n) => (
          <NavLink
            key={n}
            to={n}
            className={({ isActive }) =>
              `${isActive && "active-nav"} single-button`
            }
          >
            {(langData as any)[n]}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default UserPageHead;
