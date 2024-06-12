import { createSlice } from "@reduxjs/toolkit";
import { createUnCompleteTbb } from "./useCase/createUnCompleteTbb";
import { deleteUncompleteTbb } from "./useCase/deleteUncompleteTbb";
import { getUncompleteTbb } from "./useCase/getUncompleteTbb";
import { getUncompleteTbbListe } from "./useCase/getUncompleteTbbListe";
import { updateUncompleteTbb } from "./useCase/updateUncompleteTbb";
import { UncompleteTbbInitialState } from "./unCompleteTbb.interface";
import { editUncompleteTbb } from "./useCase/editUncompleteTbb";

const uncompleteTbbInitialState: UncompleteTbbInitialState = {
  unCompleteTbbList: [],
  unCompleteTbb: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const uncompleteTbbSlice = createSlice({
  name: "mission",
  initialState: uncompleteTbbInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.mission = {};
    },
  },
  extraReducers: {
    // get Mission
    [getUncompleteTbb.pending.type]: (state) => {
      state.loading = true;
    },
    [getUncompleteTbb.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.unCompleteTbb = action.payload;
    },
    [getUncompleteTbb.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get Missions
    [getUncompleteTbbListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getUncompleteTbbListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.unCompleteTbbList = action.payload;
    },
    [getUncompleteTbbListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create mission
    [createUnCompleteTbb.pending.type]: (state) => {
      state.loading = true;
    },
    [createUnCompleteTbb.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.unCompleteTbbList.push(action.payload);
    },
    [createUnCompleteTbb.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit mission
    [editUncompleteTbb.pending.type]: (state) => {
      state.loading = true;
    },
    [editUncompleteTbb.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.unCompleteTbb = action.payload;
      state.isEditing = true;
    },
    [editUncompleteTbb.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update mission
    [updateUncompleteTbb.pending.type]: (state) => {
      state.loading = true;
    },
    [updateUncompleteTbb.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.unCompleteTbb = {};
      state.isEditing = false;
    },
    [updateUncompleteTbb.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete mission
    [deleteUncompleteTbb.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteUncompleteTbb.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteUncompleteTbb.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = uncompleteTbbSlice.actions;
