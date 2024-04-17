import { createSlice } from "@reduxjs/toolkit";
import { ProgrammePrevisionInitialState } from "./programmePrevision.interface";
import { getProgrammePrevision } from "./useCase/getProgrammePrevision";
import { getProgrammePrevisionList } from "./useCase/getProgrammePrevisionList";
import { createProgrammePrevision } from "./useCase/createProgrammePrevision";
import { editProgrammePrevision } from "./useCase/editProgrammePrevision";
import { updateProgrammePrevision } from "./useCase/updateProgrammePrevision";
import { deleteProgrammePrevision } from "./useCase/deleteProgrammePrevision";

const programmePrevisionInitialState: ProgrammePrevisionInitialState = {
  programmePrevisionList: [],
  programmePrevision: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const programmePrevisionSlice = createSlice({
  name: "programmePrevision",
  initialState: programmePrevisionInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.programmePrevision = {};
    },
  },
  extraReducers: {
    // get programme prevision
    [getProgrammePrevision.pending.type]: (state) => {
      state.loading = true;
    },
    [getProgrammePrevision.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmePrevision = action.payload;
    },
    [getProgrammePrevision.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get programme prevision
    [getProgrammePrevisionList.pending.type]: (state) => {
      state.loading = true;
    },
    [getProgrammePrevisionList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmePrevisionList = action.payload;
    },
    [getProgrammePrevisionList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create programme prevision
    [createProgrammePrevision.pending.type]: (state) => {
      state.loading = true;
    },
    [createProgrammePrevision.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmePrevisionList.push(action.payload);
    },
    [createProgrammePrevision.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit programme prevision 
    [editProgrammePrevision.pending.type]: (state) => {
      state.loading = true;
    },
    [editProgrammePrevision.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmePrevision = action.payload;
      state.isEditing = true;
    },
    [editProgrammePrevision.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update programme prevision
    [updateProgrammePrevision.pending.type]: (state) => {
      state.loading = true;
    },
    [updateProgrammePrevision.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmePrevision = {};
      state.isEditing = false;
    },
    [updateProgrammePrevision.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete programme prevision
    [deleteProgrammePrevision.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteProgrammePrevision.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteProgrammePrevision.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = programmePrevisionSlice.actions;
