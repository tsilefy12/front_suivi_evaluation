import { createSlice } from "@reduxjs/toolkit";
import { GrantAdminInitialState } from "./grantAdmin.interface";
import { getGrantAdmin } from "./useCase/getGrantAdmin";
import { getGrantAdminlist } from "./useCase/getGrantAdminlist";
import { createGrantAdmin } from "./useCase/createGrantAdmin";
import { editGrantAdmin } from "./useCase/editGrantAdmin";
import { updateGrantAdmin } from "./useCase/updateGrantAdmin";
import { deleteGrantAdmin } from "./useCase/deleteGrantAdmin";

const grantAdminInitialState: GrantAdminInitialState = {
  grantAdminlist: [],
  grantAdmin: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const grantAdminSlice = createSlice({
  name: "grantAdmin",
  initialState: grantAdminInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.grantAdmin = {};
    },
  },
  extraReducers: {
    // get grantAdmin
    [getGrantAdmin.pending.type]: (state) => {
      state.loading = true;
    },
    [getGrantAdmin.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantAdmin = action.payload;
    },
    [getGrantAdmin.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get grantAdmin
    [getGrantAdminlist.pending.type]: (state) => {
      state.loading = true;
    },
    [getGrantAdminlist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantAdminlist = action.payload;
    },
    [getGrantAdminlist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create grantAdmin
    [createGrantAdmin.pending.type]: (state) => {
      state.loading = true;
    },
    [createGrantAdmin.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantAdminlist.push(action.payload);
    },
    [createGrantAdmin.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit grantAdmin 
    [editGrantAdmin.pending.type]: (state) => {
      state.loading = true;
    },
    [editGrantAdmin.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantAdmin = action.payload;
      state.isEditing = true;
    },
    [editGrantAdmin.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update grantAdmin 
    [updateGrantAdmin.pending.type]: (state) => {
      state.loading = true;
    },
    [updateGrantAdmin.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.grantAdmin = {};
      state.isEditing = false;
    },
    [updateGrantAdmin.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete grantAdmin
    [deleteGrantAdmin.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteGrantAdmin.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteGrantAdmin.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = grantAdminSlice.actions;
