"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
  role: "",
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      const { name, email, photo, role } = action.payload;
      return {
        name,
        email,
        photo,
        role,
      };
    },
    clearUserInfo(state, action) {
      return initialState;
    },
  },
});

export const { setUserInfo, clearUserInfo } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
