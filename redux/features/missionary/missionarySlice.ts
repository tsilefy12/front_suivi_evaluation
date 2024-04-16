import { createSlice } from "@reduxjs/toolkit";
import { createMissionary } from "./useCase/createMissionary";
import { editMissionary } from "./useCase/editMissionary";
import { getMissionary } from "./useCase/getMissionary";
import { getMissionaryList } from "./useCase/getMissionaryList";
import { updateMissionary } from "./useCase/updateMissionary";
import { MissionaryInitialState } from "./missionarySlice.interface";
import { deleteMissionary } from "./useCase/deleteMissionary";

const initialState: MissionaryInitialState = {
  missionaryList: [],
  missionary: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const missionarySlice = createSlice({
  name: "missionary",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.missionary = {};
    },
  },
  extraReducers: {
    [getMissionary.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionary.fulfilled.type]: (state, action) => {
      state.missionary = action.payload;
      state.loading = false;
    },
    [getMissionary.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getMissionaryList.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionaryList.fulfilled.type]: (state, action) => {
      state.missionaryList = action.payload;
      state.loading = false;
    },
    [getMissionaryList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createMissionary.pending.type]: (state) => {
      state.loading = true;
    },
    [createMissionary.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createMissionary.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateMissionary.pending.type]: (state) => {
      state.loading = true;
    },
    [updateMissionary.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.missionary = {};
    },
    [updateMissionary.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteMissionary.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteMissionary.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteMissionary.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editMissionary.pending.type]: (state) => {
      state.loading = true;
    },
    [editMissionary.fulfilled.type]: (state, action) => {
      state.missionary = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editMissionary.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = missionarySlice.actions;
