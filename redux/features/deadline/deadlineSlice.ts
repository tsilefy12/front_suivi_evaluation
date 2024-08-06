import { createSlice } from "@reduxjs/toolkit";
import { DeadlineInitialState } from "./deadline.interface";
import { getDeadline } from "./useCase/getDeadline";
import { getDeadlineList } from "./useCase/getDealinelist";
import { createDeadline } from "./useCase/createDeadline";
import { editDeadline } from "./useCase/editDeadline";
import { updateDeadline } from "./useCase/updateDeadline";
import { deleteDeadline } from "./useCase/deleteDeadline";

const deadlineInitialState: DeadlineInitialState = {
  deadlinelist: [],
  deadlines: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const deadlineSlice = createSlice({
  name: "deadline",
  initialState: deadlineInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.deadlines = {};
    },
  },
  extraReducers: {
    // get deadline
    [getDeadline.pending.type]: (state) => {
      state.loading = true;
    },
    [getDeadline.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.deadlines = action.payload;
    },
    [getDeadline.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get deadline list
    [getDeadlineList.pending.type]: (state) => {
      state.loading = true;
    },
    [getDeadlineList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.deadlinelist = action.payload;
    },
    [getDeadlineList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create deadline
    [createDeadline.pending.type]: (state) => {
      state.loading = true;
    },
    [createDeadline.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.deadlinelist.push(action.payload);
    },
    [createDeadline.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit deadline
    [editDeadline.pending.type]: (state) => {
      state.loading = true;
    },
    [editDeadline.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.deadlines = action.payload;
      state.isEditing = true;
    },
    [editDeadline.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update deadline
    [updateDeadline.pending.type]: (state) => {
      state.loading = true;
    },
    [updateDeadline.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.deadlines = {};
      state.isEditing = false;
    },
    [updateDeadline.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete deadline
    [deleteDeadline.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteDeadline.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteDeadline.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = deadlineSlice.actions;
