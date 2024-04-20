import { createSlice } from "@reduxjs/toolkit";
import { PeriodeInitialState } from "./periode.interface";
import { getPeriode } from "./useCase/getPeriode";
import { getPeriodelist } from "./useCase/getPeriodelist";
import { createPeriode } from "./useCase/createPeriode";
import { editPeriode } from "./useCase/editPeriode";
import { updatePeriode } from "./useCase/updatePeriode";
import { deletePeriode } from "./useCase/deletePeriode";

const periodeInitialState: PeriodeInitialState = {
  periodelist: [],
  periode: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const periodeSlice = createSlice({
  name: "periode",
  initialState: periodeInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.periode = {};
    },
  },
  extraReducers: {
    // get periode
    [getPeriode.pending.type]: (state) => {
      state.loading = true;
    },
    [getPeriode.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.periode = action.payload;
    },
    [getPeriode.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get periode
    [getPeriodelist.pending.type]: (state) => {
      state.loading = true;
    },
    [getPeriodelist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.periodelist = action.payload;
    },
    [getPeriodelist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create periode
    [createPeriode.pending.type]: (state) => {
      state.loading = true;
    },
    [createPeriode.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.periodelist.push(action.payload);
    },
    [createPeriode.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit periode 
    [editPeriode.pending.type]: (state) => {
      state.loading = true;
    },
    [editPeriode.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.periode = action.payload;
      state.isEditing = true;
    },
    [editPeriode.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update periode 
    [updatePeriode.pending.type]: (state) => {
      state.loading = true;
    },
    [updatePeriode.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.periode = {};
      state.isEditing = false;
    },
    [updatePeriode.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete periode
    [deletePeriode.pending.type]: (state) => {
      state.loading = true;
    },
    [deletePeriode.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deletePeriode.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = periodeSlice.actions;
