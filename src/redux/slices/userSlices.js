import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserDetails } = userSlices.actions;
const userSlicesReducer = userSlices.reducer;

export default userSlicesReducer;
