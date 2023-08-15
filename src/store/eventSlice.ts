import { createSlice } from "@reduxjs/toolkit";
import { Event } from "../models/Event";
import { Tag } from "../models/Tag";

export interface EventState {
  events: Event[] | null;
  currentEvent: Event | null;
  isCreatingEvent: boolean;
  isUpdatingEvent: boolean;
  isLoading: boolean;
  tags: Tag[];
}

const initialEventState: EventState = {
  events: null,
  currentEvent: null,
  isCreatingEvent: false,
  isUpdatingEvent: false,
  isLoading: false,
  tags: [],
};

const eventSlice = createSlice({
  name: "events",
  initialState: initialEventState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
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
    startUpdating(state) {
      state.isUpdatingEvent = true;
    },
    endUpdating(state) {
      state.isUpdatingEvent = false;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    finishLoading(state) {
      state.isLoading = false;
    },
    setTags(state, action) {
      state.tags = action.payload;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
