import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    value: [],
  },
  reducers: {
    addNewMenu: (state, action) => {},
  },
});

export const { addNewMenu } = menuSlice.actions;
