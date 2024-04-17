import { createSlice } from "@reduxjs/toolkit";
import { BesoinVehiculeInitialState } from "./besoinVehicule.interface";
import { getBesoinVehicule } from "./useCase/getBesoinVehicule";
import { getBesoinVehiculeList } from "./useCase/getBesoinVehiculeList";
import { createBesoinVehicule } from "./useCase/createBesoinVehicule";
import { editBesoinVehicule } from "./useCase/editBesoinVehicule";
import { updateBesoinVehicule } from "./useCase/updateBesoinVehicule";
import { deleteBesoinVehicule } from "./useCase/deleteBesoinVehicule";

const besoinVehiculeInitialState:BesoinVehiculeInitialState = {
  besoinVehiculeList: [],
  besoinVehicule: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const besoinVehiculeSlice = createSlice({
  name: "besoinVehicule",
  initialState: besoinVehiculeInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.besoinVehicule = {};
    },
  },
  extraReducers: {
    // get vehicule
    [getBesoinVehicule.pending.type]: (state) => {
      state.loading = true;
    },
    [getBesoinVehicule.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.besoinVehicule = action.payload;
    },
    [getBesoinVehicule.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get vehicule
    [getBesoinVehiculeList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBesoinVehiculeList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.besoinVehiculeList = action.payload;
    },
    [getBesoinVehiculeList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create vehicule
    [createBesoinVehicule.pending.type]: (state) => {
      state.loading = true;
    },
    [createBesoinVehicule.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.besoinVehiculeList.push(action.payload);
    },
    [createBesoinVehicule.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit vehicule
    [editBesoinVehicule.pending.type]: (state) => {
      state.loading = true;
    },
    [editBesoinVehicule.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.besoinVehicule = action.payload;
      state.isEditing = true;
    },
    [editBesoinVehicule.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update vehicule 
    [updateBesoinVehicule.pending.type]: (state) => {
      state.loading = true;
    },
    [updateBesoinVehicule.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.besoinVehicule = {};
      state.isEditing = false;
    },
    [updateBesoinVehicule.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete vehicule
    [deleteBesoinVehicule.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBesoinVehicule.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteBesoinVehicule.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = besoinVehiculeSlice.actions;
