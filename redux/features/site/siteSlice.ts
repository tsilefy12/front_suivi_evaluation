import { createSlice } from "@reduxjs/toolkit";
import { SiteInitialState } from "./site.interface";
import { getSite } from "./useCase/getSite";
import { createSite } from "./useCase/createSite";
import { updateSite } from "./useCase/updateSite";
import { deleteSite } from "./useCase/deleteSite";
import { editSite } from "./useCase/editSite";
import { getSitelist } from "./useCase/getSiteList";

const siteInitialState: SiteInitialState = {
  sitelist: [],
  site: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const siteSlice = createSlice({
  name: "site",
  initialState: siteInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.site = {};
    },
  },
  extraReducers: {
    // get site
    [getSite.pending.type]: (state) => {
      state.loading = true;
    },
    [getSite.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.statut = action.payload;
    },
    [getSite.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    //get site list
    [getSitelist.pending.type]: (state) => {
      state.loading = true;
    },
    [getSitelist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.sitelist = action.payload;
    },
    [getSitelist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create site
    [createSite.pending.type]: (state) => {
      state.loading = true;
    },
    [createSite.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.sitelist.push(action.payload);
    },
    [createSite.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    //update site
    [updateSite.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.statut = {};
      state.isEditing = false;
    },
    [updateSite.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // delete site
    [deleteSite.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteSite.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteSite.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit site 
    [editSite.pending.type]: (state) => {
      state.loading = true;
    },
    [editSite.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.statut = action.payload;
      state.isEditing = true;
    },
    [editSite.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = siteSlice.actions;
