import { createSlice } from "@reduxjs/toolkit";
import { ObjectifAnnuelsInitialState } from "./objectifAnnuel.interface";
import { getObjectifAnnuel } from "./useCase/getObjectifAnnuels";
import { getObjectifAnnuelslist } from "./useCase/getObjectifAnnuelsList";
import { createObejectifAnnuel } from "./useCase/createObjectifAnnuels";
import { editObjectifAnnuels } from "./useCase/editObjectifAnnuels";
import { updateObjectifAnnuel } from "./useCase/updateObjectifAnnuels";
import { deleteObjectifAnnuel } from "./useCase/deleteObjectifAnnuels";

const objectifsAnnuelsInitialState: ObjectifAnnuelsInitialState = {
  objectifsAnnuelList: [],
  objectisfAnnuel: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const objectifAnnuelsSlice = createSlice({
  name: "objectifAnnuels",
  initialState: objectifsAnnuelsInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.objectisfAnnuel = {};
    },
  },
  extraReducers: {
    // get objectifs annuels
    [getObjectifAnnuel.pending.type]: (state) => {
      state.loading = true;
    },
    [getObjectifAnnuel.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectisfAnnuel = action.payload;
    },
    [getObjectifAnnuel.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get objectifs annuels
    [getObjectifAnnuelslist.pending.type]: (state) => {
      state.loading = true;
    },
    [getObjectifAnnuelslist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifsAnnuelList = action.payload;
    },
    [getObjectifAnnuelslist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create objectifs annuels
    [createObejectifAnnuel.pending.type]: (state) => {
      state.loading = true;
    },
    [createObejectifAnnuel.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifsAnnuelList.push(action.payload);
    },
    [createObejectifAnnuel.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit objectifs annuels
    [editObjectifAnnuels.pending.type]: (state) => {
      state.loading = true;
    },
    [editObjectifAnnuels.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectisfAnnuel = action.payload;
      state.isEditing = true;
    },
    [editObjectifAnnuels.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update tobjectifs annuels
    [updateObjectifAnnuel.pending.type]: (state) => {
      state.loading = true;
    },
    [updateObjectifAnnuel.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectisfAnnuel = {};
      state.isEditing = false;
    },
    [updateObjectifAnnuel.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete tache clé
    [deleteObjectifAnnuel.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteObjectifAnnuel.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteObjectifAnnuel.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = objectifAnnuelsSlice.actions;
