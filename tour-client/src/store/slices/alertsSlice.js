"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  type: "",
  message: "",
};

const alertsSlices = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      return {
        show: true,
        type: action.payload.type,
        message: action.payload.message,
      };
    },
    closeAlert(state, action) {
      return initialState;
    },
  },
});

export const { showAlert, closeAlert } = alertsSlices.actions;
export const alertsReducer = alertsSlices.reducer;
