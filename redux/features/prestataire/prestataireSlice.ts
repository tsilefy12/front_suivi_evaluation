import { createSlice } from "@reduxjs/toolkit";
import { PrestataireInitialState } from "./prestataireSlice.interface";
import { getPrestataireListe } from "./useCase/getPrestataireListe";

const initialState: PrestataireInitialState = {
  prestataireListe: [],
  prestataire: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const prestataireSlice = createSlice({
  name: "prestataire",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.prestataire = {};
    },
  },
  extraReducers: {
    // get PrestataireListe
    [getPrestataireListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getPrestataireListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.prestataireListe = action.payload;
    },
    [getPrestataireListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = prestataireSlice.actions;
