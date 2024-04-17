import { createSlice } from "@reduxjs/toolkit";
import { CalculPileInitialState } from "./calculPile.interface";
import { getCalculPile } from "./useCase/getCalculPile";
import { getCalculPileList } from "./useCase/getCalculPileList";
import { createCalculePile } from "./useCase/createCalculPile";
import { editCalculPile } from "./useCase/editCalculPile";
import { updateCalculPile } from "./useCase/updateCalculPile";
import { deleteCalculPile } from "./useCase/deleteCalculPile";

const calculPileInitialState: CalculPileInitialState = {
  calculPileList: [],
  calculPile: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const calculPileSlice = createSlice({
  name: "calculPile",
  initialState: calculPileInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.calculPile = {};
    },
  },
  extraReducers: {
    // get pile
    [getCalculPile.pending.type]: (state) => {
      state.loading = true;
    },
    [getCalculPile.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculPile = action.payload;
    },
    [getCalculPile.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get pile
    [getCalculPileList.pending.type]: (state) => {
      state.loading = true;
    },
    [getCalculPileList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculPileList = action.payload;
    },
    [getCalculPileList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create pile
    [createCalculePile.pending.type]: (state) => {
      state.loading = true;
    },
    [createCalculePile.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculPileList.push(action.payload);
    },
    [createCalculePile.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit pile 
    [editCalculPile.pending.type]: (state) => {
      state.loading = true;
    },
    [editCalculPile.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculPile = action.payload;
      state.isEditing = true;
    },
    [editCalculPile.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update pile 
    [updateCalculPile.pending.type]: (state) => {
      state.loading = true;
    },
    [updateCalculPile.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculPile = {};
      state.isEditing = false;
    },
    [updateCalculPile.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete pile
    [deleteCalculPile.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteCalculPile.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteCalculPile.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = calculPileSlice.actions;
