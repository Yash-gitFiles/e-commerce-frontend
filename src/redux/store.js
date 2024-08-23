import { configureStore } from "@reduxjs/toolkit";
import userSlicesReducer from "./slices/userSlices";

export const store = configureStore({
  reducer: {
    userSlices: userSlicesReducer,
  },
});
