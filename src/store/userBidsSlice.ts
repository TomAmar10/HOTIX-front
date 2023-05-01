import { createSlice } from "@reduxjs/toolkit";
import { Ticket } from "../models/Ticket";
import { Bid } from "../models/Bid";
import filterTickets from "../utils/ticketsFilter";
import { User } from "../models/User";

export interface UserBidsState {
  userBidsConfirmed: Bid[] | null;
  userBidsWaiting: Bid[] | null;
  receivedBidsConfirmed: Bid[] | null;
  receivedBidsWaiting: Bid[] | null;
}

const initialUserBidsState: UserBidsState = {
  userBidsConfirmed: null,
  userBidsWaiting: null,
  receivedBidsConfirmed: null,
  receivedBidsWaiting: null,
};

const userBidsSlice = createSlice({
  name: "userBids",
  initialState: initialUserBidsState,
  reducers: {
    setBids(state, action) {
      if (!action.payload.bids) {
        state.userBidsConfirmed = null;
        state.userBidsWaiting = null;
        state.receivedBidsConfirmed = null;
        state.receivedBidsWaiting = null;
        return;
      }
      const bidsConfirmed: Bid[] = [];
      const bidsWaiting: Bid[] = [];
      const salesConfirmed: Bid[] = [];
      const salesWaiting: Bid[] = [];
      action.payload.bids.forEach((b: Bid, i: number) => {
        if (b.isDone) return;
        b.tickets = filterTickets(b.tickets as Ticket[]);
        if ((b.id_bidder as User)._id === action.payload.id) {
          b.isConfirmed ? bidsConfirmed.push(b) : bidsWaiting.push(b);
        } else b.isConfirmed ? salesConfirmed.push(b) : salesWaiting.push(b);
      });
      state.userBidsConfirmed = bidsConfirmed;
      state.userBidsWaiting = bidsWaiting;
      state.receivedBidsConfirmed = salesConfirmed;
      state.receivedBidsWaiting = salesWaiting;
    },
    confirmBid(state, action) {
      const bidToConfirm: Bid = action.payload;
      const confirmedBids = [
        ...(state.receivedBidsConfirmed as Bid[]),
        bidToConfirm,
      ];
      state.receivedBidsConfirmed = confirmedBids;
      const waitingBids = [
        ...(state.receivedBidsWaiting as Bid[]).filter(
          (b) => b._id !== bidToConfirm._id
        ),
      ];
      state.receivedBidsWaiting = waitingBids;
    },
    doneBid(state, action) {
      const bidToDone: Bid = action.payload;
      const confirmedUserBids = [
        ...(state.userBidsConfirmed as Bid[]).filter(
          (b) => b._id !== bidToDone._id
        ),
      ];
      state.userBidsConfirmed = confirmedUserBids;
    },
  },
});

export const userBidsActions = userBidsSlice.actions;
export default userBidsSlice.reducer;
