import { Link, useNavigate, useNavigation } from "react-router-dom";
import { User } from "../../models/User";
import { useForm } from "react-hook-form";
import service from "../../services/userService";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/authSlice";
import { useEffect, useState } from "react";
import "./LoginForm.scss";

function LoginForm(): JSX.Element {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const { register, handleSubmit, watch } = useForm<User>();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  useEffect(() => {
    if (error) setError(null);
  }, [watchEmail, watchPassword]);

  const login = async (user: User) => {
    const result = await service.login(user);
    if (result.status === 200) {
      dispatch(userActions.login(result.headers.authorization));
      navigate("/choose-user-mode");
    } else setError("Your email or password is incorrect. Please check again.");
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit(login)}>
      <h3>Login</h3>
      <div className="form-input-area">
        <input
          placeholder="Email address"
          type="email"
          className="form-control"
          {...register("email")}
          required
        />
      </div>
      <div className="form-input-area">
        <input
          placeholder="Password"
          type="password"
          className="form-control"
          {...register("password")}
          required
        />
      </div>
      <button className="auth-login-button" disabled={isSubmitting}>
        Log In
      </button>
      {error && <span className="error-message">{error}</span>}
      <div className="auth-links-area">
        <Link to="?auth-mode=register" className="form-link">
          Forgot your password?
        </Link>
        <Link to="?auth-mode=register" className="form-link">
          New account
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
