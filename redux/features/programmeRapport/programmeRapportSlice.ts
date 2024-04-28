import { createSlice } from "@reduxjs/toolkit";
import { ProgrammeRapportInitialState } from "./programmeRapport.interface";
import { getProgrammeRapport } from "./useCase/getProgrammeRapport";
import { getProgrammeRapportList } from "./useCase/getProgrammeRapportList";
import { createProgrammeRapport } from "./useCase/createProgrammeRapport";
import { editProgrammeRapport } from "./useCase/editProgrammeRapport";
import { updateProgrammeRapport } from "./useCase/updateProgrammeRapport";
import { deleteProgrammeRapport } from "./useCase/deleteProgrammeRapport";

const programmeRapportInitialState: ProgrammeRapportInitialState = {
  programmeRapportList: [],
  programmeRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const programmeRapportSlice = createSlice({
  name: "programmeRapport",
  initialState: programmeRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.programmeRapport = {};
    },
  },
  extraReducers: {
    // get programme prevision
    [getProgrammeRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getProgrammeRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmeRapport = action.payload;
    },
    [getProgrammeRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get programme prevision
    [getProgrammeRapportList.pending.type]: (state) => {
      state.loading = true;
    },
    [getProgrammeRapportList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmeRapportList = action.payload;
    },
    [getProgrammeRapportList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create programme prevision
    [createProgrammeRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createProgrammeRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmeRapportList.push(action.payload);
    },
    [createProgrammeRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit programme prevision 
    [editProgrammeRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editProgrammeRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmeRapport = action.payload;
      state.isEditing = true;
    },
    [editProgrammeRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update programme prevision
    [updateProgrammeRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [updateProgrammeRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmeRapport = {};
      state.isEditing = false;
    },
    [updateProgrammeRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete programme prevision
    [deleteProgrammeRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteProgrammeRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteProgrammeRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = programmeRapportSlice.actions;
