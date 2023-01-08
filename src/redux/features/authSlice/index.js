import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "abc",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (store, action) => {
      store.token = action.payload;
    },
    removeToken: (store) => {
      store.token = "";
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
