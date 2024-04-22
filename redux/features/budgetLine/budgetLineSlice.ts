import { createSlice } from "@reduxjs/toolkit";
import { BudgetLineInitialState } from "./budgetLine.interface";
import { getBudgetLine } from "./useCase/getBudgetLine";
import { getBudgetLineList } from "./useCase/getBudgetLineList";
import { createBudgetLine } from "./useCase/createBudgetLine";
import { editBudgetLine } from "./useCase/editBudgetLine";
import { updateBudgetLine } from "./useCase/updateBudgetLine";
import { deleteBudgetLine } from "./useCase/deleteBudgetLine";

const budgetLineInitialState: BudgetLineInitialState = {
  budgetLineList: [],
  budgetLine: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const budgetLineSlice = createSlice({
  name: "budgetLine",
  initialState: budgetLineInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.budgetLine = {};
    },
  },
  extraReducers: {
    // get budget lien
    [getBudgetLine.pending.type]: (state) => {
      state.loading = true;
    },
    [getBudgetLine.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.budgetLine = action.payload;
    },
    [getBudgetLine.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get Missions
    [getBudgetLineList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBudgetLineList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.budgetLineList = action.payload;
    },
    [getBudgetLineList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create budgetaire
    [createBudgetLine.pending.type]: (state) => {
      state.loading = true;
    },
    [createBudgetLine.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.budgetLineList.push(action.payload);
    },
    [createBudgetLine.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit budgetaire
    [editBudgetLine.pending.type]: (state) => {
      state.loading = true;
    },
    [editBudgetLine.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.budgetLine = action.payload;
      state.isEditing = true;
    },
    [editBudgetLine.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update budget
    [updateBudgetLine.pending.type]: (state) => {
      state.loading = true;
    },
    [updateBudgetLine.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.budgetLine = {};
      state.isEditing = false;
    },
    [updateBudgetLine.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete budget
    [deleteBudgetLine.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBudgetLine.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteBudgetLine.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = budgetLineSlice.actions;
