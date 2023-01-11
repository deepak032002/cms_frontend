import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import formSlice from "../features/form";
const rootReducer = combineReducers({
  auth: authSlice,
  form: formSlice,
});

export default rootReducer;
