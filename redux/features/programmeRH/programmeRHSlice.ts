import { createSlice } from "@reduxjs/toolkit";
import { ProgrammeRHInitialState } from "./programmeRH.interface";
import { getProgrammeListe } from "./useCase/getProgrammListe";

const programmeRHInitialState: ProgrammeRHInitialState = {
  programmeRHList: [],
  programmeRH: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const programmeRHSlice = createSlice({
  name: "programmeRH",
  initialState: programmeRHInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.programmeRH = {};
    },
  },
  extraReducers: {
    // get ProgrammeRH
    [getProgrammeListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getProgrammeListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programmeRHList = action.payload;
    },
    [getProgrammeListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = programmeRHSlice.actions;
