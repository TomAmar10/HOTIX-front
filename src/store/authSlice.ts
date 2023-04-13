import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { User } from "../models/User";

export enum UserModes {
  BUYER = "buyer",
  SELLER = "seller",
}

export interface UserState {
  user: User | null;
  mode: UserModes | null;
}

const initialUserState: UserState = {
  user: null,
  mode: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state, action) {
      const tokenResult: any = jwt_decode(action.payload);
      const user: User = tokenResult.user;
      user.token = action.payload;
      const newToken = JSON.stringify(action.payload);
      localStorage.setItem("token", JSON.stringify(action.payload));
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());
      state.user = user;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      localStorage.removeItem("userMode");
      state.user = null;
      state.mode = null;
    },
    setMode(state, action) {
      state.mode = action.payload;
      localStorage.setItem("userMode", action.payload);
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
