import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserModes } from "../../store/authSlice";
import { IStore } from "../../store/store";
import ModeSwitch from "../UI/ModeSwitch/ModeSwitch";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LanguageMenu from "./LanguageMenu";
import "./TopNavbar.scss";

function TopNavbar(): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  const data = langData.TopNavbar;
  const user = useSelector((state: IStore) => state.user.user);
  const userMode = useSelector((state: IStore) => state.user.mode);
  const navigate = useNavigate();

  const navToFavorites = () => {
    navigate(`/profile/${user?._id}/profile?section=favorites`);
  }

  return (
    <div className="TopNavbar">
      <div className="header-navigator">
        {user && (
          <>
            <ModeSwitch
              isSeller={userMode === UserModes.SELLER}
              data={data.modeSwitch}
            />
            <NotificationsActiveIcon className="icon" />
            <FavoriteIcon className="icon" onClick={navToFavorites}/>
          </>
        )}
        <LanguageMenu data={data} />
        {!user && (
          <>
            <NavLink to={"/auth"} className="header-btn">
              {data.login}
            </NavLink>
          </>
        )}
      </div>
      <h5 className="hotix-header">Hotix</h5>
    </div>
  );
}

export default TopNavbar;
