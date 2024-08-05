import { createSlice } from "@reduxjs/toolkit";
import { CurrencyInitialState } from "./currencySlice.interface";
import { updateCurrencyDefault } from "./useCase/changeDefault";
import { createCurrency } from "./useCase/createCurrency";
import { deleteCurrency } from "./useCase/deleteCurrency";
import { editCurrency } from "./useCase/editCurrency";
import { getCurrency } from "./useCase/getCurrency";
import { getCurrencyListe } from "./useCase/getCurrencyListe";
import { updateCurrency } from "./useCase/updateCurrency";

const initialState: CurrencyInitialState = {
  currencyListe: [],
  currency: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.currency = {};
    },
  },
  extraReducers: {
    [getCurrency.pending.type]: (state) => {
      state.loading = true;
    },
    [getCurrency.fulfilled.type]: (state, action) => {
      state.currency = action.payload;
      state.loading = false;
    },
    [getCurrency.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getCurrencyListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getCurrencyListe.fulfilled.type]: (state, action) => {
      state.currencyListe = action.payload;
      state.loading = false;
    },
    [getCurrencyListe.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createCurrency.pending.type]: (state) => {
      state.loading = true;
    },
    [createCurrency.fulfilled.type]: (state, action) => {
      state.loading = false;
      // state.currencyListe.push(action.payload);
    },
    [createCurrency.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [updateCurrency.pending.type]: (state) => {
      state.loading = true;
    },
    [updateCurrency.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.currency = {};
    },
    [updateCurrency.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateCurrencyDefault.pending.type]: (state) => {
      state.loading = true;
    },
    [updateCurrencyDefault.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.currency = {};
    },
    [updateCurrencyDefault.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteCurrency.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteCurrency.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteCurrency.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editCurrency.pending.type]: (state) => {
      state.loading = true;
    },
    [editCurrency.fulfilled.type]: (state, action) => {
      state.currency = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editCurrency.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = currencySlice.actions;
