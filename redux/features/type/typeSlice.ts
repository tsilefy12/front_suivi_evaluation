import { createSlice } from "@reduxjs/toolkit";
import { TypeInitialState } from "./type.interface";
import { getType } from "./useCase/getType";
import { createType } from "./useCase/createType";
import { updateType } from "./useCase/updateType";
import { deleteType } from "./useCase/deleteType";
import { editType } from "./useCase/editType";

const typeInitialState: TypeInitialState = {
  typeList: [],
  type: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const typeSlice = createSlice({
  name: "type",
  initialState: typeInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.type = {};
    },
  },
  extraReducers: {
    // get type
    [getType.pending.type]: (state) => {
      state.loading = true;
    },
    [getType.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.typeList = action.payload;
    },
    [getType.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create type
    [createType.pending.type]: (state) => {
      state.loading = true;
    },
    [createType.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.postAnalytiqueList.push(action.payload);
    },
    [createType.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateType.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.type = {};
      state.isEditing = false;
    },
    [updateType.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // delete type
    [deleteType.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteType.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteType.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit type 
    [editType.pending.type]: (state) => {
      state.loading = true;
    },
    [editType.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.type = action.payload;
      state.isEditing = true;
    },
    [editType.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = typeSlice.actions;
