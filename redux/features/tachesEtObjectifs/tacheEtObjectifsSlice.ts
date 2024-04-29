import { createSlice } from "@reduxjs/toolkit";
import { TacheEtObjectifInitialState } from "./tacheETObjectifs.interface";
import { getTacheEtObjectifs } from "./useCase/getTacheEtObjectifs";
import { getTacheEtObjectifsList } from "./useCase/getTacheEtObjectifsList";
import { createTacheEtObjectifs } from "./useCase/createTacheEtObjectifs";
import { editTacheEtObjectifs } from "./useCase/editTacheEtObjectis";
import { updateTacheEtObjectifs } from "./useCase/updateTacheEtObjectifs";
import { deleteTacheEtObjectifs } from "./useCase/deleteTacheEtObjectifs";

const tacheEtObjectifsInitialState: TacheEtObjectifInitialState = {
  tacheEtObjectifList: [],
  tacheEtObjectif: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const tacheEtObjectifsSlice = createSlice({
  name: "tacheEtObjectifs",
  initialState: tacheEtObjectifsInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.tacheEtObjectif = {};
    },
  },
  extraReducers: {
    // get tache et objectifs
    [getTacheEtObjectifs.pending.type]: (state) => {
      state.loading = true;
    },
    [getTacheEtObjectifs.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.tacheEtObjectif = action.payload;
    },
    [getTacheEtObjectifs.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get tache et objectifs liste
    [getTacheEtObjectifsList.pending.type]: (state) => {
      state.loading = true;
    },
    [getTacheEtObjectifsList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.tacheEtObjectifList = action.payload;
    },
    [getTacheEtObjectifsList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create tache et Objectifs
    [createTacheEtObjectifs.pending.type]: (state) => {
      state.loading = true;
    },
    [createTacheEtObjectifs.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.tacheEtObjectifList.push(action.payload);
    },
    [createTacheEtObjectifs.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit tache et Objectifs
    [editTacheEtObjectifs.pending.type]: (state) => {
      state.loading = true;
    },
    [editTacheEtObjectifs.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.tacheEtObjectif = action.payload;
      state.isEditing = true;
    },
    [editTacheEtObjectifs.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update tache et objectifs
    [updateTacheEtObjectifs.pending.type]: (state) => {
      state.loading = true;
    },
    [updateTacheEtObjectifs.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.tacheEtObjectif = {};
      state.isEditing = false;
    },
    [updateTacheEtObjectifs.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete tache et objectifs
    [deleteTacheEtObjectifs.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteTacheEtObjectifs.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteTacheEtObjectifs.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = tacheEtObjectifsSlice.actions;
