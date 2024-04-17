import { createSlice } from "@reduxjs/toolkit";
import { AutreInfoPrevisionInitialState } from "./autreInfoPrevision.interface";
import { getAutreInfoPrevision } from "./useCase/getAutreInfoPrevision";
import { getAutreInfoPrevisionList } from "./useCase/getAutreInfoPrevisionList";
import { createAutreInfoPrevision } from "./useCase/createAutreInfoPrevision";
import { editAutreInfoPrevision } from "./useCase/editAutreInfoPrevesion";
import { updateAutreInfoPrevision } from "./useCase/updateAutreInfoPrevision";
import { deleteAutreInfoPrevision } from "./useCase/deleteAutreInfoPrevision";

const autreInfoPrevisionInitialState:AutreInfoPrevisionInitialState = {
  autreInfoPrevisionList: [],
  autreInfoPrevision: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const autrInfoPrevisionSlice = createSlice({
  name: "autreInfoPrevision",
  initialState: autreInfoPrevisionInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.autreInfoPrevision = {};
    },
  },
  extraReducers: {
    // get autre info
    [getAutreInfoPrevision.pending.type]: (state) => {
      state.loading = true;
    },
    [getAutreInfoPrevision.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.autreInfoPrevision = action.payload;
    },
    [getAutreInfoPrevision.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get autre info
    [getAutreInfoPrevisionList.pending.type]: (state) => {
      state.loading = true;
    },
    [getAutreInfoPrevisionList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.autreInfoPrevisionList = action.payload;
    },
    [getAutreInfoPrevisionList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create autre info
    [createAutreInfoPrevision.pending.type]: (state) => {
      state.loading = true;
    },
    [createAutreInfoPrevision.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.autreInfoPrevisionList.push(action.payload);
    },
    [createAutreInfoPrevision.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit autre info 
    [editAutreInfoPrevision.pending.type]: (state) => {
      state.loading = true;
    },
    [editAutreInfoPrevision.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.autreInfoPrevision = action.payload;
      state.isEditing = true;
    },
    [editAutreInfoPrevision.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update autre info 
    [updateAutreInfoPrevision.pending.type]: (state) => {
      state.loading = true;
    },
    [updateAutreInfoPrevision.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.autreInfoPrevision = {};
      state.isEditing = false;
    },
    [updateAutreInfoPrevision.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete autre info
    [deleteAutreInfoPrevision.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteAutreInfoPrevision.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteAutreInfoPrevision.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = autrInfoPrevisionSlice.actions;
