import { createSlice } from "@reduxjs/toolkit";
import { getImprevuePrevisionliste } from "./useCase/getImprevuePrevision";
import { ImprevuePrevisionInitialState } from "./imprevuePrevision.interface";

const imprevuePrevisionInitialState: ImprevuePrevisionInitialState = {
  imprevuePrevisionlist: [],
  imprevuePrevision: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const imprevuePrevisionSlice = createSlice({
  name: "imprevuePrevision",
  initialState: imprevuePrevisionInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.imprevuePrevision = {};
    },
  },
  extraReducers: {
    [getImprevuePrevisionliste.pending.type]: (state) => {
      state.loading = true;
    },
    [getImprevuePrevisionliste.fulfilled.type]: (state, action) => {
      state.imprevuePrevisionlist = action.payload;
      state.loading = false;
    },
    [getImprevuePrevisionliste.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = imprevuePrevisionSlice.actions;
