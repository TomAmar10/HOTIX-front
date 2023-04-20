import { NavLink } from "react-router-dom";
import "./ProfileNav.scss";


function ProfileNav(): JSX.Element {
  const linkClass = "profile-nav-btn";
  const activeClass = linkClass + " active-btn";
  const links = ["tickets", "offers", "payments", "wallet"];
  return (
    <div className="ProfileNav">
      {links.map((l) => (
        <NavLink key={l}
          to={`${l}`}
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
          end
        >
          {l[0].toUpperCase() + l.slice(1)}
        </NavLink>
      ))}
    </div>
  );
}

export default ProfileNav;
