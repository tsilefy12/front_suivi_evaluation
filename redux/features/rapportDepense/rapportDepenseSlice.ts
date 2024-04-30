import { createSlice } from "@reduxjs/toolkit";
import { RapportDepenseInitialState } from "./rapportDepense.interface";
import { getRapportDepense } from "./useCase/getRapportDepense";
import { getRapportDepenseList } from "./useCase/getRapportDepenseList";
import { createRapportDepense } from "./useCase/createRapportDepense";
import { editRapportDepense } from "./useCase/editRapportDepense";
import { updateRapportDepense } from "./useCase/updateRapportDepense";
import { deleteRapportDepense } from "./useCase/deleteRapportDepense";

const rapportDepenseInitialState: RapportDepenseInitialState = {
  rapportDepenseList: [],
  rapportDepense: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const rapportDepenseSlice = createSlice({
  name: "rapportDepense",
  initialState: rapportDepenseInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.rapportDepense = {};
    },
  },
  extraReducers: {
    // get rapport de depense
    [getRapportDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [getRapportDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.rapportDepense = action.payload;
    },
    [getRapportDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get rapport de depense
    [getRapportDepenseList.pending.type]: (state) => {
      state.loading = true;
    },
    [getRapportDepenseList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.rapportDepenseList = action.payload;
    },
    [getRapportDepenseList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create rapport de depense
    [createRapportDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [createRapportDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.rapportDepenseList.push(action.payload);
    },
    [createRapportDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit rapport  de depense
    [editRapportDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [editRapportDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.rapportDepense = action.payload;
      state.isEditing = true;
    },
    [editRapportDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update rapport de depense
    [updateRapportDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [updateRapportDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.rapportDepense = {};
      state.isEditing = false;
    },
    [updateRapportDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete rapport de depense
    [deleteRapportDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteRapportDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteRapportDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = rapportDepenseSlice.actions;
