import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HotixTitle from "../Components/HotixTitle/HotixTitle";

import LoginForm from "../Components/LoginForm/LoginForm";
import MainAuth from "../Components/MainAuth/MainAuth";
import RegisterForm from "../Components/RegisterForm/RegisterForm";

function AuthPage(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get("auth-mode");
  const isLogin = authMode === "login";
  const isRegister = authMode === "register";

  useEffect(() => {
    if (authMode && authMode !== "login" && authMode !== "register") navigate("/");
  }, [authMode, navigate]);

  return (
    <>
      <HotixTitle />
      <main className="container-main">
        {!authMode && <MainAuth />}
        {isLogin && <LoginForm />}
        {isRegister && <RegisterForm />}
      </main>
    </>
  );
}

export default AuthPage;
