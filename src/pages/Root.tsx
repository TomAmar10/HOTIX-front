import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { userActions } from "../store/authSlice";
import { IStore } from "../store/store";
import ticketService from "../services/ticketService";
import { userTicketsActions } from "../store/userTicketsSlice";
import { userBidsActions } from "../store/userBidsSlice";
import bidService from "../services/bidService";

function RootLayout(): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?._id) {
      bidService
        .getUserBids(user?._id as string)
        .then((res) =>
          dispatch(userBidsActions.setBids({ bids: res.data, id: user?._id }))
        );
      ticketService
        .getUserTickets(user._id as string)
        .then((res: any) => dispatch(userTicketsActions.setTickets(res)));
    }
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
