import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import eventsReducer from "./eventSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
  },
});

export default store;
