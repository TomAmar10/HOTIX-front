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
      const token = action.payload;
      const decodedToken: any = jwt_decode(token);
      const user: User = decodedToken.user;
      user.token = token;

      const expirationString = localStorage.getItem("expiration");
      const storedExpiration = expirationString
        ? new Date(expirationString)
        : null;

      if (storedExpiration && storedExpiration < new Date()) {
        state.user = null;
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userMode");
        return;
      }

      state.user = user;
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 2);
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("expiration", expiration.toISOString());
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
