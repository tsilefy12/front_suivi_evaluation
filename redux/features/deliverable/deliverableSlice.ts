import { createSlice } from "@reduxjs/toolkit";
import { createDeliverable } from "./useCase/createDeliverable";
import { editDeliverable } from "./useCase/editDeliverable";
import { getDeliverable } from "./useCase/getDeliverable";
import { getDeliverableList } from "./useCase/getDeliverableListe";
import { updateDeliverable } from "./useCase/updateDeliverable";
import { DeliverableInitialState } from "./deliverableSlice.interface";
import { deleteDeliverable } from "./useCase/deleteDeliverable";

const initialState: DeliverableInitialState = {
  deliverableList: [],
  deliverable: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const deliverableSlice = createSlice({
  name: "deliverable",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.deliverable = {};
    },
  },
  extraReducers: {
    [getDeliverable.pending.type]: (state) => {
      state.loading = true;
    },
    [getDeliverable.fulfilled.type]: (state, action) => {
      state.deliverable = action.payload;
      state.loading = false;
    },
    [getDeliverable.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getDeliverableList.pending.type]: (state) => {
      state.loading = true;
    },
    [getDeliverableList.fulfilled.type]: (state, action) => {
      state.deliverableList = action.payload;
      state.loading = false;
    },
    [getDeliverableList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createDeliverable.pending.type]: (state) => {
      state.loading = true;
    },
    [createDeliverable.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createDeliverable.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateDeliverable.pending.type]: (state) => {
      state.loading = true;
    },
    [updateDeliverable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.deliverable = {};
    },
    [updateDeliverable.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteDeliverable.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteDeliverable.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteDeliverable.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editDeliverable.pending.type]: (state) => {
      state.loading = true;
    },
    [editDeliverable.fulfilled.type]: (state, action) => {
      state.deliverable = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editDeliverable.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = deliverableSlice.actions;
