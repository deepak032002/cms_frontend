import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm: (store, action) => {
      store.form = action.payload;
    },
  },
});

export const { setForm } = formSlice.actions;
export default formSlice.reducer;
