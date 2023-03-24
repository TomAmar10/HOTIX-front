import { Form, Link, useActionData } from "react-router-dom";
import "./RegisterForm.scss";

function RegisterForm(): JSX.Element {
  const data: any = useActionData();

  return (
    <Form className="RegisterForm" method="post">
      <h3>Create a new account</h3>
      <span className="quick-easy">A quick and easy process.</span>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((e: any) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <div className="form-input-area user-full-name">
        <input
          placeholder="First name"
          type="text"
          className="form-control"
          id="first-name"
        />
        <input
          placeholder="Last name"
          type="text"
          className="form-control"
          id="last-name"
        />
      </div>
      <div className="form-input-area">
        <input
          placeholder="Email"
          type="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-input-area">
        <input
          placeholder="Phone number"
          type="number"
          className="form-control"
          id="phone"
        />
      </div>
      <div className="form-input-area">
        <input
          placeholder="Birth date"
          type="date"
          className="form-control"
          id="birth-date"
        />
      </div>
      <div className="form-input-area radio-inputs-area">
        <label htmlFor="male">
          <span>Male</span>
          <input type="radio" name="gender" id="male" />
        </label>
        <label htmlFor="female">
          <span>Female </span>
          <input type="radio" name="gender" id="female" />
        </label>
        <label htmlFor="other">
          <span>Other </span>
          <input type="radio" name="gender" id="other" />
        </label>
      </div>
      <button className="auth-login-button">Sign up</button>
      <Link to="?mode=login" className="form-link">
        Already have an account?
      </Link>
    </Form>
  );
}

export default RegisterForm;
