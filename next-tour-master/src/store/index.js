"use client";

import { configureStore } from "@reduxjs/toolkit";
import { showAlert, closeAlert, alertsReducer } from "./slices/alertsSlice";
import { setUserInfo, clearUserInfo, usersReducer } from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    users: usersReducer,
  },
});

export { store, showAlert, closeAlert, setUserInfo, clearUserInfo };
