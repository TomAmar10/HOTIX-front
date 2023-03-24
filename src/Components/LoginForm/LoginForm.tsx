import { Form, Link, useActionData } from "react-router-dom";
import googleImage from "../../assets/google-image.png";
import "./LoginForm.scss";

function LoginForm(): JSX.Element {
  const data: any = useActionData();

  return (
      <Form className="LoginForm" method="post">
        <h3>Login</h3>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((e: any) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <div className="form-input-area">
          <input
            placeholder="Email or phone number"
            type="text"
            pattern="[0-9]*|[^@\s]+@[^@\s]+" 
            className="form-control"
            id="email-or-phone"
          />
        </div>
        <div className="form-input-area">
          <input
            placeholder="Password"
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button className="auth-login-button">Log In</button>
        <div className="auth-links-area">
          <Link to="?mode=signup" className="form-link">
            Forgot your account?
          </Link>
          <Link to="?mode=signup" className="form-link">
            New account
          </Link>
        </div>
      </Form>
  );
}

export default LoginForm;
