import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./authSlice";
import eventsReducer, { EventState } from "./eventSlice";
import userTicketsReducer, { UserTicketsState } from "./userTicketsSlice";
import userBidsReducer, { UserBidsState } from "./userBidsSlice";

export interface IStore {
  user: UserState;
  events: EventState;
  userTickets: UserTicketsState;
  userBids: UserBidsState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    userTickets: userTicketsReducer,
    userBids: userBidsReducer,
  },
});

export default store;
