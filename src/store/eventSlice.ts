import { createSlice } from "@reduxjs/toolkit";
import { Event } from "../models/Event";

interface EventState {
  events: Event[] | null;
}

const initialEventState: EventState = {
  events: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState: initialEventState,
  reducers: {
    setEvents(state, action) {
      const events: Event[] = action.payload;
      state.events = events;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
