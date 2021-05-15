import { createSlice } from "@reduxjs/toolkit";

const uislice = createSlice({
  name: "ui",
  initialState: {
    displaySection: "a",
    fetchStatus: "Loading.",
    message: "Loading.",
    user: "",
  },
  reducers: {
    displays(state, action) {
      state.displaySection = action.payload;
    },
    fetchState(state, action) {
      state.fetchStatus = action.payload.status;
      state.message = action.payload.message;
      state.user = action.payload.user;
    },
  },
});

export const uiActions = uislice.actions;
export default uislice;
