import { createSlice } from "@reduxjs/toolkit";
import { ResumeDepenseInitialState } from "./reumeDepense.interface";
import { getResumeDepense } from "./useCase/getResumeDepense";
import { getResumeDepenseList } from "./useCase/getResumeDepenseList";
import { createResumeDepense } from "./useCase/createResumeDepense";
import { editResumeDepense } from "./useCase/editResumeDepense";
import { updateResumeDepense } from "./useCase/updateResumeDepense";
import { deleteResumeDepense } from "./useCase/deleteResumeDepense";

const resumeDepenseInitialState: ResumeDepenseInitialState = {
  resumeDepenseList: [],
  resumeDepense: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const resumeDepenseSlice = createSlice({
  name: "resumeDepense",
  initialState: resumeDepenseInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.resumeDepense = {};
    },
  },
  extraReducers: {
    // get resume
    [getResumeDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [getResumeDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resumeDepense = action.payload;
    },
    [getResumeDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get resume
    [getResumeDepenseList.pending.type]: (state) => {
      state.loading = true;
    },
    [getResumeDepenseList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resumeDepenseList = action.payload;
    },
    [getResumeDepenseList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create resume
    [createResumeDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [createResumeDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resumeDepenseList.push(action.payload);
    },
    [createResumeDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit resume 
    [editResumeDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [editResumeDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resumeDepense = action.payload;
      state.isEditing = true;
    },
    [editResumeDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update resume
    [updateResumeDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [updateResumeDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resumeDepense = {};
      state.isEditing = false;
    },
    [updateResumeDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete resume
    [deleteResumeDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteResumeDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteResumeDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = resumeDepenseSlice.actions;
