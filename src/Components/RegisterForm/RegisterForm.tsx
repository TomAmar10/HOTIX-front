import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { User } from "../../models/User";
import service from "../../services/authService";
import { userActions } from "../../store/authSlice";
import "./RegisterForm.scss";

function RegisterForm(): JSX.Element {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const { register, handleSubmit, watch } = useForm<User>();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const watchField = watch("email");

  useEffect(() => {
    if (error) setError(null);
  }, [watchField]);

  const signUp = async (user: User) => {
    const result = await service.register(user);
    if (result.status === 201) {
      dispatch(userActions.login(result.headers.authorization));
      navigate("/sell-or-buy");
    } else setError("This email is already in use.");
  };

  return (
    <form className="RegisterForm" onSubmit={handleSubmit(signUp)}>
      <h3>Create a new account</h3>
      <span className="quick-easy">A quick and easy process.</span>
      {error && <span className="error-message">{error}</span>}
      <div className="form-input-area user-full-name">
        <input
          required
          placeholder="First name"
          type="text"
          className="form-control"
          {...register("first_name")}
        />
        <input
          required
          placeholder="Last name"
          type="text"
          className="form-control"
          {...register("last_name")}
        />
      </div>
      <div className="form-input-area">
        <input
          required
          placeholder="Email"
          type="email"
          className="form-control"
          {...register("email")}
        />
      </div>
      <div className="form-input-area">
        <input
          required
          placeholder="Phone number"
          type="number"
          min={99999999}
          maxLength={9999999999}
          className="form-control"
          {...register("phone")}
        />
      </div>
      <div className="form-input-area">
        <input
          required
          placeholder="Password"
          type="password"
          className="form-control"
          {...register("password")}
        />
      </div>
      <div className="form-input-area radio-inputs-area">
        <label htmlFor="male">
          <span>Male</span>
          <input type="radio" name="gender" id="male" required />
        </label>
        <label htmlFor="female">
          <span>Female </span>
          <input type="radio" name="gender" id="female" required />
        </label>
        <label htmlFor="other">
          <span>Other </span>
          <input type="radio" name="gender" id="other" required />
        </label>
      </div>
      <button className="auth-login-button" disabled={isSubmitting}>
        Sign up
      </button>
      <Link to="?mode=login" className="form-link">
        Already have an account?
      </Link>
    </form>
  );
}

export default RegisterForm;
