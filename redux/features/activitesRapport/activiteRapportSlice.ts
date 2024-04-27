import { createSlice } from "@reduxjs/toolkit";
import { ActiviteRapportInitialState } from "./activiteRapport.interface";
import { getActiviteRapport } from "./useCase/geActiviteRapport";
import { createActiviteRapport } from "./useCase/createActiviteRapport";
import { updateActiviteRapport } from "./useCase/updateActiviteRapport";
import { deleteActiviteRapport } from "./useCase/deleteActiviteRapport";
import { editAcitiviteRapport } from "./useCase/editActiviteRapport";
import { getActiviteRapportlist } from "./useCase/getActiviteRapportList";

const activiteRapportInitialState: ActiviteRapportInitialState = {
  activiteRapportlist: [],
  activiteRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const activiteRapportSlice = createSlice({
  name: "activiteRapport",
  initialState: activiteRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.activiteRapport = {};
    },
  },
  extraReducers: {
    // get activity rapport
    [getActiviteRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getActiviteRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.activiteRapport = action.payload;
    },
    [getActiviteRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get activity rapport list 
    [getActiviteRapportlist.pending.type]: (state) => {
      state.loading = true;
    },
    [getActiviteRapportlist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.activiteRapportlist = action.payload;
    },
    [getActiviteRapportlist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create activity rapport
    [createActiviteRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createActiviteRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.activiteRapportlist.push(action.payload);
    },
    [createActiviteRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateActiviteRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.activiteRapport = {};
      state.isEditing = false;
    },
    [updateActiviteRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // delete activity rapport
    [deleteActiviteRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteActiviteRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteActiviteRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit activity rapport 
    [editAcitiviteRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editAcitiviteRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.activiteRapport = action.payload;
      state.isEditing = true;
    },
    [editAcitiviteRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = activiteRapportSlice.actions;
