import { createSlice } from "@reduxjs/toolkit";
import { createExceptedResult } from "./useCase/createExceptedResult";
import { editExceptedResult } from "./useCase/editExceptedResult";
import { getExceptedResult } from "./useCase/getExceptedResult";
import { getExceptedResultList } from "./useCase/getExceptedResultListe";
import { updateExceptedResult } from "./useCase/updateExceptedResult";
import { ExceptedResultInitialState } from "./exceptedResultSlice.interface";
import { deleteExceptedResult } from "./useCase/deleteExceptedResult";

const initialState: ExceptedResultInitialState = {
  exceptedResultList: [],
  exceptedResult: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const exceptedResultSlice = createSlice({
  name: "exceptedResult",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.exceptedResult = {};
    },
  },
  extraReducers: {
    [getExceptedResult.pending.type]: (state) => {
      state.loading = true;
    },
    [getExceptedResult.fulfilled.type]: (state, action) => {
      state.exceptedResult = action.payload;
      state.loading = false;
    },
    [getExceptedResult.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getExceptedResultList.pending.type]: (state) => {
      state.loading = true;
    },
    [getExceptedResultList.fulfilled.type]: (state, action) => {
      state.exceptedResultList = action.payload;
      state.loading = false;
    },
    [getExceptedResultList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createExceptedResult.pending.type]: (state) => {
      state.loading = true;
    },
    [createExceptedResult.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createExceptedResult.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateExceptedResult.pending.type]: (state) => {
      state.loading = true;
    },
    [updateExceptedResult.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.exceptedResult = {};
    },
    [updateExceptedResult.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteExceptedResult.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteExceptedResult.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteExceptedResult.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editExceptedResult.pending.type]: (state) => {
      state.loading = true;
    },
    [editExceptedResult.fulfilled.type]: (state, action) => {
      state.exceptedResult = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editExceptedResult.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = exceptedResultSlice.actions;
