import { createSlice } from "@reduxjs/toolkit";
import { Event } from "../models/Event";

export interface EventState {
  events: Event[] | null;
  currentEvent: Event | null;
}

const initialEventState: EventState = {
  events: null,
  currentEvent: null,
};

const dateConvertor = (date: string) => {
  return date.replace("T", ", ").split(".")[0];
};

const eventSlice = createSlice({
  name: "events",
  initialState: initialEventState,
  reducers: {
    setEvents(state, action) {
      const events: Event[] = (action.payload as Event[]).map((e) => ({
        ...e,
        date: dateConvertor(e.date as string),
      }));
      state.events = events;
    },
    setSingleEvent(state, action) {
      const currEvent: Event = action.payload;
      state.currentEvent = currEvent;
    },
    clearSingleEvent(state) {
      state.currentEvent = null;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
