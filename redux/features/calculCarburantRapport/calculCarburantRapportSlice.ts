import { createSlice } from "@reduxjs/toolkit";
import { CalculCarburantRapportInitialState } from "./calculCarburantRapport.interface";
import { getCalculCarburantRapport } from "./useCase/getCalculCarburantRapport";
import { getCalculCarburantRapportList } from "./useCase/getCalculCarburantRapportList";
import { createCalculCarburantRapport } from "./useCase/createCalculCarburantRapport";
import { editCalculCarburantRapport } from "./useCase/editCalculCarburantRapport";
import { updateCalculCarburantRapport } from "./useCase/updateCalculCarburantRapport";
import { deleteCalculCarburantRapport } from "./useCase/deletCalculCarburantRapport";

const calculCarburantRapportInitialState : CalculCarburantRapportInitialState = {
  calculCarburantRapportList: [],
  calculCarburantRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const calculCarburantRapportSlice = createSlice({
  name: "calculCarburantRapport",
  initialState: calculCarburantRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.calculCarburantRapport = {};
    },
  },
  extraReducers: {
    // get carburant
    [getCalculCarburantRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getCalculCarburantRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculCarburantRapport = action.payload;
    },
    [getCalculCarburantRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get carburant
    [getCalculCarburantRapportList.pending.type]: (state) => {
      state.loading = true;
    },
    [getCalculCarburantRapportList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculCarburantRapportList = action.payload;
    },
    [getCalculCarburantRapportList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create carburant
    [createCalculCarburantRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createCalculCarburantRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculCarburantRapportList.push(action.payload);
    },
    [createCalculCarburantRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit carburant
    [editCalculCarburantRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editCalculCarburantRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculCarburantRapport = action.payload;
      state.isEditing = true;
    },
    [editCalculCarburantRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update carburant 
    [updateCalculCarburantRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [updateCalculCarburantRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculCarburantRapport = {};
      state.isEditing = false;
    },
    [updateCalculCarburantRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete carburant
    [deleteCalculCarburantRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteCalculCarburantRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteCalculCarburantRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = calculCarburantRapportSlice.actions;
