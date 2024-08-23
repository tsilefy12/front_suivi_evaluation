import { createSlice } from "@reduxjs/toolkit";
import { CloturePTAInitialState } from "./cloturePTA.interface";
import { createCloture } from "./useCase/createCloture";
import { getClotureList } from "./useCase/getCloture";

const cloturePTAInitialState: CloturePTAInitialState = {
  cloturePtaList: [],
  cloturePta: {},
  isEditing: false,
  loading: false,
};

export const cloturePTASlice = createSlice({
  name: "cloturePTA",
  initialState: cloturePTAInitialState,
    reducers: {
      cancelEdit: (state) => {
        state.isEditing = false;
        state.cloture = {};
      },
    },
    extraReducers: {
      // get rapport Technique list
      [getClotureList.pending.type]: (state) => {
        state.loading = true;
      },
      [getClotureList.fulfilled.type]: (state, action) => {
        state.loading = false;
        state.cloturePtaList = action.payload;
      },
      [getClotureList.rejected.type]: (state, action) => {
        state.loading = false;
        state.error = action.error;
      },
    //   // create rapport Technique
      [createCloture.pending.type]: (state) => {
        state.loading = true;
      },
      [createCloture.fulfilled.type]: (state, action) => {
        state.loading = false;
        state.cloturePtaList.push(action.payload);
      },
      [createCloture.rejected.type]: (state, action) => {
        state.loading = false;
        state.error = action.error;
      },
  }});