/** @format */

import { createSlice } from "@reduxjs/toolkit";

// Slice
const slice = createSlice({
  name: "user",
  initialState: {
    loggedInInfo: localStorage.getItem("rtm_user")
      ? JSON.parse(localStorage.getItem("rtm_user"))
      : null,
  },
  reducers: {
    signin: (state, action) => {
      state.loggedInInfo = action.payload;
    },
    signout: (state) => {
      localStorage.removeItem("rtm_user");
      state.loggedInInfo = null;
    },
  },
});
export default slice.reducer;

// Actions
export const { signin, signout } = slice.actions;
