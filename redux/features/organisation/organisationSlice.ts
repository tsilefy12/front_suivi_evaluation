import { createSlice } from "@reduxjs/toolkit";
import { OrganisationInitialState } from "./organisation.interface";
import { getOrganisation } from "./useCase/getOrganisation";
import { createOrganisation } from "./useCase/createOrganisation";
import { updateOrganisation } from "./useCase/updateOrganisation";
import { deleteOrganisation } from "./useCase/deleteOrganisation";
import { editOrganisation } from "./useCase/editOrganisation";

const organisationInitialState: OrganisationInitialState = {
  organisationList: [],
  organisation: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const organisationSlice = createSlice({
  name: "organisation",
  initialState: organisationInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.organisation = {};
    },
  },
  extraReducers: {
    // get organisation
    [getOrganisation.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrganisation.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.organisationList = action.payload;
    },
    [getOrganisation.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create organisation
    [createOrganisation.pending.type]: (state) => {
      state.loading = true;
    },
    [createOrganisation.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.organisationList.push(action.payload);
    },
    [createOrganisation.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [updateOrganisation.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.organisation = {};
      state.isEditing = false;
    },
    [updateOrganisation.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // delete type
    [deleteOrganisation.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteOrganisation.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteOrganisation.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit organisation
    [editOrganisation.pending.type]: (state) => {
      state.loading = true;
    },
    [editOrganisation.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.organisation = action.payload;
      state.isEditing = true;
    },
    [editOrganisation.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = organisationSlice.actions;
