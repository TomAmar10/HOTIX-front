import { createSlice } from "@reduxjs/toolkit";
import { Event } from "../models/Event";

export interface EventState {
  events: Event[] | null;
  currentEvent: Event | null;
  isCreatingEvent: boolean;
}

const initialEventState: EventState = {
  events: null,
  currentEvent: null,
  isCreatingEvent: false,
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
    startCreating(state) {
      state.isCreatingEvent = true;
    },
    endCreating(state) {
      state.isCreatingEvent = false;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
