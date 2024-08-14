import { createSlice } from "@reduxjs/toolkit";
import { RapportTechniqueInitialState } from "./rapportTechnique.interface";
import { createRapportTechnique } from "./useCase/createRapportTechnique";

const rapportTechniqueInitialState: RapportTechniqueInitialState = {
  rapportTechniqueList: [],
  rapportTechnique: {},
  isEditing: false,
  loading: false,
};

export const rapportTechniqueSlice = createSlice({
  name: "rapportTechnique",
  initialState: rapportTechniqueInitialState,
    reducers: {
      cancelEdit: (state) => {
        state.isEditing = false;
        state.rapportTechnique = {};
      },
    },
    extraReducers: {
    //   // get rapport Technique
    //   [getRapportTechnique.pending.type]: (state) => {
    //     state.loading = true;                
    //   },
    //   [getRapportTechnique.fulfilled.type]: (state, action) => {
    //     state.loading = false;
    //     state.rapportTechnique = action.payload;
    //   },
    //   [getRapportTechnique.rejected.type]: (state, action) => {
    //     state.loading = false;
    //     state.error = action.error;
    //   },
    //   // get rapport Technique list
    //   [getRapportTechniqueList.pending.type]: (state) => {
    //     state.loading = true;
    //   },
    //   [getRapportTechniqueList.fulfilled.type]: (state, action) => {
    //     state.loading = false;
    //     state.rapportTechniqueList = action.payload;
    //   },
    //   [getRapportTechniqueList.rejected.type]: (state, action) => {
    //     state.loading = false;
    //     state.error = action.error;
    //   },
    //   // create rapport Technique
    //   [createRapportTechnique.pending.type]: (state) => {
    //     state.loading = true;
    //   },
      [createRapportTechnique.fulfilled.type]: (state, action) => {
        state.loading = false;
        state.rapportTechniqueList.push(action.payload);
      },
      [createRapportTechnique.rejected.type]: (state, action) => {
        state.loading = false;
        state.error = action.error;
      },
  }});