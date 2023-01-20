import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import formSlice from "../features/form";
import emailVerificationSlice from "../features/verifyEmail";
const rootReducer = combineReducers({
  auth: authSlice,
  form: formSlice,
  email: emailVerificationSlice,
});

export default rootReducer;
