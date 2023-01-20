import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVerifyEmail: false,
};

const emailVerificationSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setIsVerifyEmail: (state, action) => {
      state.isVerifyEmail = action.payload;
    },
  },
});

export const { setIsVerifyEmail } = emailVerificationSlice.actions;
export default emailVerificationSlice.reducer;
