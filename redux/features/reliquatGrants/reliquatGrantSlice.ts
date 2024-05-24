import { createSlice } from "@reduxjs/toolkit";
import { ReliquatGrantsInitialState } from "./reliquatGrants.interface";
import { getReliquatGrant } from "./useCase/getReliquatGrant";
import { getReliquatGrantList } from "./useCase/getReliquatGrantList";
import { createReliquatGrant } from "./useCase/createReliquatGrant";
import { editReliquatGrant } from "./useCase/editReliquatGrant";
import { updateReliquatGrant } from "./useCase/updateReliquatGrant";
import { deleteReliquatGrant } from "./useCase/deleteReliquatGrant";
import { getCaisse } from "./useCase/getCaisse";

const reliquatGrantInitialState: ReliquatGrantsInitialState = {
  reliquatGrantList: [],
  caisselist: [],
  reliquatGrant: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const reliquatGrantSlice = createSlice({
  name: "calculPile",
  initialState: reliquatGrantInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.calculPile = {};
    },
  },
  extraReducers: {
    // get pile
    [getReliquatGrant.pending.type]: (state) => {
      state.loading = true;
    },
    [getReliquatGrant.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.reliquatGrant = action.payload;
    },
    [getReliquatGrant.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get pile
    [getReliquatGrantList.pending.type]: (state) => {
      state.loading = true;
    },
    [getReliquatGrantList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.reliquatGrantList = action.payload;
    },
    [getReliquatGrantList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    //get caisse
    [getCaisse.pending.type]: (state) => {
      state.loading = true;
    },
    [getCaisse.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.caisselist = action.payload;
    },
    [getCaisse.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create pile
    [createReliquatGrant.pending.type]: (state) => {
      state.loading = true;
    },
    [createReliquatGrant.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.reliquatGrantList.push(action.payload);
    },
    [createReliquatGrant.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit pile
    [editReliquatGrant.pending.type]: (state) => {
      state.loading = true;
    },
    [editReliquatGrant.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.reliquatGrant = action.payload;
      state.isEditing = true;
    },
    [editReliquatGrant.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update pile
    [updateReliquatGrant.pending.type]: (state) => {
      state.loading = true;
    },
    [updateReliquatGrant.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.reliquatGrant = {};
      state.isEditing = false;
    },
    [updateReliquatGrant.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete pile
    [deleteReliquatGrant.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteReliquatGrant.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteReliquatGrant.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = reliquatGrantSlice.actions;
