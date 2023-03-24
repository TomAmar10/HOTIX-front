import { NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar(): JSX.Element {
  return (
    <div className="Navbar">
      <NavLink to="/auth?mode=login">Login</NavLink>
    </div>
  );
}

export default Navbar;
