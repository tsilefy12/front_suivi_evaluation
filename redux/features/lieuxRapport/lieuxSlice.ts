import { createSlice } from "@reduxjs/toolkit";
import { createLieuxRapport } from "./useCase/createLieuxRapport";
import { getLieuxRapport } from "./useCase/getLieuxRapport";
import { getLieuxRapportList } from "./useCase/getLieuxRapportList";
import { updateLieuxRapport } from "./useCase/updateLieuxRapport";
import { LieuxRapportInitialState } from "./lieuxRapport.interface";
import { deleteLieuxRapport } from "./useCase/deleteLieuxbleRapport";
import { editLieuxRapport } from "./useCase/editLieuxRapport";

const lieuxRapportInitialState: LieuxRapportInitialState = {
  lieuxRapportlist: [],
  lieuxRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const lieuxRapportSlice = createSlice({
  name: "lieuxRapport",
  initialState: lieuxRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.lieuxRapport = {};
    },
  },
  extraReducers: {
    [getLieuxRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getLieuxRapport.fulfilled.type]: (state, action) => {
      state.lieuxRapport = action.payload;
      state.loading = false;
    },
    [getLieuxRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getLieuxRapportList.pending.type]: (state) => {
      state.loading = true;
    },
    [getLieuxRapportList.fulfilled.type]: (state, action) => {
      state.lieuxRapportlist = action.payload;
      state.loading = false;
    },
    [getLieuxRapportList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createLieuxRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createLieuxRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.lieuxRapportlist = action.payload;    
    },
    [createLieuxRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateLieuxRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [updateLieuxRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.lieuxRapport = {};
    },
    [updateLieuxRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteLieuxRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteLieuxRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteLieuxRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editLieuxRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editLieuxRapport.fulfilled.type]: (state, action) => {
      state.lieuxRapport = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editLieuxRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = lieuxRapportSlice.actions;
