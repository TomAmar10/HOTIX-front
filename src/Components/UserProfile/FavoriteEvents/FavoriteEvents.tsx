import { LanguageProfilePage } from "../../../languageControl/Language";
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import "./FavoriteEvents.scss";

interface props {
  user: User;
  favorites: Event[];
  data: LanguageProfilePage;
}

function FavoriteEvents(props: props): JSX.Element {
  const data = props.data.FavoriteEvents;
  return (
    <div className="FavoriteEvents user-page-section">
      <h4 className="section-header">{data.header}</h4>
      <hr />
      <div className="favorite-events-container">
        {props.favorites.map((e) => e._id)}
      </div>
    </div>
  );
}

export default FavoriteEvents;
