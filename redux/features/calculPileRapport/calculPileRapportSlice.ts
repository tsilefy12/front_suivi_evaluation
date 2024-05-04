import { createSlice } from "@reduxjs/toolkit";
import { CalculPileRapportInitialState } from "./calculPileRapport.interface";
import { getCalculPileRapport } from "./useCase/getCalculPileRapport";
import { getCalculPileRapportList } from "./useCase/getCalculPileRapportList";
import { createCalculePileRapport } from "./useCase/createCalculPileRapport";
import { editCalculPileRapport } from "./useCase/editCalculPileRapport";
import { updateCalculPileRapport } from "./useCase/updateCalculPileRapport";
import { deleteCalculPileRapport } from "./useCase/deleteCalculPileRapport";

const calculPileRapportRapportInitialState: CalculPileRapportInitialState = {
  calculPileRapportList: [],
  calculPileRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const calculPileRapportSlice = createSlice({
  name: "calculPileRapport",
  initialState: calculPileRapportRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.calculPileRapport = {};
    },
  },
  extraReducers: {
    // get pile
    [getCalculPileRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getCalculPileRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculPileRapport = action.payload;
    },
    [getCalculPileRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get pile
    [getCalculPileRapportList.pending.type]: (state) => {
      state.loading = true;
    },
    [getCalculPileRapportList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculPileRapportList = action.payload;
    },
    [getCalculPileRapportList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create pile
    [createCalculePileRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createCalculePileRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculPileRapportList.push(action.payload);
    },
    [createCalculePileRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit pile 
    [editCalculPileRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editCalculPileRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculPileRapport = action.payload;
      state.isEditing = true;
    },
    [editCalculPileRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update pile 
    [updateCalculPileRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [updateCalculPileRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculPileRapport = {};
      state.isEditing = false;
    },
    [updateCalculPileRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete pile
    [deleteCalculPileRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteCalculPileRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteCalculPileRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = calculPileRapportSlice.actions;
