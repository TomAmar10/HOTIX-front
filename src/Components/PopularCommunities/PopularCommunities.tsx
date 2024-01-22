import { Link } from "react-router-dom";
import { Community } from "../../models/Community";
import "./PopularCommunities.scss";

interface props {
  communities: Community[];
}

function PopularCommunities(props: props): JSX.Element {
  return (
    <div className="PopularCommunities">
      <h2 className="communities-header">Communities</h2>
      <div className="communities-container">
        {props.communities.map((c) => (
          <Link
            to={`/community/${c._id}`}
            className="single-community"
            key={c._id + "-fav-com"}
          >
            <img src={c.image} alt={c.name} />
            <h4 className="community-name">{c.name}</h4>
            <span className="members-amount">144 members</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularCommunities;
