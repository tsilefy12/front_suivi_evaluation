import { createSlice } from "@reduxjs/toolkit";
import { ResultatRapportInitialState } from "./resultatRapport.interface";
import { getResultatRapport } from "./useCase/getResultatRapport";
import { createResultatAttendu } from "./useCase/createResultatRapport";
import { updateResultRapport } from "./useCase/updateResultatRapport";
import { deleteResultatRapport } from "./useCase/deleteResultatRapport";
import { editResultatRapport } from "./useCase/editResultatRapport";
import { getResultatRapportlist } from "./useCase/getResultatRapportList";

const resultatRapportInitialState: ResultatRapportInitialState = {
  resultatRapportlist: [],
  resultatRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const resultatRapportSlice = createSlice({
  name: "resultatRapport",
  initialState: resultatRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.resultatRapport = {};
    },
  },
  extraReducers: {
    // get resultat rapport
    [getResultatRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getResultatRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resultatRapport = action.payload;
    },
    [getResultatRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get resultat rapport list 
    [getResultatRapportlist.pending.type]: (state) => {
      state.loading = true;
    },
    [getResultatRapportlist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resultatRapportlist = action.payload;
    },
    [getResultatRapportlist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create resultat rapport
    [createResultatAttendu.pending.type]: (state) => {
      state.loading = true;
    },
    [createResultatAttendu.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resultatRapportlist.push(action.payload);
    },
    [createResultatAttendu.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateResultRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resultatRapport = {};
      state.isEditing = false;
    },
    [updateResultRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // delete resultat rapport
    [deleteResultatRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteResultatRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteResultatRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit resultat rapport 
    [editResultatRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editResultatRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resultatRapport = action.payload;
      state.isEditing = true;
    },
    [editResultatRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = resultatRapportSlice.actions;
