import { createSlice } from "@reduxjs/toolkit";
import { LineBudgetInitialState } from "./lineBudget.interface";
import { getLineBudget } from "./useCase/getLineBudget";
import { createLineBudget } from "./useCase/createLineBudget";
import { updateLineBudget } from "./useCase/updateLineBudget";
import { deleteLineBudget } from "./useCase/deleteLineBudget";
import { editLineBudget } from "./useCase/editLineBudget";

const lineBudgetInitialState: LineBudgetInitialState = {
  lineBudgetList: [],
  lineBudget: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const lineBudgetSlice = createSlice({
  name: "lineBudget",
  initialState: lineBudgetInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.lineBudget = {};
    },
  },
  extraReducers: {
    // get ligne de budget
    [getLineBudget.pending.type]: (state) => {
      state.loading = true;
    },
    [getLineBudget.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.lineBudgetList = action.payload;
    },
    [getLineBudget.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create ligne de budget
    [createLineBudget.pending.type]: (state) => {
      state.loading = true;
    },
    [createLineBudget.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.lineBudgetList.push(action.payload);
    },
    [createLineBudget.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    //update ligne de budget
    [updateLineBudget.pending.type]: (state) => {
      state.loading = true;
    },
    [updateLineBudget.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.lineBudget = {};
      state.isEditing = false;
    },
    [updateLineBudget.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete ligne de budget
    [deleteLineBudget.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteLineBudget.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteLineBudget.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit ligne de budget
    [editLineBudget.pending.type]: (state) => {
      state.loading = true;
    },
    [editLineBudget.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.lineBudget = action.payload;
      state.isEditing = true;
    },
    [editLineBudget.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = lineBudgetSlice.actions;
