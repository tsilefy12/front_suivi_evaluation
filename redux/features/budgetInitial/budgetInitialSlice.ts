import { createSlice } from "@reduxjs/toolkit";
import { getBudgetInitial } from "./useCase/getBudgetInitial";
import { getBudgetInitialList } from "./useCase/getBudgetInitialList";
import { createBudgetInitial } from "./useCase/createBudgetInitial";
import { editBudgetInitial } from "./useCase/editBudgetInitial";
import { updateBudgetInitial } from "./useCase/updateBudgetInitial";
import { deleteBudgetInitial } from "./useCase/deleteBudgetInitial";
import { BugdgetInitialInitialState } from "./budgetInitial.interface";

const budgetInitialInitialState: BugdgetInitialInitialState = {
  budgetInitialList: [],
  budgetInitial: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const budgetInitialSlice = createSlice({
  name: "budgetInitial",
  initialState: budgetInitialInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.budgetInitial = {};
    },
  },
  extraReducers: {
    // get budget initial
    [getBudgetInitial.pending.type]: (state) => {
      state.loading = true;
    },
    [getBudgetInitial.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.budgetInitial = action.payload;
    },
    [getBudgetInitial.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get budget initial
    [getBudgetInitialList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBudgetInitialList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.budgetInitialList = action.payload;
    },
    [getBudgetInitialList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create budget initial
    [createBudgetInitial.pending.type]: (state) => {
      state.loading = true;
    },
    [createBudgetInitial.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.budgetInitialList.push(action.payload);
    },
    [createBudgetInitial.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit budget initial
    [editBudgetInitial.pending.type]: (state) => {
      state.loading = true;
    },
    [editBudgetInitial.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.budgetInitial = action.payload;
      state.isEditing = true;
    },
    [editBudgetInitial.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update budget initial
    [updateBudgetInitial.pending.type]: (state) => {
      state.loading = true;
    },
    [updateBudgetInitial.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.budgetInitial = {};
      state.isEditing = false;
    },
    [updateBudgetInitial.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete budget initial
    [deleteBudgetInitial.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBudgetInitial.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteBudgetInitial.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = budgetInitialSlice.actions;
