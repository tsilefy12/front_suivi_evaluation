import { createSlice } from "@reduxjs/toolkit";
import { ObjectifRapportInitialState } from "./objectifRapport.interface";
import { getObjectifRapport } from "./useCase/getObjectiRapport";
import { createObjectifRapport } from "./useCase/createObjectifRapport";
import { updateObjectifRapport } from "./useCase/updateObjectifRapport";
import { deleteObjectifRapport } from "./useCase/deleteObjectifRapport";
import { editObjectifRapport } from "./useCase/editObjectifRapport";
import { getObjectifRapportlist } from "./useCase/getObjectifRapportList";

const objectifRapportInitialState: ObjectifRapportInitialState = {
  objectifRapportlist: [],
  objectifRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const objectifRapportSlice = createSlice({
  name: "objectifRapport",
  initialState: objectifRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.objectifRapport = {};
    },
  },
  extraReducers: {
    // get objectif rapport
    [getObjectifRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getObjectifRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifRapport = action.payload;
    },
    [getObjectifRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get objectif rapport list 
    [getObjectifRapportlist.pending.type]: (state) => {
      state.loading = true;
    },
    [getObjectifRapportlist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifRapportlist = action.payload;
    },
    [getObjectifRapportlist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create objectif rapport
    [createObjectifRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createObjectifRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifRapportlist.push(action.payload);
    },
    [createObjectifRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateObjectifRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifRapport = {};
      state.isEditing = false;
    },
    [updateObjectifRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // delete objectif rapport
    [deleteObjectifRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteObjectifRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteObjectifRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit objectif rapport 
    [editObjectifRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editObjectifRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifRapport = action.payload;
      state.isEditing = true;
    },
    [editObjectifRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = objectifRapportSlice.actions;
