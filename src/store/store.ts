import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./authSlice";
import eventsReducer, { EventState } from "./eventSlice";

export interface IStore {
  user: UserState;
  events: EventState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
  },
});

export default store;
