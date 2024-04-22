import { createSlice } from "@reduxjs/toolkit";
import { ObjectifGeneralInitialState } from "./objectifGeneral.interface";
import { getObjectifGeneral } from "./useCase/getObjectifGeneral";
import { getObjectifGenerallist } from "./useCase/getObjectifGenerallist";
import { createObejectifGeneral } from "./useCase/createObjectifGeneral";
import { editObjectifGeneral } from "./useCase/editObjectifGeneral";
import { updateObjectifGeneral } from "./useCase/updateObjectifGeneral";
import { deleteObjectifGeneral } from "./useCase/deleteObjectifGeneral";

const objectGeneralInitialState: ObjectifGeneralInitialState = {
  objectifGenerallist: [],
  objectifGeneral: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const objectifGeneralSlice = createSlice({
  name: "objectifGeneral",
  initialState: objectGeneralInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.objectifGeneral = {};
    },
  },
  extraReducers: {
    // get tache clé
    [getObjectifGeneral.pending.type]: (state) => {
      state.loading = true;
    },
    [getObjectifGeneral.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifGeneral = action.payload;
    },
    [getObjectifGeneral.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get tache clé
    [getObjectifGenerallist.pending.type]: (state) => {
      state.loading = true;
    },
    [getObjectifGenerallist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifGenerallist = action.payload;
    },
    [getObjectifGenerallist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create tache clé
    [createObejectifGeneral.pending.type]: (state) => {
      state.loading = true;
    },
    [createObejectifGeneral.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifGenerallist.push(action.payload);
    },
    [createObejectifGeneral.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit tache clé 
    [editObjectifGeneral.pending.type]: (state) => {
      state.loading = true;
    },
    [editObjectifGeneral.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifGeneral = action.payload;
      state.isEditing = true;
    },
    [editObjectifGeneral.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update tache clé 
    [updateObjectifGeneral.pending.type]: (state) => {
      state.loading = true;
    },
    [updateObjectifGeneral.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.objectifGeneral = {};
      state.isEditing = false;
    },
    [updateObjectifGeneral.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete tache clé
    [deleteObjectifGeneral.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteObjectifGeneral.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteObjectifGeneral.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = objectifGeneralSlice.actions;
