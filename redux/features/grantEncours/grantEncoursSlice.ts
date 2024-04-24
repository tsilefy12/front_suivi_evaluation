import { createSlice } from "@reduxjs/toolkit";
import { GrantEncoursInitialState } from "./grantEncours.interface";
import { getGrantEncours } from "./useCase/getGrantEncours";
import { getGrantEncoursList } from "./useCase/getGrantEncoursList";
import { createGrantEncours } from "./useCase/createGrantEncours";
import { editGrantEncours } from "./useCase/editGrantEncours";
import { updateGrantEncours } from "./useCase/updateGrantEncours";
import { deleteGrantEncours } from "./useCase/deleteGrantEncours";

const grantEncoursInitialState: GrantEncoursInitialState = {
  grantEncoursList: [],
  grantEncour: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const grantEncoursSlice = createSlice({
  name: "grantEncours",
  initialState: grantEncoursInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.grantEncour = {};
    },
  },
  extraReducers: {
    // get Mission
    [getGrantEncours.pending.type]: (state) => {
      state.loading = true;
    },
    [getGrantEncours.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantEncour = action.payload;
    },
    [getGrantEncours.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get Missions
    [getGrantEncoursList.pending.type]: (state) => {
      state.loading = true;
    },
    [getGrantEncoursList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantEncoursList = action.payload;
    },
    [getGrantEncoursList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create mission
    [createGrantEncours.pending.type]: (state) => {
      state.loading = true;
    },
    [createGrantEncours.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantEncoursList.push(action.payload);
    },
    [createGrantEncours.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit mission
    [editGrantEncours.pending.type]: (state) => {
      state.loading = true;
    },
    [editGrantEncours.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantEncour = action.payload;
      state.isEditing = true;
    },
    [editGrantEncours.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update mission
    [updateGrantEncours.pending.type]: (state) => {
      state.loading = true;
    },
    [updateGrantEncours.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantEncour = {};
      state.isEditing = false;
    },
    [updateGrantEncours.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete mission
    [deleteGrantEncours.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteGrantEncours.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteGrantEncours.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = grantEncoursSlice.actions;
