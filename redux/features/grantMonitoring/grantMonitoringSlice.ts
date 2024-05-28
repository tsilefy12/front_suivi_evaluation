import { createSlice } from "@reduxjs/toolkit";
import { GrantMonitoringInitialState } from "./grantMonitoring.interface";
import { getGrantMonitoring } from "./useCase/getGrantMonitoring";
import { getGrantMonitoringList } from "./useCase/getGrantMonitoringList";
import { createGrantMonitoring } from "./useCase/createGrantMonitoring";
import { editGrantMonitoring } from "./useCase/editGrantMonitoring";
import { updateGrantMonitoring } from "./useCase/updateGrantMonitoring";
import { deleteGrantMonitoring } from "./useCase/deleteGrantMonitoring";

const grantMonitoringInitialState: GrantMonitoringInitialState = {
  grantMonitoringlist: [],
  grantMonitoring: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const grantMonitoringSlice = createSlice({
  name: "grantMonitoring",
  initialState: grantMonitoringInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.grantMonitoring = {};
    },
  },
  extraReducers: {
    // get grantMonitoring
    [getGrantMonitoring.pending.type]: (state) => {
      state.loading = true;
    },
    [getGrantMonitoring.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantMonitoring = action.payload;
    },
    [getGrantMonitoring.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get grantMonitoring
    [getGrantMonitoringList.pending.type]: (state) => {
      state.loading = true;
    },
    [getGrantMonitoringList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantMonitoringlist = action.payload;
    },
    [getGrantMonitoringList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create grantMonitoring
    [createGrantMonitoring.pending.type]: (state) => {
      state.loading = true;
    },
    [createGrantMonitoring.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantMonitoringlist.push(action.payload);
    },
    [createGrantMonitoring.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit grantMonitoring
    [editGrantMonitoring.pending.type]: (state) => {
      state.loading = true;
    },
    [editGrantMonitoring.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantMonitoring = action.payload;
      state.isEditing = true;
    },
    [editGrantMonitoring.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update grantMonitoring
    [updateGrantMonitoring.pending.type]: (state) => {
      state.loading = true;
    },
    [updateGrantMonitoring.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantMonitoring = {};
      state.isEditing = false;
    },
    [updateGrantMonitoring.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete grantMonitoring
    [deleteGrantMonitoring.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteGrantMonitoring.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteGrantMonitoring.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = grantMonitoringSlice.actions;
