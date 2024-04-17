import { createSlice } from "@reduxjs/toolkit";
import { PrevisionDepenseInitialState } from "./previsionDepense.interface";
import { getPrevisionDepense } from "./useCase/getPrevisionDepense";
import { getPrevisionDepenseList } from "./useCase/getPrevisionDepenseList";
import { createPrevisionDepense } from "./useCase/createPrevisionDepense";
import { editPrevisionDepense } from "./useCase/editPrevisionDepense";
import { updatePrevisionDepense } from "./useCase/updatePrevisionDepense";
import { deletePrevisionDepense } from "./useCase/deletePrevisionDepense";

const previsionDepenseInitialState: PrevisionDepenseInitialState = {
  previsionDepenselist: [],
  previsionDepense: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const previsionDepenseSlice = createSlice({
  name: "previsionDepense",
  initialState: previsionDepenseInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.previsionDepense = {};
    },
  },
  extraReducers: {
    // get prevision de depense
    [getPrevisionDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [getPrevisionDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.previsionDepense = action.payload;
    },
    [getPrevisionDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get prevision de depense
    [getPrevisionDepenseList.pending.type]: (state) => {
      state.loading = true;
    },
    [getPrevisionDepenseList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.previsionDepenselist = action.payload;
    },
    [getPrevisionDepenseList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create prevision de depense
    [createPrevisionDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [createPrevisionDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.previsionDepenselist.push(action.payload);
    },
    [createPrevisionDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit prevision  de depense
    [editPrevisionDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [editPrevisionDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.previsionDepense = action.payload;
      state.isEditing = true;
    },
    [editPrevisionDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update prevision de depense
    [updatePrevisionDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [updatePrevisionDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.previsionDepense = {};
      state.isEditing = false;
    },
    [updatePrevisionDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete prevision de depense
    [deletePrevisionDepense.pending.type]: (state) => {
      state.loading = true;
    },
    [deletePrevisionDepense.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deletePrevisionDepense.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = previsionDepenseSlice.actions;
