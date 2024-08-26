import { createSlice } from "@reduxjs/toolkit";
import { NotifyInitialState } from "./notify.interface";
import { getNotifyList } from "./useCase/getNotifyList";
import { createNotify } from "./useCase/createNotify";
import { getNotify } from "./useCase/getNotify";
import { updateNotify } from "./useCase/updateNotify";
import { deleteNotify } from "./useCase/deleteNotify";

const notifyInitialState: NotifyInitialState = {
  notifyList: [],
  notify: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const notifySlice = createSlice({
  name: "notify",
  initialState: notifyInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.notify = {};
    },
  },
  extraReducers: {
    // create notify
    [createNotify.pending.type]: (state) => {
      state.loading = true;
    },
    [createNotify.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.notifyList.push(action.payload);
    },
    [createNotify.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // get notify
    [getNotify.pending.type]: (state) => {
      state.loading = true;
    },
    [getNotify.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.notify = action.payload;
    },
    [getNotify.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // get notify list
    [getNotifyList.pending.type]: (state) => {
      state.loading = true;
    },
    [getNotifyList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.notifyList = action.payload;
    },
    [getNotifyList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    //update notify
    [updateNotify.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.notify = {};
      state.isEditing = false;
    },
    [updateNotify.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    //
    // delete notify
    [deleteNotify.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteNotify.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteNotify.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = notifySlice.actions;
