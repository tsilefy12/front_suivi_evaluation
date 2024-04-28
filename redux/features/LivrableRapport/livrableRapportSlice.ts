import { createSlice } from "@reduxjs/toolkit";
import { LivrableRapportInitialState } from "./livrableRapport.interface";
import { getLivrableRapport } from "./useCase/getLivrableRapport";
import { createLivrableRapport } from "./useCase/createLivrabelRapport";
import { updateLivrableRapport } from "./useCase/updateLivrableRapport";
import { deleteLivrableRapport } from "./useCase/deleteLivrabelRapport";
import { editLivrableRapport } from "./useCase/editLivrableRapport";
import { getLivrableRapportlist } from "./useCase/getLivrableRapportList";

const livrableRapportInitialState: LivrableRapportInitialState = {
  livrableRapportlist: [],
  livrableRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const livrableRapportSlice = createSlice({
  name: "livrableRapport",
  initialState: livrableRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.livrableRapport = {};
    },
  },
  extraReducers: {
    // get livrableRapport
    [getLivrableRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getLivrableRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.livrableRapport = action.payload;
    },
    [getLivrableRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    //get livrableRapport list
    [getLivrableRapportlist.pending.type]: (state) => {
      state.loading = true;
    },
    [getLivrableRapportlist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.livrableRapportlist = action.payload;
    },
    [getLivrableRapportlist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create livrableRapport
    [createLivrableRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createLivrableRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.livrableRapportlist.push(action.payload);
    },
    [createLivrableRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    //update livrableRapport
    [updateLivrableRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.livrableRapport = {};
      state.isEditing = false;
    },
    [updateLivrableRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // delete livrableRapport
    [deleteLivrableRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteLivrableRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteLivrableRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit livrableRapport 
    [editLivrableRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editLivrableRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.livrableRapport = action.payload;
      state.isEditing = true;
    },
    [editLivrableRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = livrableRapportSlice.actions;
