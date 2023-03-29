import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HotixTitle from "../Components/HotixTitle/HotixTitle";

import LoginForm from "../Components/LoginForm/LoginForm";
import MainAuth from "../Components/MainAuth/MainAuth";
import RegisterForm from "../Components/RegisterForm/RegisterForm";

function AuthPage(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isLogin = searchParams.get("mode") === "login";
  const isRegister = searchParams.get("mode") === "register";

  useEffect(() => {
    if (mode && mode !== "login" && mode !== "register") navigate("/");
  }, [mode, navigate]);

  return (
    <>
      <HotixTitle />
      <main className="container-main">
        {!mode && <MainAuth />}
        {isLogin && <LoginForm />}
        {isRegister && <RegisterForm />}
      </main>
    </>
  );
}

export default AuthPage;
