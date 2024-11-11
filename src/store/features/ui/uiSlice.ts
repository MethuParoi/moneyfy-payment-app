import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  showInfoModal: false,
  showInfo: {},
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
    showInfoModal: (state, action) => {
      state.showModal = action.payload;
    },
    showInfo: (state, action) => {
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

export const { showModal, showInfoModal, showInfo, setLabel, setIcon } =
  uiSlice.actions;

export default uiSlice.reducer;
