import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { userActions } from "../store/authSlice";
import { IStore } from "../store/store";

function RootLayout(): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (!token) return;
      dispatch(userActions.login(token));
      const userMode = localStorage.getItem("userMode");
      if (!userMode) return;
      dispatch(userActions.setMode(userMode));
    }
  }, [dispatch, user]);

  return <Outlet />;
}

export default RootLayout;
