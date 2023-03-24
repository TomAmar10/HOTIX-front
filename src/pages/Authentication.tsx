import { useEffect } from "react";
import {
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import HotixTitle from "../Components/HotixTitle/HotixTitle";

import LoginForm from "../Components/LoginForm/LoginForm";
import MainAuth from "../Components/MainAuth/MainAuth";
import RegisterForm from "../Components/RegisterForm/RegisterForm";

function AuthPage(): JSX.Element {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isLogin = searchParams.get("mode") === "login";
  const isSignup = searchParams.get("mode") === "signup";
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (mode && mode !== "login" && mode !== "signup") navigate("/");
  }, [mode, navigate]);

  return (
    <>
      <HotixTitle />
      <main className="container-main">
        {!mode && <MainAuth />}
        {isLogin && <LoginForm />}
        {isSignup && <RegisterForm />}
      </main>
    </>
  );
}

export default AuthPage;
