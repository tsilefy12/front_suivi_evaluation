import { createSlice } from "@reduxjs/toolkit";
import { CalculCarburantInitialState } from "./calculCarburant.interface";
import { getCalculCarburant } from "./useCase/getCalculCarburant";
import { getCalculCarburantList } from "./useCase/getCalculCarburantList";
import { createCalculCarburant } from "./useCase/createCalculCarburant";
import { editCalculCarburant } from "./useCase/editCalculCarburant";
import { updateCalculCarburant } from "./useCase/updateCalculCarburant";
import { deleteCalculCarburant } from "./useCase/deletCalculCarburant";

const calculCarburantInitialState : CalculCarburantInitialState = {
  calculCarburantList: [],
  calculCarburant: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const calculCarburantSlice = createSlice({
  name: "calculCarburant",
  initialState: calculCarburantInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.calculCarburant = {};
    },
  },
  extraReducers: {
    // get carburant
    [getCalculCarburant.pending.type]: (state) => {
      state.loading = true;
    },
    [getCalculCarburant.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculCarburant = action.payload;
    },
    [getCalculCarburant.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get carburant
    [getCalculCarburantList.pending.type]: (state) => {
      state.loading = true;
    },
    [getCalculCarburantList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculCarburantList = action.payload;
    },
    [getCalculCarburantList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create carburant
    [createCalculCarburant.pending.type]: (state) => {
      state.loading = true;
    },
    [createCalculCarburant.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculCarburantList.push(action.payload);
    },
    [createCalculCarburant.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit carburant
    [editCalculCarburant.pending.type]: (state) => {
      state.loading = true;
    },
    [editCalculCarburant.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculCarburant = action.payload;
      state.isEditing = true;
    },
    [editCalculCarburant.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update carburant 
    [updateCalculCarburant.pending.type]: (state) => {
      state.loading = true;
    },
    [updateCalculCarburant.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.calculCarburant = {};
      state.isEditing = false;
    },
    [updateCalculCarburant.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete carburant
    [deleteCalculCarburant.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteCalculCarburant.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteCalculCarburant.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = calculCarburantSlice.actions;
