import { createSlice } from "@reduxjs/toolkit";
import { PostAnalytiqueInitialState } from "./postAnalytique.interface";
import { getPostAnalytique } from "./useCase/getPostAnalytique";
import { createPostAnalytic } from "./useCase/createPostAnalytic";
import { updatePostAnalytic } from "./useCase/updatePosteAnalytic";
import { deletePostAnalytic } from "./useCase/deletePostAnalytic";
import { editPostAnalytic } from "./useCase/editPostAnalytic";

const postAnalytiqueInitialState: PostAnalytiqueInitialState = {
  postAnalytiqueList: [],
  postAnalytique: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const postAnalytiqueSlice = createSlice({
  name: "postAnalytique",
  initialState: postAnalytiqueInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.postAnalytique = {};
    },
  },
  extraReducers: {
    // get post analytic
    [getPostAnalytique.pending.type]: (state) => {
      state.loading = true;
    },
    [getPostAnalytique.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.postAnalytiqueList = action.payload;
    },
    [getPostAnalytique.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create poste analytique
    [createPostAnalytic.pending.type]: (state) => {
      state.loading = true;
    },
    [createPostAnalytic.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.postAnalytiqueList.push(action.payload);
    },
    [createPostAnalytic.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updatePostAnalytic.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.postAnalytique = {};
      state.isEditing = false;
    },
    [updatePostAnalytic.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // delete poste
    [deletePostAnalytic.pending.type]: (state) => {
      state.loading = true;
    },
    [deletePostAnalytic.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deletePostAnalytic.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit poste 
    [editPostAnalytic.pending.type]: (state) => {
      state.loading = true;
    },
    [editPostAnalytic.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.postAnalytique = action.payload;
      state.isEditing = true;
    },
    [editPostAnalytic.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = postAnalytiqueSlice.actions;
