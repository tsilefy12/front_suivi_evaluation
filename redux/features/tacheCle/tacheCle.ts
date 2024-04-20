import { createSlice } from "@reduxjs/toolkit";
import { TacheCleInitialState } from "./tacheCle.interface";
import { getTacheCle } from "./useCase/getTacheCle";
import { getTacheClelist } from "./useCase/getTacheClelist";
import { createTacheCle } from "./useCase/createTacheCle";
import { editTacheCle } from "./useCase/editTacheCle";
import { updateTacheCle } from "./useCase/updateTacheCle";
import { deleteTacheCle } from "./useCase/deleteTacheCle";

const tacheCleInitialState: TacheCleInitialState = {
  tacheClelist: [],
  tacheCle: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const tacheCleSlice = createSlice({
  name: "tacheCle",
  initialState: tacheCleInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.tacheCle = {};
    },
  },
  extraReducers: {
    // get tache clé
    [getTacheCle.pending.type]: (state) => {
      state.loading = true;
    },
    [getTacheCle.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.tacheCle = action.payload;
    },
    [getTacheCle.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get tache clé
    [getTacheClelist.pending.type]: (state) => {
      state.loading = true;
    },
    [getTacheClelist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.tacheClelist = action.payload;
    },
    [getTacheClelist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create tache clé
    [createTacheCle.pending.type]: (state) => {
      state.loading = true;
    },
    [createTacheCle.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.tacheClelist.push(action.payload);
    },
    [createTacheCle.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit tache clé 
    [editTacheCle.pending.type]: (state) => {
      state.loading = true;
    },
    [editTacheCle.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.tacheCle = action.payload;
      state.isEditing = true;
    },
    [editTacheCle.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update tache clé 
    [updateTacheCle.pending.type]: (state) => {
      state.loading = true;
    },
    [updateTacheCle.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.tacheCle = {};
      state.isEditing = false;
    },
    [updateTacheCle.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete tache clé
    [deleteTacheCle.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteTacheCle.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteTacheCle.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = tacheCleSlice.actions;
