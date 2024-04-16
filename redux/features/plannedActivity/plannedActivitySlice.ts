import { createSlice } from "@reduxjs/toolkit";
import { createPlannedActivity } from "./useCase/createPlannedActivity";
import { editPlannedActivity } from "./useCase/editPlannedActivity";
import { getPlannedActivity } from "./useCase/getPlannedActivity";
import { getPlannedActivityList } from "./useCase/getPlannedActivityListe";
import { updatePlannedActivity } from "./useCase/updatePlannedActivity";
import { PlannedActivityInitialState } from "./plannedActivitySlice.interface";
import { deletePlannedActivity } from "./useCase/deletePlannedActivity";

const initialState: PlannedActivityInitialState = {
  plannedActivityList: [],
  plannedActivity: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const plannedActivitySlice = createSlice({
  name: "plannedActivity",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.plannedActivity = {};
    },
  },
  extraReducers: {
    [getPlannedActivity.pending.type]: (state) => {
      state.loading = true;
    },
    [getPlannedActivity.fulfilled.type]: (state, action) => {
      state.plannedActivity = action.payload;
      state.loading = false;
    },
    [getPlannedActivity.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getPlannedActivityList.pending.type]: (state) => {
      state.loading = true;
    },
    [getPlannedActivityList.fulfilled.type]: (state, action) => {
      state.plannedActivityList = action.payload;
      state.loading = false;
    },
    [getPlannedActivityList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createPlannedActivity.pending.type]: (state) => {
      state.loading = true;
    },
    [createPlannedActivity.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createPlannedActivity.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updatePlannedActivity.pending.type]: (state) => {
      state.loading = true;
    },
    [updatePlannedActivity.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.plannedActivity = {};
    },
    [updatePlannedActivity.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deletePlannedActivity.pending.type]: (state) => {
      state.loading = true;
    },
    [deletePlannedActivity.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deletePlannedActivity.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editPlannedActivity.pending.type]: (state) => {
      state.loading = true;
    },
    [editPlannedActivity.fulfilled.type]: (state, action) => {
      state.plannedActivity = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editPlannedActivity.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = plannedActivitySlice.actions;
