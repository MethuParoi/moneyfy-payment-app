import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  label: "",
  icon: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.showModal = action.payload;
    },
    setLabel: (state, action) => {
      state.label = action.payload;
    },
    setIcon: (state, action) => {
      state.icon = action.payload;
    },
  },
});

export const { showModal, setLabel, setIcon } = uiSlice.actions;

export default uiSlice.reducer;
