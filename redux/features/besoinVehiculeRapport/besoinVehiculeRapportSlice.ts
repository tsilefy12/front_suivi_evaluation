import { createSlice } from "@reduxjs/toolkit";
import { BesoinVehiculeRapportInitialState} from "./besoinVehiculeRapport.interface";
import { getBesoinVehiculeRapport } from "./useCase/getBesoinVehiculeRapport";
import { getBesoinVehiculeRapportList } from "./useCase/getBesoinVehiculeRapportList";
import { createBesoinVehiculeRapport } from "./useCase/createBesoinVehiculeRapport";
import { editBesoinVehiculeRapport } from "./useCase/editBesoinVehiculeRapport";
import { updateBesoinVehiculeRapport } from "./useCase/updateBesoinVehiculeRapport";
import { deleteBesoinVehiculeRapport } from "./useCase/deleteBesoinVehiculeRapport";

const besoinVehiculeRapportInitialState: BesoinVehiculeRapportInitialState = {
  besoinVehiculeRapportList: [],
  besoinVehiculeRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const besoinVehiculeRapportSlice = createSlice({
  name: "besoinVehiculeRapport",
  initialState: besoinVehiculeRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.besoinVehiculeRapport = {};
    },
  },
  extraReducers: {
    // get vehicule
    [getBesoinVehiculeRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getBesoinVehiculeRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.besoinVehiculeRapport = action.payload;
    },
    [getBesoinVehiculeRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get vehicule
    [getBesoinVehiculeRapportList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBesoinVehiculeRapportList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.besoinVehiculeRapportList = action.payload;
    },
    [getBesoinVehiculeRapportList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create vehicule
    [createBesoinVehiculeRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createBesoinVehiculeRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.besoinVehiculeRapportList.push(action.payload);
    },
    [createBesoinVehiculeRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit vehicule
    [editBesoinVehiculeRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editBesoinVehiculeRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.besoinVehiculeRapport = action.payload;
      state.isEditing = true;
    },
    [editBesoinVehiculeRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update vehicule 
    [updateBesoinVehiculeRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [updateBesoinVehiculeRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.besoinVehiculeRapport = {};
      state.isEditing = false;
    },
    [updateBesoinVehiculeRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete vehicule
    [deleteBesoinVehiculeRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBesoinVehiculeRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteBesoinVehiculeRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = besoinVehiculeRapportSlice.actions;
