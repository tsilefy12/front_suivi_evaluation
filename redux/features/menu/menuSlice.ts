import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import menu from "../../../config/menu";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    value: menu,
  },
  reducers: {
    addNewMenu: (state, action) => {},
  },
});

export const { addNewMenu } = menuSlice.actions;
