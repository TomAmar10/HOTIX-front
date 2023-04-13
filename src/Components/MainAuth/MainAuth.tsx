import { Link } from "react-router-dom";
import { logoImages } from "../../utils/file-import";
import "./MainAuth.scss";

function MainAuth(): JSX.Element {
  return (
    <div className="MainAuth">
      <Link to="?auth-mode=login" className="auth-link">
        <button className="main-auth-signin">Sign In</button>
      </Link>
      <Link to="?auth-mode=register" className="auth-link">
        <button className="main-auth-register">Sign Up</button>
      </Link>
      <div className="or-separator">
        <hr />
        <span>or</span>
        <hr />
      </div>
      <span className="suggest-using-platforms">
        Use one of the following platforms
      </span>
      <div className="connect-with-platforms">
        <div className="platform-button">
          <i className="fa-brands fa-facebook-f  platform-brand"></i>
        </div>
        <div className="platform-button">
          <i className="fa-brands fa-apple fa-sm platform-brand"></i>
        </div>
        <div className="platform-button">
          <img src={logoImages.google} alt="google" />
        </div>
      </div>
      <hr />
      <p className="copyrights-area">
        © Copyrights kaki kaki kaki kaki kaki kaki kaki kaki <br />
        kaki kaki kaki kaki kaki kaki kaki kaki <br />
        kaki kaki kaki
      </p>
    </div>
  );
}

export default MainAuth;
