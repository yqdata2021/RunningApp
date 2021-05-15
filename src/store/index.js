import { configureStore } from "@reduxjs/toolkit";
import runslice from "./run-slice";
import uislice from "./ui-slice";

const store = configureStore({
  reducer: { run: runslice.reducer, ui: uislice.reducer },
});

export default store;
