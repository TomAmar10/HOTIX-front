import { createSlice } from "@reduxjs/toolkit";
import { Community } from "../models/Community";

export interface CommunityState {
  communities: Community[] | null;
}

const initialCommunityState: CommunityState = {
  communities: null,
};

const communitySlice = createSlice({
  name: "communities",
  initialState: initialCommunityState,
  reducers: {
    setCommunities(state, action) {
      state.communities = action.payload;
    },
  },
});

export const communityAction = communitySlice.actions;
export default communitySlice.reducer;
