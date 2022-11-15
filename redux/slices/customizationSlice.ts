import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import config from "../../config/config";
import type { RootState } from '../store'

export const customizationSlice = createSlice({
    name: "customization",
    initialState: {
        borderRadius: config.borderRadius,
    },
    reducers: {
      changeBorderRadius: (state, action) => {
        state.borderRadius = +action.payload
    },
    },
  });
  
  export const {changeBorderRadius} = customizationSlice.actions;
  