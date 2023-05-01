import { createSlice } from "@reduxjs/toolkit";
import { Ticket } from "../models/Ticket";

export interface UserTicketsState {
  allTickets: Ticket[] | null;
  ticketsForSale: Ticket[] | null;
}

const initialUserTicketsState: UserTicketsState = {
  allTickets: null,
  ticketsForSale: null,
};

const userTicketsSlice = createSlice({
  name: "userTickets",
  initialState: initialUserTicketsState,
  reducers: {
    setTickets(state, action) {
      const tickets = action.payload || [];
      state.allTickets = tickets;
      state.ticketsForSale = tickets.filter((t: Ticket) => t.open_for_sale);
    },
    addTickets(state, action) {
      const newTickets: Ticket[] = [
        ...action.payload,
        ...(state.allTickets as Ticket[]),
      ];
      state.allTickets = newTickets;
    },
  },
});

export const userTicketsActions = userTicketsSlice.actions;
export default userTicketsSlice.reducer;
