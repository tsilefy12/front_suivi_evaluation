import { createSlice } from "@reduxjs/toolkit";
import { AutreInfoRapportInitialState } from "./autreInfoRapport.interface";
import { getAutreInfoRapport } from "./useCase/getAutreInfoRapport";
import { getAutreInfoRapportList } from "./useCase/getAutreInfoRapportList";
import { createAutreInfoRapport } from "./useCase/createAutreInfoRapport";
import { editAutreInfoRapport } from "./useCase/editAutreInfoRapport";
import { updateAutreInfoRapport } from "./useCase/updateAutreInfoRapport";
import { deleteAutreInfoRapport } from "./useCase/deleteAutreInfoRapport";

const autreInfoRapportInitialState:AutreInfoRapportInitialState = {
  autreInfoRapportList: [],
  autreInfoRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const autreInfoRaportSlice = createSlice({
  name: "autreInfoRapport",
  initialState: autreInfoRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.autreInfoRapport = {};
    },
  },
  extraReducers: {
    // get autre info
    [getAutreInfoRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getAutreInfoRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.autreInfoRapport = action.payload;
    },
    [getAutreInfoRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get autre info
    [getAutreInfoRapportList.pending.type]: (state) => {
      state.loading = true;
    },
    [getAutreInfoRapportList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.autreInfoRapportList = action.payload;
    },
    [getAutreInfoRapportList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create autre info
    [createAutreInfoRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createAutreInfoRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.autreInfoRapportList.push(action.payload);
    },
    [createAutreInfoRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit autre info 
    [editAutreInfoRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editAutreInfoRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.autreInfoRapport = action.payload;
      state.isEditing = true;
    },
    [editAutreInfoRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update autre info 
    [updateAutreInfoRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [updateAutreInfoRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.autreInfoRapport = {};
      state.isEditing = false;
    },
    [updateAutreInfoRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete autre info
    [deleteAutreInfoRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteAutreInfoRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteAutreInfoRapport.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = autreInfoRaportSlice.actions;
