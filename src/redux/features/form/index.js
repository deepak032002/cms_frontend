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

    removeForm: (store, action) => {
      store.form = "";
    },
  },
});

export const { setForm, removeForm } = formSlice.actions;
export default formSlice.reducer;
