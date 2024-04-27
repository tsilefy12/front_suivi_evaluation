import { createSlice } from "@reduxjs/toolkit";
import { StatusInitialState } from "./status.interface";
import { getStatus } from "./useCase/getStatus";
import { createStatus } from "./useCase/createStatus";
import { updateStatus } from "./useCase/updateStatus";
import { deleteStatus } from "./useCase/deleteStatus";
import { editStatus } from "./useCase/editStatus";
import { getStatuslist } from "./useCase/getStatusList";

const statusInitialState: StatusInitialState = {
  statuslist: [],
  statut: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const statusSlice = createSlice({
  name: "status",
  initialState: statusInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.statut = {};
    },
  },
  extraReducers: {
    // get status
    [getStatus.pending.type]: (state) => {
      state.loading = true;
    },
    [getStatus.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.statut = action.payload;
    },
    [getStatus.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    //get status list
    [getStatuslist.pending.type]: (state) => {
      state.loading = true;
    },
    [getStatuslist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.statuslist = action.payload;
    },
    [getStatuslist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create status
    [createStatus.pending.type]: (state) => {
      state.loading = true;
    },
    [createStatus.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.statuslist.push(action.payload);
    },
    [createStatus.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    //update status
    [updateStatus.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.statut = {};
      state.isEditing = false;
    },
    [updateStatus.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // delete status
    [deleteStatus.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteStatus.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteStatus.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit status 
    [editStatus.pending.type]: (state) => {
      state.loading = true;
    },
    [editStatus.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.statut = action.payload;
      state.isEditing = true;
    },
    [editStatus.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = statusSlice.actions;
