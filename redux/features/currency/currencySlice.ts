import { createSlice } from "@reduxjs/toolkit";
import { CurrenncyInitialState } from "./currencyinterface";
import { getCurrency } from "./useCase/getCurrency";
import { getCurrencyList } from "./useCase/getCurrencyList";


const currencyInitialState: CurrenncyInitialState = {
  currencylist: [],
  currency: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState: currencyInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.currency = {};
    },
  },
  extraReducers: {
    // get programme prevision
    [getCurrency.pending.type]: (state) => {
      state.loading = true;
    },
    [getCurrency.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.currency = action.payload;
    },
    [getCurrency.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get currency
    [getCurrencyList.pending.type]: (state) => {
      state.loading = true;
    },
    [getCurrencyList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.currencylist = action.payload;
    },
    [getCurrencyList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = currencySlice.actions;
