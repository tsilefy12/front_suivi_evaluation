import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import menuProfile from "../../config/menuProfile";

export const menuProfileSlice = createSlice({
    name: "menuProfile",
    initialState: {
        value: menuProfile,
    },
    reducers: {
      addNewMenuProfile: (state, action) => {
    },
    },
  });
  
  export const {addNewMenuProfile} = menuProfileSlice.actions;