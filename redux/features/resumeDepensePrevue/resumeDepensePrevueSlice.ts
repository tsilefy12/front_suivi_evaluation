import { createSlice } from "@reduxjs/toolkit";
import { ResumeDepensePrevueInitialState } from "./reumeDepensePrevue.interface";
import { getResumeDepensePrevue } from "./useCase/getResumeDepensePrevue";
import { getResumeDepensePrevueList } from "./useCase/getResumeDepensePrevueList";
import { createResumeDepensePrevue } from "./useCase/createResumeDepensePrevue";
import { editResumeDepensePrevue } from "./useCase/editResumeDepensePrevue";
import { updateResumeDepensePrevue } from "./useCase/updateResumeDepensePrevue";
import { deleteResumeDepensePrevue } from "./useCase/deleteResumeDepensePrevue";

const resumeDepensePrevueInitialState: ResumeDepensePrevueInitialState = {
  resumeDepensePrevueList: [],
  resumeDepensePrevue: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const resumeDepensePrevueSlice = createSlice({
  name: "resumeDepensePrevue",
  initialState: resumeDepensePrevueInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.resumeDepensePrevue = {};
    },
  },
  extraReducers: {
    // get resume
    [getResumeDepensePrevue.pending.type]: (state) => {
      state.loading = true;
    },
    [getResumeDepensePrevue.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resumeDepensePrevue = action.payload;
    },
    [getResumeDepensePrevue.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get resume
    [getResumeDepensePrevueList.pending.type]: (state) => {
      state.loading = true;
    },
    [getResumeDepensePrevueList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resumeDepensePrevueList = action.payload;
    },
    [getResumeDepensePrevueList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create resume
    [createResumeDepensePrevue.pending.type]: (state) => {
      state.loading = true;
    },
    [createResumeDepensePrevue.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resumeDepensePrevueList.push(action.payload);
    },
    [createResumeDepensePrevue.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit resume 
    [editResumeDepensePrevue.pending.type]: (state) => {
      state.loading = true;
    },
    [editResumeDepensePrevue.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resumeDepensePrevue = action.payload;
      state.isEditing = true;
    },
    [editResumeDepensePrevue.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update resume
    [updateResumeDepensePrevue.pending.type]: (state) => {
      state.loading = true;
    },
    [updateResumeDepensePrevue.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.resumeDepensePrevue = {};
      state.isEditing = false;
    },
    [updateResumeDepensePrevue.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete resume
    [deleteResumeDepensePrevue.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteResumeDepensePrevue.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteResumeDepensePrevue.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = resumeDepensePrevueSlice.actions;
